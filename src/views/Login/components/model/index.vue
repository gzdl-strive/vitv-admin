<script lang="ts" setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

onMounted(() => {
  const debugObject = {
    envMapIntensity: 0.4,
    cameraPosX: 5.55,
    cameraPosY: 5.13,
    cameraPosZ: 4.21
  };

  /**
   * Loaders
   */
  const gltfLoader = new GLTFLoader();
  const textureLoader = new THREE.TextureLoader();

  /**
   * Base
   */

  // Canvas
  const canvas = document.querySelector('canvas.webgl');

  // Scene
  const scene = new THREE.Scene();

  /**
   * Update all materials
   */
  const updateAllMaterials = () => {
    scene.traverse(child => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        child.material.envMapIntensity = debugObject.envMapIntensity || 0.4;
        child.material.needsUpdate = true;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  };

  // Textures
  const bakedTexture = textureLoader.load(`/image/room_baked.jpg`);
  bakedTexture.flipY = false;
  bakedTexture.encoding = THREE.sRGBEncoding;

  //Baked material
  const bakedMaterial = new THREE.MeshBasicMaterial({
    map: bakedTexture
  });

  /**
   * Models
   */
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/');
  gltfLoader.setDRACOLoader(dracoLoader);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let topChairModel: any = null;

  function loadModel(modelName: string) {
    gltfLoader.load(`/models/${modelName}.glb`, gltf => {
      // Model
      gltf.scene.traverse(child => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (child as any).material = bakedMaterial;
      });
      gltf.scene.position.set(-2, 0, 0);
      scene.add(gltf.scene);

      if (modelName === 'topChair') {
        topChairModel = gltf.scene.children[0];
      }

      // Update materials
      updateAllMaterials();
    });
  }
  loadModel('room');
  loadModel('topChair');

  /**
   * Floor
   */
  const floorColorTexture = textureLoader.load('textures/dirt/color.jpg');
  floorColorTexture.encoding = THREE.sRGBEncoding;
  floorColorTexture.repeat.set(1.5, 1.5);
  floorColorTexture.wrapS = THREE.RepeatWrapping;
  floorColorTexture.wrapT = THREE.RepeatWrapping;

  const floorNormalTexture = textureLoader.load('textures/dirt/normal.jpg');
  floorNormalTexture.repeat.set(1.5, 1.5);
  floorNormalTexture.wrapS = THREE.RepeatWrapping;
  floorNormalTexture.wrapT = THREE.RepeatWrapping;

  const floorGeometry = new THREE.CircleGeometry(10, 64);
  const floorMaterial = new THREE.MeshStandardMaterial({
    map: floorColorTexture,
    normalMap: floorNormalTexture
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.x = -2;
  floor.rotation.x = -Math.PI * 0.5;
  scene.add(floor);

  /**
   * Lights
   */
  const directionalLight = new THREE.DirectionalLight('#ffffff', 4);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.far = 15;
  directionalLight.shadow.mapSize.set(1024, 1024);
  directionalLight.shadow.normalBias = 0.05;
  directionalLight.position.set(3.5, 2, -1.25);
  scene.add(directionalLight);

  /**
   * Sizes
   */
  const sizes = {
    width: (window.innerWidth / 3) * 2,
    height: window.innerHeight
  };

  window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = (window.innerWidth / 3) * 2;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  /**
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(
    35,
    sizes.width / sizes.height,
    0.1,
    100
  );
  scene.add(camera);

  const spherical = {
    value: new THREE.Spherical(25, Math.PI * 0.35, -Math.PI * 0.25),
    smoothed: new THREE.Spherical(25, Math.PI * 0.35, -Math.PI * 0.25),
    smoothing: 0.005,
    onMouseDown: (_event: MouseEvent) => {
      method.down(_event.clientX, _event.clientY);
      (canvas as HTMLElement).addEventListener('mouseup', spherical.onMouseUp);
      (canvas as HTMLElement).addEventListener(
        'mousemove',
        spherical.onMouseMove
      );
    },
    onMouseUp: (_event: MouseEvent) => {
      _event.preventDefault();
      method.up();
      (canvas as HTMLElement).removeEventListener(
        'mouseup',
        spherical.onMouseUp
      );
      (canvas as HTMLElement).removeEventListener(
        'mousemove',
        spherical.onMouseMove
      );
    },
    onMouseMove: (_event: MouseEvent) => {
      method.move(_event.clientX, _event.clientY);
    }
  };
  const drag = {
    delta: {
      x: 0,
      y: 0
    },
    previous: {
      x: 0,
      y: 0
    },
    sensitivity: 0.001
  };
  const method = {
    down: (_x: number, _y: number) => {
      drag.previous.x = _x;
      drag.previous.y = _y;
    },
    move: (_x: number, _y: number) => {
      drag.delta.x += _x - drag.previous.x;
      drag.delta.y += _y - drag.previous.y;

      drag.previous.x = _x;
      drag.previous.y = _y;
    },
    up: () => {
      console.log('up');
    }
  };

  // 初始化视图
  function initView(elapsedTime: number) {
    if (!canvas) return;
    const target = new THREE.Vector3(0, 2, 0);
    // Drag
    spherical.value.theta -= drag.delta.x * drag.sensitivity;
    spherical.value.phi -= drag.delta.y * drag.sensitivity;

    drag.delta.x = 0;
    drag.delta.y = 0;

    // Smoothing
    spherical.smoothed.phi +=
      (spherical.value.phi - spherical.smoothed.phi) *
      spherical.smoothing *
      elapsedTime;
    spherical.smoothed.theta +=
      (spherical.value.theta - spherical.smoothed.theta) *
      spherical.smoothing *
      elapsedTime;
    spherical.smoothed.radius +=
      (spherical.value.radius - spherical.smoothed.radius) *
      spherical.smoothing *
      elapsedTime;

    const viewPosition = new THREE.Vector3();
    viewPosition.setFromSpherical(spherical.smoothed);

    camera.position.copy(viewPosition);
    camera.lookAt(target);
    (canvas as HTMLElement).addEventListener(
      'mousedown',
      spherical.onMouseDown
    );
  }

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas as HTMLElement,
    antialias: true
  });
  renderer.physicallyCorrectLights = true;
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.CineonToneMapping;
  renderer.toneMappingExposure = 1.75;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor('#211d20');
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /**
   * Animate
   */
  const clock = new THREE.Clock();
  // let previousTime = 0;
  let active: boolean = window.location.hash === '#debug';
  if (active) {
    // Debug
    let gui = new dat.GUI();

    active &&
      gui
        .add(debugObject, 'envMapIntensity')
        .min(0)
        .max(4)
        .step(0.001)
        .onChange(updateAllMaterials);
    gui
      .add(directionalLight, 'intensity')
      .min(0)
      .max(10)
      .step(0.001)
      .name('lightIntensity');
    gui
      .add(directionalLight.position, 'x')
      .min(-5)
      .max(5)
      .step(0.001)
      .name('lightX');
    gui
      .add(directionalLight.position, 'y')
      .min(-5)
      .max(5)
      .step(0.001)
      .name('lightY');
    gui
      .add(directionalLight.position, 'z')
      .min(-5)
      .max(5)
      .step(0.001)
      .name('lightZ');
    gui
      .add(camera.position, 'x')
      .min(-20)
      .max(20)
      .step(0.01)
      .name('摄像机位置X');
    gui
      .add(camera.position, 'y')
      .min(-20)
      .max(20)
      .step(0.01)
      .name('摄像机位置Y');
    gui
      .add(camera.position, 'z')
      .min(-20)
      .max(20)
      .step(0.01)
      .name('摄像机位置Z');
  }

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    // const deltaTime = elapsedTime - previousTime;
    // previousTime = elapsedTime;

    initView(elapsedTime);

    // Animation
    if (topChairModel) {
      topChairModel.rotation.y = Math.sin(elapsedTime * 0.5) * 0.5;
    }

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
});
</script>
<script lang="ts">
export default {
  name: 'ThreeModelGlb'
};
</script>

<template>
  <section class="model-container">
    <canvas class="webgl"></canvas>
  </section>
</template>

<style scoped lang="scss">
.model-container {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(#66a6ff 0%, #50bcca 100%);
  border-radius: 0.5rem;
  overflow: hidden;

  .webgl {
    width: 100%;
    height: 100%;
  }
}
</style>
