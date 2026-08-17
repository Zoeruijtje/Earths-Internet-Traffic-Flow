import * as THREE from 'three';

export class EarthRenderer {
  private readonly canvas: HTMLCanvasElement;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  private readonly earthGroup = new THREE.Group();
  private readonly resizeObserver: ResizeObserver;
  private animationFrame = 0;
  private disposed = false;
  private pointerDown = false;
  private lastPointer = new THREE.Vector2();
  private autoRotate = true;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.9;
    this.renderer.setClearColor(0x02050b, 1);
    this.scene.add(this.earthGroup);
    this.camera.position.set(0, 0, 4.2);

    const placeholder = new THREE.Mesh(
      new THREE.SphereGeometry(1, 96, 64),
      new THREE.MeshStandardMaterial({ color: 0x18354a, roughness: 0.82, metalness: 0.02 }),
    );
    this.earthGroup.add(placeholder);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.028, 96, 64),
      new THREE.MeshBasicMaterial({ color: 0x6bd7ff, transparent: true, opacity: 0.055, side: THREE.BackSide }),
    );
    this.earthGroup.add(atmosphere);

    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(3, 1.2, 2.4);
    this.scene.add(key);
    this.scene.add(new THREE.AmbientLight(0x7890a8, 0.3));

    const stars = this.createStars();
    this.scene.add(stars);

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);

    canvas.addEventListener('pointerdown', this.handlePointerDown);
    canvas.addEventListener('pointermove', this.handlePointerMove);
    canvas.addEventListener('pointerup', this.handlePointerUp);
    canvas.addEventListener('pointercancel', this.handlePointerUp);
    canvas.addEventListener('wheel', this.handleWheel, { passive: false });
    document.addEventListener('visibilitychange', this.handleVisibility);

    this.resize();
  }

  start(): void {
    if (this.disposed) return;
    this.animationFrame = requestAnimationFrame(this.render);
  }

  private readonly render = (): void => {
    if (this.disposed) return;
    if (!document.hidden) {
      if (this.autoRotate && !this.pointerDown && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.earthGroup.rotation.y += 0.00045;
      }
      this.renderer.render(this.scene, this.camera);
    }
    this.animationFrame = requestAnimationFrame(this.render);
  };

  private resize(): void {
    const width = Math.max(1, this.canvas.clientWidth);
    const height = Math.max(1, this.canvas.clientHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, width < 900 ? 1.5 : 2);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.fov = width < 700 ? 42 : 36;
    this.camera.updateProjectionMatrix();
  }

  private readonly handlePointerDown = (event: PointerEvent): void => {
    this.pointerDown = true;
    this.autoRotate = false;
    this.lastPointer.set(event.clientX, event.clientY);
    this.canvas.setPointerCapture(event.pointerId);
  };

  private readonly handlePointerMove = (event: PointerEvent): void => {
    if (!this.pointerDown) return;
    const dx = event.clientX - this.lastPointer.x;
    const dy = event.clientY - this.lastPointer.y;
    this.lastPointer.set(event.clientX, event.clientY);
    this.earthGroup.rotation.y += dx * 0.004;
    this.earthGroup.rotation.x = THREE.MathUtils.clamp(this.earthGroup.rotation.x + dy * 0.003, -1.15, 1.15);
  };

  private readonly handlePointerUp = (event: PointerEvent): void => {
    this.pointerDown = false;
    if (this.canvas.hasPointerCapture(event.pointerId)) this.canvas.releasePointerCapture(event.pointerId);
  };

  private readonly handleWheel = (event: WheelEvent): void => {
    event.preventDefault();
    this.camera.position.z = THREE.MathUtils.clamp(this.camera.position.z + event.deltaY * 0.0025, 2.35, 6.5);
  };

  private readonly handleVisibility = (): void => {
    if (!document.hidden) this.renderer.render(this.scene, this.camera);
  };

  private createStars(): THREE.Points {
    const count = 1200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 18 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const z = Math.random() * 2 - 1;
      const planar = Math.sqrt(1 - z * z);
      positions[i * 3] = radius * planar * Math.cos(theta);
      positions[i * 3 + 1] = radius * z;
      positions[i * 3 + 2] = radius * planar * Math.sin(theta);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: 0xbfd8f5, size: 0.018, transparent: true, opacity: 0.7 });
    return new THREE.Points(geometry, material);
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.animationFrame);
    this.resizeObserver.disconnect();
    this.canvas.removeEventListener('pointerdown', this.handlePointerDown);
    this.canvas.removeEventListener('pointermove', this.handlePointerMove);
    this.canvas.removeEventListener('pointerup', this.handlePointerUp);
    this.canvas.removeEventListener('pointercancel', this.handlePointerUp);
    this.canvas.removeEventListener('wheel', this.handleWheel);
    document.removeEventListener('visibilitychange', this.handleVisibility);
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
        object.geometry.dispose();
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
        else object.material.dispose();
      }
    });
    this.renderer.dispose();
  }
}
