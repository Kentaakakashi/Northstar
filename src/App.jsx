import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ChevronRight,
  Compass,
  Crosshair,
  Plus,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import BlurText from "./components/BlurText";

const goals = [
  {
    title: "Get into NIT / IIT",
    category: "Education",
    horizon: "2 years",
    progress: "On route",
    accent: "violet",
    milestones: ["Build fundamentals", "JEE preparation", "Rank target"],
  },
  {
    title: "Build a stronger body",
    category: "Health",
    horizon: "8 months",
    progress: "Needs attention",
    accent: "green",
    milestones: ["Baseline", "Training system", "Consistency"],
  },
];

const placeholders = [
  "I want to get into IIT...",
  "I want to build a successful business...",
  "I want to get stronger...",
  "I want to travel through Japan...",
  "I want to learn cybersecurity...",
];

function RoutePreview() {
  return (
    <div className="route-map">
      <div className="route-line route-line-a" />
      <div className="route-line route-line-b" />
      <div className="route-node node-origin">
        <span className="node-dot" />
        <span>Today</span>
      </div>
      <div className="route-node node-mid">
        <span className="node-dot" />
        <span>Foundation</span>
      </div>
      <div className="route-node node-target">
        <span className="target-ring"><Target size={15} /></span>
        <span>NIT / IIT</span>
      </div>
    </div>
  );
}

function GoalCapture({ onClose }) {
  const [goal, setGoal] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPlaceholderIndex((current) => (current + 1) % placeholders.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  const submit = (event) => {
    event.preventDefault();
    if (!goal.trim()) return;
    window.alert("Goal captured. The adaptive interview is the next Northstar step.");
  };

  return (
    <div className="goal-overlay" role="dialog" aria-modal="true" aria-labelledby="goal-capture-title">
      <button className="goal-overlay-backdrop" aria-label="Close" onClick={onClose} />
      <section className="goal-capture">
        <button className="goal-close" onClick={onClose} aria-label="Close goal capture">
          <X size={17} />
        </button>

        <div className="goal-capture-icon">
          <Compass size={19} />
        </div>
        <p className="eyebrow">NEW NORTHSTAR</p>
        <h2 id="goal-capture-title">What are you trying to achieve?</h2>
        <p className="goal-capture-copy">
          Don’t turn it into a plan yet. Just tell Northstar what you want in your own words.
        </p>

        <form onSubmit={submit}>
          <div className="goal-input-wrap">
            <textarea
              autoFocus
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              placeholder={placeholders[placeholderIndex]}
              rows={3}
              aria-label="Describe your goal"
            />
            <div className="goal-input-footer">
              <span>{goal.length ? "Northstar is listening." : "Be specific or be vague. We’ll figure it out."}</span>
              <button className="capture-submit" type="submit" disabled={!goal.trim()}>
                Continue <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        </form>

        <div className="capture-hint">
          <Sparkles size={13} />
          <span>Northstar will ask the questions that actually matter next.</span>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [captureOpen, setCaptureOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = captureOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [captureOpen]);

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><Compass size={17} strokeWidth={2.1} /></div>
          <span>NORTHSTAR</span>
        </div>

        <nav className="nav">
          <a className="nav-item active" href="#today"><Crosshair size={16} /> Today</a>
          <a className="nav-item" href="#goals"><Target size={16} /> Goals <span className="nav-count">2</span></a>
          <a className="nav-item" href="#routes"><TrendingUp size={16} /> Routes</a>
        </nav>

        <div className="sidebar-bottom">
          <div className="quiet-label">YOUR DIRECTION</div>
          <div className="north-star-mini">
            <span className="status-dot" />
            <div>
              <strong>2 active goals</strong>
              <small>1 needs attention</small>
            </div>
          </div>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div className="crumb">TODAY <span>/</span> OVERVIEW</div>
          <button className="avatar" aria-label="Profile">K</button>
        </header>

        <div className="page">
          <section className="hero" id="today">
            <div className="hero-copy">
              <p className="eyebrow"><Sparkles size={13} /> YOUR NEXT BEST MOVE</p>
              <h1><BlurText text="Know where you’re going." delay={55} /></h1>
              <p className="hero-sub">
                Northstar turns a goal into a living route — shaped around your reality,
                not some generic productivity template.
              </p>
              <div className="hero-actions">
                <button className="button button-primary" onClick={() => setCaptureOpen(true)}>
                  <Plus size={16} /> Add a goal
                </button>
                <a className="button button-quiet" href="#routes">
                  View your routes <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
            <div className="hero-orbit" aria-hidden="true">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit orbit-three" />
              <div className="star-core"><Compass size={25} /></div>
            </div>
          </section>

          <section className="section" id="goals">
            <div className="section-heading">
              <div>
                <p className="eyebrow">ACTIVE NORTHSTARS</p>
                <h2>Where you’re headed</h2>
              </div>
              <button className="text-button">See all <ChevronRight size={15} /></button>
            </div>

            <div className="goal-grid">
              {goals.map((goal) => (
                <article className="goal-card" key={goal.title}>
                  <div className="goal-card-top">
                    <span className={`goal-icon ${goal.accent}`}><Target size={17} /></span>
                    <span className="card-arrow"><ArrowUpRight size={17} /></span>
                  </div>
                  <p className="goal-category">{goal.category} · {goal.horizon}</p>
                  <h3>{goal.title}</h3>
                  <div className="goal-status">
                    <span className={`status-pill ${goal.accent}`}>{goal.progress}</span>
                  </div>
                  <div className="milestones">
                    {goal.milestones.map((milestone, i) => (
                      <div className="milestone" key={milestone}>
                        <span className={i === 0 ? "milestone-dot done" : "milestone-dot"} />
                        <span>{milestone}</span>
                        {i < goal.milestones.length - 1 && <span className="milestone-arrow">→</span>}
                      </div>
                    ))}
                  </div>
                </article>
              ))}

              <button className="goal-card add-card" onClick={() => setCaptureOpen(true)}>
                <span className="add-icon"><Plus size={18} /></span>
                <strong>Start another goal</strong>
                <span>Tell Northstar what you want. We’ll figure out what matters next.</span>
              </button>
            </div>
          </section>

          <section className="section route-section" id="routes">
            <div className="section-heading">
              <div>
                <p className="eyebrow">CURRENT ROUTE</p>
                <h2>The path is not fixed.</h2>
              </div>
              <span className="route-meta">NIT / IIT · 2 YEAR HORIZON</span>
            </div>

            <div className="route-panel">
              <div className="route-info">
                <div className="route-badge"><Compass size={15} /> PRIMARY ROUTE</div>
                <h3>Build the foundation first.</h3>
                <p>
                  Your current route prioritizes fundamentals before heavy exam
                  preparation. Northstar will adjust this when your real progress changes.
                </p>
                <button className="button button-secondary">Open route <ArrowUpRight size={15} /></button>
              </div>
              <RoutePreview />
            </div>
          </section>

          <footer>
            <span>NORTHSTAR</span>
            <span>Your goals. Your routes. Your life.</span>
          </footer>
        </div>
      </section>

      {captureOpen && <GoalCapture onClose={() => setCaptureOpen(false)} />}
    </main>
  );
}

export default App;
