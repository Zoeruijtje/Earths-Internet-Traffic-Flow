import * as THREE from 'three';

export type QualityMode = 'performance' | 'balanced' | 'high';

export interface RendererDiagnostics {
  quality: QualityMode;
  pixelRatio: number;
  width: number;
  height: number;
  geometries: number;
  textures: number;
  drawCalls: number;
  triangles: number;
  contextLost: boolean;
}

export class EarthRenderer {
  private readonly canvas: HTMLCanvasElement;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  private readonly earthGroup = new THREE.Group();
  private readonly resizeObserver: ResizeObserver;
  private readonly reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  private animationFrame = 0;
  private disposed = false;
  private pointerDown = false;
  private lastPointer = new THREE.Vector2();
  private autoRotate = true;
  private quality: QualityMode = 'balanced';
  private contextLost = false;
  private lastFrameTime = performance.now();

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.9;
    this.renderer.setClearColor(0x02050b, 1);
    this.scene.add(this.earthGroup);
    this.camera.position.set(0, 0, 4.2);

    // Phase 0 deliberately uses a neutral sphere. NASA imagery is introduced only
    // after the asset provenance/processing gate is complete in Phase 1.
    const placeholder = new THREE.Mesh(
      new THREE.SphereGeometry(1, 96, 64),
      new THREE.MeshStandardMaterial({ color: 0x18354a, roughness: 0.82, metalness: 0.02 }),
    );
    placeholder.name = 'phase-0-neutral-earth';
    this.earthGroup.add(placeholder);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.028, 96, 64),
      new THREE.MeshBasicMaterial({ color: 0x6bd7ff, transparent: true, opacity: 0.055, side: THREE.BackSide }),
    );
    atmosphere.name = 'phase-0-atmosphere-placeholder';
    this.earthGroup.add(atmosphere);

    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(3, 1.2, 2.4);
    this.scene.add(key);
    this.scene.add(new THREE.AmbientLight(0x7890a8, 0.3));
    this.scene.add(this.createStars());

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);

    canvas.addEventListener('pointerdown', this.handlePointerDown);
    canvas.addEventListener('pointermove', this.handlePointerMove);
    canvas.addEventListener('pointerup', this.handlePointerUp);
    canvas.addEventListener('pointercancel', this.handlePointerUp);
    canvas.addEventListener('wheel', this.handleWheel, { passive: false });
    canvas.addEventListener('webglcontextlost', this.handleContextLost);
    canvas.addEventListener('webglcontextrestored', this.handleContextRestored);
    document.addEventListener('visibilitychange', this.handleVisibility);

    this.resize();
  }

  start(): void {
    if (this.disposed || this.animationFrame !== 0) return;
    this.lastFrameTime = performance.now();
    this.animationFrame = requestAnimationFrame(this.render);
  }

  setQuality(quality: QualityMode): void {
    this.quality = quality;
    this.resize();
  }

  setAutoRotate(enabled: boolean): void {
    this.autoRotate = enabled;
  }

  resetView(): void {
    this.camera.position.set(0, 0, 4.2);
    this.earthGroup.rotation.set(0, 0, 0);
  }

  getDiagnostics(): RendererDiagnostics {
    const info = this.renderer.info;
    return {
      quality: this.quality,
      pixelRatio: this.renderer.getPixelRatio(),
      width: this.canvas.clientWidth,
      height: this.canvas.clientHeight,
      geometries: info.memory.geometries,
      textures: info.memory.textures,
      drawCalls: info.render.calls,
      triangles: info.render.triangles,
      contextLost: this.contextLost,
    };
  }

  private readonly render = (now: number): void => {
    if (this.disposed) return;
    const deltaSeconds = Math.min(0.05, Math.max(0, (now - this.lastFrameTime) / 1000));
    this.lastFrameTime = now;

    if (!document.hidden && !this.contextLost) {
      if (this.autoRotate && !this.pointerDown && !this.reducedMotion.matches) {
        this.earthGroup.rotation.y += deltaSeconds * 0.027;
      }
      this.renderer.render(this.scene, this.camera);
    }
    this.animationFrame = requestAnimationFrame(this.render);
  };

  private resize(): void {
    const width = Math.max(1, this.canvas.clientWidth);
    const height = Math.max(1, this.canvas.clientHeight);
    const deviceDpr = window.devicePixelRatio || 1;
    const cap = this.quality === 'performance' ? 1 : this.quality === 'high' ? (width < 900 ? 1.75 : 2) : (width < 900 ? 1.5 : 1.75);
    this.renderer.setPixelRatio(Math.min(deviceDpr, cap));
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
    this.lastFrameTime = performance.now();
    if (!document.hidden && !this.contextLost) this.renderer.render(this.scene, this.camera);
  };

  private readonly handleContextLost = (event: Event): void => {
    event.preventDefault();
    this.contextLost = true;
    this.canvas.dispatchEvent(new CustomEvent('earth-renderer-status', { detail: { state: 'context-lost' } }));
  };

  private readonly handleContextRestored = (): void => {
    this.contextLost = false;
    this.resize();
    this.canvas.dispatchEvent(new CustomEvent('earth-renderer-status', { detail: { state: 'ready' } }));
  };

  private createStars(): THREE.Points {
    const count = 1200;
    const positions = new Float32Array(count * 3);
    let state = 0x5f3759df;
    const random = (): number => {
      state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
      return state / 0x100000000;
    };

    for (let i = 0; i < count; i += 1) {
      const radius = 18 + random() * 14;
      const theta = random() * Math.PI * 2;
      const z = random() * 2 - 1;
      const planar = Math.sqrt(1 - z * z);
      positions[i * 3] = radius * planar * Math.cos(theta);
      positions[i * 3 + 1] = radius * z;
      positions[i * 3 + 2] = radius * planar * Math.sin(theta);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: 0xbfd8f5, size: 0.018, transparent: true, opacity: 0.7 });
    const stars = new THREE.Points(geometry, material);
    stars.name = 'decorative-deterministic-star-field';
    return stars;
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.animationFrame);
    this.animationFrame = 0;
    this.resizeObserver.disconnect();
    this.canvas.removeEventListener('pointerdown', this.handlePointerDown);
    this.canvas.removeEventListener('pointermove', this.handlePointerMove);
    this.canvas.removeEventListener('pointerup', this.handlePointerUp);
    this.canvas.removeEventListener('pointercancel', this.handlePointerUp);
    this.canvas.removeEventListener('wheel', this.handleWheel);
    this.canvas.removeEventListener('webglcontextlost', this.handleContextLost);
    this.canvas.removeEventListener('webglcontextrestored', this.handleContextRestored);
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
