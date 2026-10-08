import { motion } from "motion/react";
import BlurText from "./components/BlurText";
import {
  ArrowUpRight,
  ChevronRight,
  Compass,
  Crosshair,
  Plus,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

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

function App() {
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
              <h1><BlurText text="Know where you’re going." delay={55} stepDuration={0.3} /></h1>
              <p className="hero-sub">
                Northstar turns a goal into a living route — shaped around your reality,
                not some generic productivity template.
              </p>
              <div className="hero-actions">
                <button className="button button-primary"><Plus size={16} /> Add a goal</button>
                <button className="button button-quiet">View your routes <ArrowUpRight size={15} /></button>
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
              {goals.map((goal, index) => (
                <motion.article
                  className="goal-card"
                  key={goal.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + index * 0.08, duration: 0.5 }}
                  whileHover={{ y: -3 }}
                >
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
                </motion.article>
              ))}

              <button className="goal-card add-card">
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
    </main>
  );
}

export default App;
