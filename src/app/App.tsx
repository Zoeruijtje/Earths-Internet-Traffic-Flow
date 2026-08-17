import { useEffect, useRef, useState } from 'react';
import { EarthRenderer, type QualityMode, type RendererDiagnostics } from '../scene/EarthRenderer';

function formatUtc(date: Date): string {
  return `${date.toISOString().slice(0, 19).replace('T', ' ')} UTC`;
}

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<EarthRenderer | null>(null);
  const [quality, setQuality] = useState<QualityMode>('balanced');
  const [autoRotate, setAutoRotate] = useState(true);
  const [diagnostics, setDiagnostics] = useState<RendererDiagnostics | null>(null);
  const [clock, setClock] = useState(() => new Date());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new EarthRenderer(canvas);
    rendererRef.current = renderer;
    renderer.start();

    const sample = window.setInterval(() => setDiagnostics(renderer.getDiagnostics()), 1000);
    const tick = window.setInterval(() => setClock(new Date()), 1000);
    setDiagnostics(renderer.getDiagnostics());

    return () => {
      window.clearInterval(sample);
      window.clearInterval(tick);
      renderer.dispose();
      rendererRef.current = null;
    };
  }, []);

  const changeQuality = (next: QualityMode) => {
    setQuality(next);
    rendererRef.current?.setQuality(next);
  };

  const toggleRotation = () => {
    const next = !autoRotate;
    setAutoRotate(next);
    rendererRef.current?.setAutoRotate(next);
  };

  return (
    <main className="app-shell">
      <canvas ref={canvasRef} className="earth-canvas" aria-label="Interactive Earth rendering" />

      <header className="top-strip">
        <div className="brand-lockup">
          <span className="brand-orbit" aria-hidden="true" />
          <div>
            <strong>EARTH / NET</strong>
            <span>public Internet observatory</span>
          </div>
        </div>

        <div className="truth-status" role="status" aria-live="polite">
          <span className="status-dot" aria-hidden="true" />
          DATA NOT CONNECTED
        </div>
      </header>

      <section className="instrument-copy" aria-labelledby="intro-title">
        <div className="instrument-kicker">PHASE 0 · RENDER FOUNDATION</div>
        <h1 id="intro-title">The Internet has a geography.</h1>
        <p>
          This checkpoint establishes the rendering, geometry and responsive interface foundation before any live
          Internet source is allowed onto the globe.
        </p>
      </section>

      <aside className="source-panel" aria-label="Source and semantic state">
        <div className="panel-heading">
          <span>OBSERVATORY STATE</span>
          <strong>Foundation only</strong>
        </div>
        <dl>
          <div><dt>Network sources</dt><dd>Disconnected</dd></div>
          <div><dt>Internet events</dt><dd>None displayed</dd></div>
          <div><dt>Scene renderer</dt><dd>Direct Three.js</dd></div>
          <div><dt>Visible semantics</dt><dd>None yet</dd></div>
        </dl>
        <p className="truth-note">
          No random routes, counters, packets, BGP activity or simulated outages are rendered in this phase.
        </p>

        <div className="renderer-controls" aria-label="Renderer controls">
          <label>
            <span>Render quality</span>
            <select value={quality} onChange={(event) => changeQuality(event.target.value as QualityMode)}>
              <option value="performance">Performance</option>
              <option value="balanced">Balanced</option>
              <option value="high">High</option>
            </select>
          </label>
          <div className="control-row">
            <button type="button" onClick={toggleRotation}>{autoRotate ? 'Pause rotation' : 'Resume rotation'}</button>
            <button type="button" onClick={() => rendererRef.current?.resetView()}>Reset view</button>
          </div>
        </div>

        {diagnostics && (
          <details className="diagnostics">
            <summary>Renderer diagnostics</summary>
            <dl>
              <div><dt>Canvas</dt><dd>{diagnostics.width} × {diagnostics.height}</dd></div>
              <div><dt>Pixel ratio</dt><dd>{diagnostics.pixelRatio.toFixed(2)}</dd></div>
              <div><dt>Draw calls</dt><dd>{diagnostics.drawCalls}</dd></div>
              <div><dt>Triangles</dt><dd>{diagnostics.triangles.toLocaleString()}</dd></div>
              <div><dt>Context</dt><dd>{diagnostics.contextLost ? 'LOST' : 'READY'}</dd></div>
            </dl>
          </details>
        )}
      </aside>

      <footer className="bottom-instrument">
        <span>UTC scene clock</span>
        <time dateTime={clock.toISOString()}>{formatUtc(clock)}</time>
      </footer>
    </main>
  );
}
