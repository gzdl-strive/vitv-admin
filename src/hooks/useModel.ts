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
  const bakedTexture = textureLoader.load(`/image/${bakedImgName}.jpg`);
  bakedTexture.flipY = false;
  bakedTexture.encoding = THREE.sRGBEncoding;

  //Baked material
  const bakedMaterial = new THREE.MeshBasicMaterial({
    map: bakedTexture
  });

  /**
   * Model
   */
  gltfLoader.load(`/models/${modelName}.glb`, gltf => {
    gltf.scene.traverse(child => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (child as any).material = bakedMaterial;
    });
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