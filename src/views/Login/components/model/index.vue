<script lang="ts" setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

onMounted(() => {
  const debugObject = {
    envMapIntensity: 0.4
  };

  /**
   * Loaders
   */
  const gltfLoader = new GLTFLoader();
  const textureLoader = new THREE.TextureLoader();
  const cubeTextureLoader = new THREE.CubeTextureLoader();

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

  /**
   * Environment map
   */
  const environmentMap = cubeTextureLoader.load([
    '/textures/environmentMap/px.jpg',
    '/textures/environmentMap/nx.jpg',
    '/textures/environmentMap/py.jpg',
    '/textures/environmentMap/ny.jpg',
    '/textures/environmentMap/pz.jpg',
    '/textures/environmentMap/nz.jpg'
  ]);

  environmentMap.encoding = THREE.sRGBEncoding;

  scene.background = environmentMap;
  scene.environment = environmentMap;

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
  let foxMixer: THREE.AnimationMixer | null = null;
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/');
  gltfLoader.setDRACOLoader(dracoLoader);

  gltfLoader.load('/models/room.glb', gltf => {
    // Model
    gltf.scene.scale.set(0.5, 0.5, 0.5);
    gltf.scene.rotateY((-Math.PI / 2) * 3);
    gltf.scene.traverse(child => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (child as any).material = bakedMaterial;
    });
    scene.add(gltf.scene);

    // Animation
    // foxMixer = new THREE.AnimationMixer(gltf.scene);
    // const foxAction = foxMixer.clipAction(gltf.animations[2]);
    // foxAction.play();

    // Update materials
    updateAllMaterials();
  });

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

  const floorGeometry = new THREE.CircleGeometry(5, 64);
  const floorMaterial = new THREE.MeshStandardMaterial({
    map: floorColorTexture,
    normalMap: floorNormalTexture
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
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
  camera.position.set(6, 4, 8);
  scene.add(camera);

  // Controls
  const controls = new OrbitControls(camera, canvas as HTMLElement);
  controls.enableDamping = true;

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
  let previousTime = 0;
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
  }

  const tick = () => {
    // const elapsedTime = clock.getElapsedTime();
    // const deltaTime = elapsedTime - previousTime;
    // previousTime = elapsedTime;

    // Update controls
    controls.update();

    // Fox animation
    // if (foxMixer) {
    //   foxMixer.update(deltaTime);
    // }

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
