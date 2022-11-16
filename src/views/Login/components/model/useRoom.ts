/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import normalizeWheel from 'normalize-wheel-es';
import gsap from 'gsap';

const useRoom = (canvas: HTMLCanvasElement) => {
  // debug-active
  const active: boolean = window.location.hash === '#debug';
  // Debug
  const gui = active ? new dat.GUI() : null;

  // Loaders
  const gltfLoader = new GLTFLoader();
  const textureLoader = new THREE.TextureLoader();

  // Scene
  const scene = new THREE.Scene();

  // Update all materials
  const updateAllMaterials = () => {
    scene.traverse(child => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        child.material.envMapIntensity = 0.4;
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

  // Models
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/');
  gltfLoader.setDRACOLoader(dracoLoader);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let topChairModel: any = null;

  // 普通加载模型
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
  // 需要修改模型_加载模型
  function setModel(modelName: string) {
    gltfLoader.load(`/models/${modelName}.glb`, gltf => {
      const model: any = {
        items: []
      };

      const children = [...gltf.scene.children];
      children.sort((_a: any, _b: any) => {
        if (_a.name < _b.name) return -1;
        if (_a.name > _b.name) return 1;
        return 0;
      });
      let i = 0;
      const initColor = 0xffffff;
      for (const _child of children) {
        const item = {
          index: i,
          color: initColor,
          material: new THREE.MeshBasicMaterial({
            color: initColor,
            transparent: true
          }),
          mesh: _child
        };
        (item.mesh as any).material = item.material;
        item.mesh.position.x -= 2;
        scene.add(item.mesh);
        model.items.push(item);
        i++;
      }
      setAnimation(model.items);
    });
  }
  function setAnimation(btnArr: any) {
    const colors = ['#196aff', '#ff0000', '#00ff00', '#0000ff'];

    if (gui) {
      for (const _colorIndex in colors) {
        gui.addColor(
          colors,
          _colorIndex,
        )
      }
    }

    const play = () => {
      const buttons = [];
      const oneButtons = [];
      for (const _button of btnArr) {
        const randomNum = Math.random();
        if (randomNum < 0.5) {
          buttons.push(_button);
        } else {
          oneButtons.push(_button);
        }
      }
      for (const _button of oneButtons) {
        _button.material.opacity = 0;
      }
      let i = 0;
      for (const _button of buttons) {
        _button.material.color.set(colors[Math.floor(Math.random() * colors.length)]);
        gsap.to(
          _button.material,
          {
            delay: i * 0.05,
            duration: 0.5,
            opacity: 1,
            onComplete: () => {
              gsap.to(
                _button.material,
                {
                  delay: 3,
                  duration: 1,
                  opacity: 0
                }
              )
            }
          }
        );
        i++;
      }
    }
    window.setInterval(play, 5000);
  }
  // 加载room模型
  loadModel('room');
  // 加载需要旋转的椅子上半部分模型
  loadModel('topChair');
  // 小屏幕按钮
  setModel('screen_btn');

  // Lights
  const directionalLight = new THREE.DirectionalLight('#ff0000', 50);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.far = 15;
  directionalLight.shadow.mapSize.set(1024, 1024);
  directionalLight.shadow.normalBias = 0.05;
  directionalLight.position.set(3.5, 2, -1.25);
  scene.add(directionalLight);

  // Sizes
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

  // Base camera
  const camera = new THREE.PerspectiveCamera(
    35,
    sizes.width / sizes.height,
    0.1,
    100
  );
  scene.add(camera);

  // 定义的变量——用来控制模型的点击拖拽、缩放等功能
  const spherical = {
    value: new THREE.Spherical(25, Math.PI * 0.35, -Math.PI * 0.25),
    smoothed: new THREE.Spherical(25, Math.PI * 0.35, -Math.PI * 0.25),
    smoothing: 0.005,
    limit: {
      radius: {
        min: 10,
        max: 50
      },
      phi: {
        min: 0.01,
        max: Math.PI * 0.5
      },
      theta: {
        min: -Math.PI * 0.5,
        max: 0
      }
    },
    onMouseDown: (_event: MouseEvent) => {
      drag.alternative =
        _event.button === 2 || _event.ctrlKey || _event.shiftKey;

      method.down(_event.clientX, _event.clientY);
      (canvas as HTMLElement).addEventListener('mouseup', spherical.onMouseUp);
      (canvas as HTMLElement).addEventListener(
        'mouseover',
        spherical.onMouseUp
      );
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
    },
    onContextMenu: (_event: MouseEvent) => {
      _event.preventDefault();
    },
    onWheel: (_event: Event) => {
      _event.preventDefault();
      const normalized = normalizeWheel(_event as WheelEvent);
      method.zoomIn(normalized.pixelY);
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
    sensitivity: 0.001,
    alternative: false
  };
  const zoom = {
    sensitivity: 0.01,
    value: 30,
    delta: 0
  };
  const target = {
    value: new THREE.Vector3(0, 2, 0),
    smoothed: new THREE.Vector3(0, 2, 0),
    smoothing: 0.005
  };
  const limit = {
    x: { min: -5, max: 5 },
    y: { min: -1, max: 5 },
    z: { min: -5, max: 5 }
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
      let a = 1;
      a = 2;
      for (let i = 0; i < a; i++) { }
    },
    zoomIn: (_delta: number) => {
      zoom.delta += _delta;
    }
  };

  // 初始化视图
  function initView(elapsedTime: number) {
    if (!canvas) return;

    // wheel zoom
    spherical.value.radius += zoom.delta * zoom.sensitivity;
    // apply limit
    spherical.value.radius = Math.min(
      Math.max(spherical.value.radius, spherical.limit.radius.min),
      spherical.limit.radius.max
    );

    // Drag
    if (drag.alternative) {
      // 右键drag
      const up = new THREE.Vector3(0, 1, 0);
      const right = new THREE.Vector3(-1, 0, 0);

      up.applyQuaternion(camera.quaternion);
      right.applyQuaternion(camera.quaternion);

      up.multiplyScalar(0.01 * drag.delta.y);
      right.multiplyScalar(0.01 * drag.delta.x);

      target.value.add(up);
      target.value.add(right);

      // apply limit
      target.value.x = Math.min(
        Math.max(target.value.x, limit.x.min),
        limit.x.max
      );
      target.value.y = Math.min(
        Math.max(target.value.y, limit.y.min),
        limit.y.max
      );
      target.value.z = Math.min(
        Math.max(target.value.z, limit.z.min),
        limit.z.max
      );
    } else {
      // 左键drag
      spherical.value.theta -= drag.delta.x * drag.sensitivity;
      spherical.value.phi -= drag.delta.y * drag.sensitivity;

      // Apply limit
      spherical.value.theta = Math.min(
        Math.max(spherical.value.theta, spherical.limit.theta.min),
        spherical.limit.theta.max
      );
      spherical.value.phi = Math.min(
        Math.max(spherical.value.phi, spherical.limit.phi.min),
        spherical.limit.phi.max
      );
    }

    drag.delta.x = 0;
    drag.delta.y = 0;
    zoom.delta = 0;

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

    target.smoothed.x +=
      (target.value.x - target.smoothed.x) * target.smoothing * elapsedTime;
    target.smoothed.y +=
      (target.value.y - target.smoothed.y) * target.smoothing * elapsedTime;
    target.smoothed.z +=
      (target.value.z - target.smoothed.z) * target.smoothing * elapsedTime;

    const viewPosition = new THREE.Vector3();
    viewPosition.setFromSpherical(spherical.smoothed);
    viewPosition.add(target.smoothed);

    camera.position.copy(viewPosition);
    camera.lookAt(target.smoothed);
    (canvas as HTMLElement).addEventListener(
      'mousedown',
      spherical.onMouseDown
    );
    (canvas as HTMLElement).addEventListener(
      'contextmenu',
      spherical.onContextMenu
    );
    (canvas as HTMLElement).addEventListener('mousewheel', spherical.onWheel, {
      passive: false
    });
  }

  // Renderer
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

  // Animate
  const clock = new THREE.Clock();
  // let previousTime = 0;

  if (gui) {
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
    const elapsedTime = clock.getElapsedTime();
    // const deltaTime = elapsedTime - previousTime;
    // previousTime = elapsedTime;

    initView(elapsedTime);

    // Animation
    // 椅子旋转
    if (topChairModel) {
      topChairModel.rotation.y = Math.sin(elapsedTime * 0.5) * 0.5;
    }

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
}

export default useRoom;