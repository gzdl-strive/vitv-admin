import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const useModel = (
  canvas: HTMLCanvasElement,
  bakedImgName: string,
  modelName: string,
  variable = {
    cameraPosition: {
      x: 4,
      y: 2,
      z: 4
    }
  }
) => {
  // Scene 
  const scene = new THREE.Scene();

  // DebugObj
  // const debugObject = {
  //   x: position.cameraPosition.x,
  //   y: position.cameraPosition.y,
  //   z: position.cameraPosition.z
  // }

  // Loaders
  // Texture loader
  const textureLoader = new THREE.TextureLoader();

  // Draco loader
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/');

  // GLTF loader
  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  // Textures
  const bakedTexture = textureLoader.load(`/image/model_common/${bakedImgName}.jpg`);
  bakedTexture.flipY = false;
  bakedTexture.encoding = THREE.sRGBEncoding;

  //Baked material
  const bakedMaterial = new THREE.MeshBasicMaterial({
    map: bakedTexture
  });

  /**
   * Model
   */
  gltfLoader.load(`/models/model_common/${modelName}.glb`, gltf => {
    gltf.scene.traverse(child => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (child as any).material = bakedMaterial;
    });

    gltf.scene.position.set(-8, -2, 0);
    // const box = new THREE.Box3().setFromObject(gltf.scene);
    // const mdlen = box.max.x - box.min.x;
    // const mdwid = box.max.z - box.min.z;
    // const mdhei = box.max.y - box.min.y;
    // const x1 = box.min.x + mdlen / 2;
    // const y1 = box.min.y + mdhei / 2;
    // const z1 = box.min.z + mdwid / 2;
    // gltf.scene.position.set(-x1, -y1, -z1);
    scene.add(gltf.scene);
  });

  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  /**
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.set(variable.cameraPosition.x, variable.cameraPosition.y, variable.cameraPosition.z);
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
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;

  window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  const tick = () => {
    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  // 判断是否开启debug面板
  const active: boolean = window.location.hash === '#debug';
  if (active) {
    const dg = document.querySelector('.dg .main');
    if (dg) {
      // 用于解决，切换模型，产生多个gui面板问题，需要清除上一个面板
      dg.remove();
    }

    // Debug
    const gui = new dat.GUI();

    active &&
      gui
        .add(camera.position, 'x')
        .min(-20)
        .max(20)
        .step(0.01)
        .name('摄像机位置X');
      gui.add(camera.position, 'y')
        .min(-20)
        .max(20)
        .step(0.01)
        .name('摄像机位置Y');
      gui.add(camera.position, 'z')
        .min(-20)
        .max(20)
        .step(0.01)
        .name('摄像机位置Z');
  }

  tick();
};

export default useModel;