import { useEffect, useRef } from 'react';
import { EarthRenderer } from '../scene/EarthRenderer';

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new EarthRenderer(canvas);
    renderer.start();

    return () => renderer.dispose();
  }, []);

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
      </aside>

      <footer className="bottom-instrument">
        <span>UTC scene clock</span>
        <time dateTime={new Date().toISOString()}>{new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC</time>
      </footer>
    </main>
  );
}
