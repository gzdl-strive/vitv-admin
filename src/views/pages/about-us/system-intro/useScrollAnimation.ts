import * as THREE from 'three';
import * as dat from 'dat.gui';

const useScrollAnimation = (container: HTMLDivElement, canvas: HTMLCanvasElement): void => {
  const parameters = {
    materialColor: '#ffeded',
    particlesCount: 200
  }

  // Scene
  const scene = new THREE.Scene()

  /**
   * Objects
   */
  //Textures
  const textureLoader = new THREE.TextureLoader();
  const gradientTexture = textureLoader.load('/image/system_gradient.jpg')
  gradientTexture.magFilter = THREE.NearestFilter;

  //Material
  const material = new THREE.MeshToonMaterial({ // 卡通网格材质
    color: parameters.materialColor,
    gradientMap: gradientTexture // 卡通着色的渐变贴图
  });

  //Objects
  const objectsDistance = 1.2;
  const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.1, 16, 60),
    material
  );
  const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(0.3, 0.6, 32),
    material
  );
  const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.2, 0.1, 100, 16),
    material
  );

  mesh1.position.x = 0.6;
  mesh2.position.x = - 0.6;
  mesh3.position.x = 0.6;

  mesh1.position.y = 1.2;
  mesh2.position.y = 1.2 - objectsDistance * 1;
  mesh3.position.y = 1.2 - objectsDistance * 2;

  scene.add(mesh1, mesh2, mesh3);

  const directionalLight = new THREE.DirectionalLight();
  directionalLight.position.set(1, 1, 0);
  scene.add(directionalLight);
  const sectionMeshes = [mesh1, mesh2, mesh3];

  // Particles
  let p_geometry: THREE.BufferGeometry | undefined;
  let p_material: THREE.PointsMaterial | undefined;
  let p_points: THREE.Points | undefined;
  const generateParticles = () => {
    //通过gui调试需要销毁上一次渲染的，判断points是否为Null
    if (p_points) {
      //销毁上次的渲染结果
      p_geometry && p_geometry.dispose();
      p_material && p_material.dispose();
      scene.remove(p_points);
    }
    const positions = new Float32Array(parameters.particlesCount * 3);

    for (let i = 0; i < parameters.particlesCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = 1.2 + objectsDistance * 0.5 - Math.random() * objectsDistance * sectionMeshes.length;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }

    p_geometry = new THREE.BufferGeometry();
    p_geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Material
    p_material = new THREE.PointsMaterial({
      color: parameters.materialColor,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      sizeAttenuation: textureLoader as any,
      size: 0.03
    })

    // Points
    p_points = new THREE.Points(p_geometry, p_material)
    scene.add(p_points)
  }
  generateParticles();

  /**
   * Sizes
   */
  const sizes = {
    width: container.clientWidth,
    height: container.clientHeight
  }

  window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = container.clientWidth
    sizes.height = container.clientHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })

  /**
   * Camera
   */
  //Group
  const cameraGroup = new THREE.Group()
  scene.add(cameraGroup)

  // Base camera
  const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
  camera.position.z = 6;
  cameraGroup.add(camera);

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
  })
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /**
   * cursor
   */
  const cursor = {
    x: 0,
    y: 0
  };
  container.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
  })

  // 判断是否开启debug面板
  const active: boolean = window.location.hash === '#debug';
  if (active) {
    // Debug
    const gui = new dat.GUI();

    active &&
      gui
        .addColor(parameters, 'materialColor')
        .onChange(() => {
          material.color.set(parameters.materialColor)
          p_material && p_material.color.set(parameters.materialColor)
        })
      &&
      gui.add(parameters, 'particlesCount').min(200).max(1000).step(100).onFinishChange(generateParticles)

  }

  /**
   * Animate
   */
  const clock = new THREE.Clock();
  let previousTime = 0;//用于记录之前的时间，在不同设备上elapsedTime可能不同，我们使用当前时间-之前的时间，可以得到一个稳定的差值

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    //Animate Camera
    camera.position.y = - 0 / sizes.height * objectsDistance;

    const parallaxX = cursor.x * 0.5;
    const parallaxY = -cursor.y * 0.5;
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 0.5 * deltaTime;
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 0.5 * deltaTime;


    // Animation
    //Animate meshs
    for (const mesh of sectionMeshes) {
      mesh.rotation.x += deltaTime * 0.1;
      mesh.rotation.y += deltaTime * 0.12;
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
  }

  tick()
};

export default useScrollAnimation;