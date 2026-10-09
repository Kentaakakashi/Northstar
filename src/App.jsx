import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight, Check, ChevronRight, Clock3, Compass, Crosshair,
  GitBranch, Layers3, MoreHorizontal, Plus, RefreshCw, ShieldCheck,
  Sparkles, Target, Timer, TrendingUp, Wallet, X, Zap,
} from "lucide-react";
import BlurText from "./components/BlurText";

const initialGoals = [
  {
    id: "goal-1", title: "Get into NIT / IIT", category: "Education", horizon: "2 years",
    progress: 61, status: "On route", accent: "violet",
    milestones: [
      { label: "Build fundamentals", done: true },
      { label: "JEE preparation", done: true },
      { label: "Rank target", done: false },
    ],
    nextMove: "Finish the current Physics block", signal: "Ahead of baseline",
  },
  {
    id: "goal-2", title: "Build a stronger body", category: "Health", horizon: "8 months",
    progress: 34, status: "Needs attention", accent: "green",
    milestones: [
      { label: "Baseline", done: true },
      { label: "Training system", done: false },
      { label: "Consistency", done: false },
    ],
    nextMove: "Complete 3 training sessions this week", signal: "Consistency slipping",
  },
];

const routeOptions = [
  {
    id: "primary", label: "PRIMARY ROUTE", title: "Build the foundation first.",
    meta: "Balanced · 24 months", fit: 91,
    description: "Prioritises durable fundamentals before the high-pressure phase. Slower today, stronger later.",
    color: "violet", tags: ["Lower burnout", "Strong base", "Flexible"],
  },
  {
    id: "accelerated", label: "ACCELERATED", title: "Push the exam window.",
    meta: "Aggressive · 16 months", fit: 77,
    description: "Compresses the learning curve and moves faster toward the target. Higher weekly load.",
    color: "blue", tags: ["Faster", "Higher load", "Less slack"],
  },
  {
    id: "fallback", label: "BACKUP ROUTE", title: "Keep the destination, change the road.",
    meta: "Resilient · 30 months", fit: 84,
    description: "Protects the long-term goal with a lower-risk route when money, time, or results shift.",
    color: "green", tags: ["Lower risk", "More options", "Adaptive"],
  },
];

const todayActions = [
  { id: "physics", title: "Finish Physics: Current Electricity", meta: "45 min", tone: "violet" },
  { id: "review", title: "Review yesterday's mistakes", meta: "20 min", tone: "neutral" },
  { id: "training", title: "Train · upper body", meta: "40 min", tone: "green" },
];

function localDateKey() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

const journey = [
  { title: "Goal captured", date: "Mon", detail: "Northstar understood the destination.", done: true },
  { title: "Reality checked", date: "Tue", detail: "Constraints and capacity were mapped.", done: true },
  { title: "Route selected", date: "Wed", detail: "Primary route chosen from 3 viable paths.", done: true },
  { title: "Execution window", date: "Now", detail: "Daily actions are being tracked.", done: false },
  { title: "Next checkpoint", date: "In 14 days", detail: "Reassess pace, risk, and route fit.", done: false },
];

const placeholders = [
  "I want to get into IIT...",
  "I want to build a successful business...",
  "I want to get stronger...",
  "I want to travel through Japan...",
  "I want to learn cybersecurity...",
];

function inferGoalType(goal) {
  const value = goal.toLowerCase();
  if (/iit|nit|college|university|exam|jee|gate|degree|study|school/.test(value)) return "education";
  if (/travel|trip|japan|europe|visit|vacation/.test(value)) return "travel";
  if (/business|company|startup|money|income|career|job/.test(value)) return "career";
  if (/gym|strong|fitness|body|weight|muscle|health/.test(value)) return "health";
  return "general";
}

function SpotlightCard({ children, className = "", onClick }) {
  const [spot, setSpot] = useState({ x: "50%", y: "50%" });
  return (
    <div
      className={`spotlight-card ${className}`}
      style={{ "--spot-x": spot.x, "--spot-y": spot.y }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setSpot({
          x: `${((event.clientX - rect.left) / rect.width) * 100}%`,
          y: `${((event.clientY - rect.top) / rect.height) * 100}%`,
        });
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, note }) {
  return (
    <SpotlightCard className="stat-card">
      <div className="stat-icon"><Icon size={15} /></div>
      <span className="stat-label">{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </SpotlightCard>
  );
}

function GoalCard({ goal, onOpen }) {
  const completed = goal.milestones.filter((item) => item.done).length;
  return (
    <SpotlightCard className="goal-card" onClick={() => onOpen(goal)}>
      <div className="goal-card-top">
        <span className={`goal-icon ${goal.accent}`}><Target size={17} /></span>
        <span className="card-arrow"><ArrowUpRight size={17} /></span>
      </div>
      <div className="goal-card-meta">
        <span>{goal.category}</span><span>·</span><span>{goal.horizon}</span>
      </div>
      <h3>{goal.title}</h3>
      <div className="goal-progress-row">
        <span>{goal.progress}% trajectory</span>
        <span>{completed}/{goal.milestones.length} checkpoints</span>
      </div>
      <div className="progress-track"><span style={{ width: `${goal.progress}%` }} /></div>
      <div className="goal-status-line">
        <span className={`status-pill ${goal.accent}`}>{goal.status}</span>
        <span className="signal"><span className="signal-dot" />{goal.signal}</span>
      </div>
      <div className="goal-next">
        <span>NEXT MOVE</span>
        <strong>{goal.nextMove}</strong>
      </div>
    </SpotlightCard>
  );
}

function GoalDetail({ goal, onClose }) {
  return (
    <div className="detail-overlay" role="dialog" aria-modal="true">
      <button className="detail-backdrop" aria-label="Close" onClick={onClose} />
      <section className="detail-panel">
        <div className="detail-head">
          <div>
            <p className="eyebrow"><Target size={13} /> GOAL MAP</p>
            <h2>{goal.title}</h2>
            <p>{goal.category} · {goal.horizon} · {goal.progress}% trajectory</p>
          </div>
          <button className="goal-close" onClick={onClose} aria-label="Close"><X size={17} /></button>
        </div>

        <div className="detail-grid">
          <SpotlightCard className="detail-focus">
            <span className="micro-label">NEXT BEST MOVE</span>
            <strong>{goal.nextMove}</strong>
            <p>Northstar keeps the immediate action small enough to execute, but tied to the larger route.</p>
            <button className="button button-primary"><Zap size={14} /> Start action</button>
          </SpotlightCard>
          <div className="detail-stats">
            <div className="detail-stat"><span>Trajectory</span><strong>{goal.progress}%</strong></div>
            <div className="detail-stat"><span>Signal</span><strong>{goal.signal}</strong></div>
            <div className="detail-stat"><span>Health</span><strong>{goal.status}</strong></div>
          </div>
        </div>

        <div className="detail-section">
          <div className="detail-section-head"><span>CHECKPOINTS</span><span>{goal.milestones.length} milestones</span></div>
          <div className="checkpoint-list">
            {goal.milestones.map((milestone) => (
              <div className={`checkpoint-row ${milestone.done ? "done" : ""}`} key={milestone.label}>
                <span className="checkpoint-mark">{milestone.done ? <Check size={11} /> : null}</span>
                <span>{milestone.label}</span>
                <ChevronRight size={14} />
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <div className="detail-section-head"><span>ROUTE OPTIONS</span><button className="text-button">Compare <ChevronRight size={14} /></button></div>
          <div className="mini-route-list">
            {routeOptions.map((route, index) => (
              <div className="mini-route" key={route.id}>
                <div>
                  <span className={`route-index ${route.color}`}>{index + 1}</span>
                  <div><strong>{route.title}</strong><small>{route.meta}</small></div>
                </div>
                <span className="fit-score">{route.fit}% fit</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function RouteMap() {
  return (
    <div className="route-map route-map-large">
      <div className="map-grid" />
      <div className="map-orbit orbit-a" /><div className="map-orbit orbit-b" />
      <div className="branch branch-a" /><div className="branch branch-b" /><div className="branch branch-c" />
      <div className="map-node today"><span /><small>Today</small></div>
      <div className="map-node foundation"><span /><small>Foundation</small></div>
      <div className="map-node pressure"><span /><small>Exam window</small></div>
      <div className="map-node target"><b><Target size={14} /></b><small>NIT / IIT</small></div>
      <div className="route-callout callout-a">build fundamentals</div>
      <div className="route-callout callout-b">checkpoint · 14d</div>
    </div>
  );
}

function RouteCard({ route, selected, onSelect }) {
  return (
    <button className={`route-card ${selected ? "selected" : ""}`} onClick={() => onSelect(route.id)}>
      <div className="route-card-top"><span>{route.label}</span><span>{route.fit}% fit</span></div>
      <h3>{route.title}</h3>
      <p>{route.description}</p>
      <div className="route-tags">{route.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <div className="route-card-footer"><span>{route.meta}</span><ArrowUpRight size={14} /></div>
    </button>
  );
}

function GoalCapture({ onClose, onCreate }) {
  const [goal, setGoal] = useState("");
  const [stage, setStage] = useState("capture");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const goalType = useMemo(() => inferGoalType(goal), [goal]);

  const questions = useMemo(() => {
    const banks = {
      education: [
        { label: "STARTING POINT", title: "Where are you academically right now?", hint: "Northstar needs your current level, not your target.", options: ["Starting from scratch", "I know the basics", "Already preparing seriously", "I’m already close"] },
        { label: "CAPACITY", title: "What can you sustain every week?", hint: "The strongest route is the one you can actually repeat.", options: ["30–60 min / day", "1–2 hours / day", "2–4 hours / day", "It changes by the day"] },
        { label: "REALITY", title: "What constraint matters most?", hint: "This changes which route deserves to be primary.", options: ["Money", "Time / school", "Current scores / skills", "Nothing major"] },
      ],
      travel: [
        { label: "STARTING POINT", title: "How far along is the trip?", hint: "Planning stage matters more than the destination name alone.", options: ["Just an idea", "Destination picked", "Dates roughly picked", "Already booking"] },
        { label: "CAPACITY", title: "What kind of budget are we working with?", hint: "Northstar will trade comfort, time, and distance around this.", options: ["Tight", "Moderate", "Comfortable", "Flexible"] },
        { label: "REALITY", title: "What could derail the trip?", hint: "We’ll build around the actual constraint, not an imaginary perfect scenario.", options: ["Money", "Time off", "Visa / logistics", "Nothing major"] },
      ],
      career: [
        { label: "STARTING POINT", title: "Where are you in the journey?", hint: "Tell Northstar how close you are to the outcome.", options: ["Idea only", "Learning the basics", "Already building", "Already earning"] },
        { label: "CAPACITY", title: "How much time can you defend?", hint: "Consistency beats an ambitious plan that collapses.", options: ["30–60 min / day", "1–2 hours / day", "2–4 hours / day", "It depends"] },
        { label: "REALITY", title: "Which tradeoff worries you most?", hint: "We’ll use this when comparing routes.", options: ["Money", "Time", "Skill gap", "Market uncertainty"] },
      ],
      health: [
        { label: "STARTING POINT", title: "Where are you starting from physically?", hint: "The route should match your real baseline.", options: ["Starting from zero", "Occasional activity", "Training already", "Already consistent"] },
        { label: "CAPACITY", title: "What can you sustain?", hint: "A perfect week is less useful than a repeatable one.", options: ["2 days / week", "3 days / week", "4–5 days / week", "It changes"] },
        { label: "REALITY", title: "What is most likely to get in the way?", hint: "Northstar should account for the friction before it appears.", options: ["Time", "Motivation", "Money / access", "Nothing major"] },
      ],
      general: [
        { label: "STARTING POINT", title: "Where are you starting from?", hint: "Northstar needs your actual position, not the version you wish you were at.", options: ["Starting from scratch", "I know the basics", "Already making progress", "I’m already close"] },
        { label: "CAPACITY", title: "How much can you realistically give this?", hint: "We’ll use this to avoid building a plan you cannot sustain.", options: ["30–60 min / day", "1–2 hours / day", "2–4 hours / day", "It depends on the day"] },
        { label: "REALITY", title: "What could get in the way?", hint: "The biggest constraint gets surfaced before the route is built.", options: ["Money", "Time", "Knowledge / skills", "Nothing major"] },
      ],
    };
    return banks[goalType];
  }, [goalType]);

  useEffect(() => {
    const timer = window.setInterval(() => setPlaceholderIndex((current) => (current + 1) % placeholders.length), 3000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const handler = (event) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const submit = (event) => {
    event.preventDefault();
    if (!goal.trim()) return;
    setStage("interview");
    setStep(0);
  };

  const answer = (value) => {
    const next = { ...answers, [step]: value };
    setAnswers(next);
    if (step < questions.length - 1) setStep((current) => current + 1);
    else setStage("reality");
  };

  const assessment = useMemo(() => {
    const constraint = answers[2] || "Not yet specified";
    const capacity = answers[1] || "Not yet specified";
    const start = answers[0] || "Not yet specified";
    const typeLabel = goalType === "general" ? "general objective" : goalType;
    return {
      typeLabel, start, capacity, constraint,
      read: [
        `You are pursuing a ${typeLabel} goal: “${goal.trim()}”.`,
        `Your current position is “${start.toLowerCase()}”, so the first route should begin there.`,
        `Your available capacity is “${capacity.toLowerCase()}”, which should shape the pace.`,
      ],
    };
  }, [answers, goal, goalType]);

  return (
    <div className="goal-overlay" role="dialog" aria-modal="true" aria-labelledby="goal-capture-title">
      <button className="goal-overlay-backdrop" aria-label="Close" onClick={onClose} />
      <section className={`goal-capture ${stage !== "capture" ? "interview-mode" : ""}`}>
        <button className="goal-close" onClick={onClose} aria-label="Close"><X size={17} /></button>

        {stage === "capture" && (
          <>
            <div className="goal-capture-icon"><Compass size={19} /></div>
            <p className="eyebrow">NEW NORTHSTAR</p>
            <h2 id="goal-capture-title">What are you trying to achieve?</h2>
            <p className="goal-capture-copy">Don’t turn it into a plan yet. Tell Northstar what you want in your own words.</p>
            <form onSubmit={submit}>
              <div className="goal-input-wrap">
                <textarea autoFocus value={goal} onChange={(event) => setGoal(event.target.value)} placeholder={placeholders[placeholderIndex]} rows={3} aria-label="Describe your goal" />
                <div className="goal-input-footer">
                  <span>{goal.length ? "Northstar is listening." : "Specific or vague. We can work from either."}</span>
                  <button className="capture-submit" type="submit" disabled={!goal.trim()}>Continue <ArrowUpRight size={15} /></button>
                </div>
              </div>
            </form>
            <div className="capture-hint"><Sparkles size={13} /><span>Next: Northstar asks only what could change the route.</span></div>
          </>
        )}

        {stage === "interview" && (
          <>
            <div className="interview-top"><span>ADAPTIVE INTERVIEW</span><span>{step + 1} / {questions.length}</span></div>
            <div className="interview-progress"><span style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></div>
            <p className="eyebrow">{questions[step].label}</p>
            <h2>{questions[step].title}</h2>
            <p className="goal-capture-copy">{questions[step].hint}</p>
            <div className="answer-list">
              {questions[step].options.map((option) => (
                <button className={`answer-option ${answers[step] === option ? "selected" : ""}`} key={option} onClick={() => answer(option)}>
                  <span>{option}</span><ArrowUpRight size={15} />
                </button>
              ))}
            </div>
            <div className="capture-hint"><Sparkles size={13} /><span>Northstar is narrowing the route around your reality.</span></div>
          </>
        )}

        {stage === "reality" && (
          <div className="reality-stage">
            <div className="reality-kicker"><ShieldCheck size={14} /> PRELIMINARY ASSESSMENT</div>
            <p className="eyebrow">REALITY CHECK</p>
            <h2>This is what Northstar thinks it heard.</h2>
            <p className="goal-capture-copy">This isn’t a verdict. It is the first model of your situation before routes are generated.</p>

            <div className="reality-goal">
              <span>DESTINATION</span><strong>{goal}</strong><small>{assessment.typeLabel}</small>
            </div>

            <div className="reality-grid">
              {[
                ["Starting point", assessment.start],
                ["Capacity", assessment.capacity],
                ["Main constraint", assessment.constraint],
              ].map(([label, value]) => (
                <div className="reality-item" key={label}><span>{label}</span><strong>{value}</strong></div>
              ))}
            </div>

            <div className="reality-read">
              <div className="detail-section-head"><span>INITIAL READ</span><span>3 signals</span></div>
              {assessment.read.map((item) => <p key={item}>• {item}</p>)}
            </div>

            <div className="reality-actions">
              <button className="button button-quiet" onClick={() => setStage("interview")}>Edit answers</button>
              <button className="capture-submit" onClick={() => onCreate({ goal, answers, goalType })}>Build routes <ArrowUpRight size={15} /></button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function App() {
  const [captureOpen, setCaptureOpen] = useState(false);
  const [activeGoals, setActiveGoals] = useState(() => {
    try {
      const saved = window.localStorage.getItem("northstar-goals");
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : initialGoals;
    } catch {
      return initialGoals;
    }
  });
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState("primary");
  const [scenario, setScenario] = useState("baseline");
  const [activeNav, setActiveNav] = useState("today");
  const [dailyActions, setDailyActions] = useState(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem("northstar-daily-plan") || "null");
      return saved?.date === localDateKey() && Array.isArray(saved.actions) ? saved.actions : todayActions;
    } catch {
      return todayActions;
    }
  });
  const [showActionForm, setShowActionForm] = useState(false);
  const [actionDraft, setActionDraft] = useState("");
  const [actionMinutes, setActionMinutes] = useState("20");
  const [completedActions, setCompletedActions] = useState(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem("northstar-daily-progress") || "null");
      return saved?.date === localDateKey() && Array.isArray(saved.completed) ? saved.completed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    document.body.style.overflow = captureOpen || selectedGoal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [captureOpen, selectedGoal]);

  useEffect(() => {
    window.localStorage.setItem("northstar-goals", JSON.stringify(activeGoals));
  }, [activeGoals]);

  useEffect(() => {
    window.localStorage.setItem("northstar-daily-progress", JSON.stringify({
      date: localDateKey(),
      completed: completedActions,
    }));
  }, [completedActions]);

  useEffect(() => {
    window.localStorage.setItem("northstar-daily-plan", JSON.stringify({
      date: localDateKey(),
      actions: dailyActions,
    }));
  }, [dailyActions]);

  const handleAddAction = (event) => {
    event.preventDefault();
    const title = actionDraft.trim();
    if (!title) return;
    setDailyActions((current) => [...current, {
      id: `custom-${Date.now()}`,
      title,
      meta: `${actionMinutes} min`,
      tone: "neutral",
    }]);
    setActionDraft("");
    setActionMinutes("20");
    setShowActionForm(false);
  };

  const toggleAction = (actionId) => {
    setCompletedActions((current) => current.includes(actionId)
      ? current.filter((id) => id !== actionId)
      : [...current, actionId]);
  };
  const completedCount = dailyActions.filter((action) => completedActions.includes(action.id)).length;

  const scenarioAdjustments = {
    baseline: { label: "Current reality", primary: 0, accelerated: 0, fallback: 0, copy: "Nothing has changed. Compare the route on today's assumptions." },
    "more-time": { label: "I gain more time", primary: 3, accelerated: 8, fallback: -2, copy: "Extra capacity makes the faster route more viable without sacrificing the destination." },
    "less-time": { label: "My time gets tighter", primary: 4, accelerated: -12, fallback: 6, copy: "A tighter schedule makes resilience more valuable and the aggressive route less forgiving." },
    "money-shifts": { label: "Money gets tighter", primary: 1, accelerated: -8, fallback: 9, copy: "The backup route rises because it keeps more options open under financial pressure." },
  };

  const routeFitForScenario = (route) => Math.max(
    55,
    Math.min(98, route.fit + scenarioAdjustments[scenario][route.id] )
  );

  const handleCreateGoal = ({ goal, answers, goalType }) => {
    const category = goalType === "general" ? "Goal" : goalType[0].toUpperCase() + goalType.slice(1);
    const newGoal = {
      id: `goal-${Date.now()}`, title: goal, category, horizon: "Route pending",
      progress: 4, status: "Needs a route",
      accent: goalType === "health" ? "green" : goalType === "travel" ? "blue" : "violet",
      milestones: [
        { label: "Reality mapped", done: true },
        { label: "Route generated", done: false },
        { label: "First checkpoint", done: false },
      ],
      nextMove: answers[0] ? `Work from “${answers[0].toLowerCase()}”` : "Choose your first checkpoint",
      signal: "Newly captured",
    };
    setActiveGoals((current) => [newGoal, ...current]);
    setCaptureOpen(false);
    setActiveNav("goals");
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark"><Compass size={17} strokeWidth={2.1} /></div><span>NORTHSTAR</span></div>
        <nav className="nav">
          {[
            ["today", <Crosshair size={16} />, "Today"],
            ["goals", <Target size={16} />, "Goals"],
            ["routes", <GitBranch size={16} />, "Routes"],
          ].map(([id, icon, label]) => (
            <a key={id} className={`nav-item ${activeNav === id ? "active" : ""}`} href={`#${id}`} onClick={() => setActiveNav(id)}>
              {icon} {label} {id === "goals" && <span className="nav-count">{activeGoals.length}</span>}
            </a>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="quiet-label">NAVIGATION HEALTH</div>
          <div className="north-star-mini"><span className="status-dot" /><div><strong>Route stable</strong><small>1 signal needs attention</small></div></div>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div className="crumb">NORTHSTAR <span>/</span> {activeNav.toUpperCase()}</div>
          <div className="topbar-actions"><span className="sync-chip"><span /> Synced just now</span><button className="avatar" aria-label="Profile">K</button></div>
        </header>

        <div className="page">
          <section className="hero" id="today">
            <div className="hero-copy">
              <p className="eyebrow"><Sparkles size={13} /> YOUR NEXT BEST MOVE</p>
              <h1><BlurText text="Know where you’re going." delay={55} /></h1>
              <p className="hero-sub">Northstar turns a goal into a living route — shaped around your reality, watching the path as it changes.</p>
              <div className="hero-actions">
                <button className="button button-primary" onClick={() => setCaptureOpen(true)}><Plus size={16} /> Add a goal</button>
                <a className="button button-quiet" href="#routes">Open route map <ArrowUpRight size={15} /></a>
              </div>
              <div className="hero-metrics">
                <div><strong>{activeGoals.length}</strong><span>active goals</span></div>
                <div><strong>3</strong><span>live routes</span></div>
                <div><strong>14d</strong><span>next checkpoint</span></div>
              </div>
            </div>

            <div className="hero-radar" aria-hidden="true">
              <div className="radar-shell">
                <div className="radar-ring r1" /><div className="radar-ring r2" /><div className="radar-ring r3" />
                <div className="radar-axis axis-x" /><div className="radar-axis axis-y" /><div className="radar-sweep" />
                <div className="radar-core"><Compass size={23} /></div>
                <span className="radar-point p1" /><span className="radar-point p2" /><span className="radar-point p3" />
                <span className="radar-label rl1">TARGET</span><span className="radar-label rl2">RISK</span><span className="radar-label rl3">NOW</span>
              </div>
            </div>
          </section>

          <section className="section intelligence-section">
            <div className="section-heading">
              <div><p className="eyebrow">TODAY'S INTELLIGENCE</p><h2>Know what matters before you start.</h2></div>
              <span className="section-note">Updated from your current route</span>
            </div>
            <div className="intel-grid">
              <SpotlightCard className="brief-card">
                <div className="brief-head"><div className="brief-icon"><Zap size={15} /></div><span>DAILY BRIEF</span><MoreHorizontal size={17} /></div>
                <h3>Your route is healthy, but the Physics block is the current bottleneck.</h3>
                <p>The best move today is not “study more.” It is closing one specific knowledge gap and recording the result.</p>
                <div className="brief-bottom"><span><Clock3 size={13} /> 65 min focus budget</span><button className="text-button">Open brief <ArrowUpRight size={13} /></button></div>
              </SpotlightCard>
              <div className="stat-grid">
                <StatCard icon={TrendingUp} label="TRAJECTORY" value="+8%" note="vs. last checkpoint" />
                <StatCard icon={ShieldCheck} label="ROUTE HEALTH" value="91%" note="primary route fit" />
                <StatCard icon={Timer} label="FOCUS LEFT" value="2h 15m" note="planned today" />
                <StatCard icon={Wallet} label="CONSTRAINT" value="Stable" note="no new blockers" />
              </div>
            </div>
          </section>

          <section className="section" id="goals">
            <div className="section-heading">
              <div><p className="eyebrow">ACTIVE NORTHSTARS</p><h2>Where you’re headed</h2></div>
              <button className="text-button" onClick={() => setCaptureOpen(true)}>Create goal <Plus size={14} /></button>
            </div>
            <div className="goal-grid">
              {activeGoals.map((goal) => <GoalCard goal={goal} onOpen={setSelectedGoal} key={goal.id} />)}
              <button className="goal-card add-card" onClick={() => setCaptureOpen(true)}>
                <span className="add-icon"><Plus size={18} /></span>
                <strong>Start another goal</strong><span>Capture the destination first. The route comes after.</span>
              </button>
            </div>
          </section>

          <section className="section route-section" id="routes">
            <div className="section-heading">
              <div><p className="eyebrow">ROUTE LAB</p><h2>There is more than one way forward.</h2></div>
              <span className="route-meta">3 viable paths</span>
            </div>
            <div className="route-lab">
              <div className="route-choice-list">
                {routeOptions.map((route) => {
                  const adjusted = { ...route, fit: routeFitForScenario(route) };
                  return <RouteCard key={route.id} route={adjusted} selected={selectedRoute === route.id} onSelect={setSelectedRoute} />;
                })}
              </div>
              <div className="route-map-wrap">
                <RouteMap />
                <div className="scenario-panel">
                  <div>
                    <span className="micro-label">WHAT-IF SIMULATOR</span>
                    <strong>{scenarioAdjustments[scenario].label}</strong>
                    <p>{scenarioAdjustments[scenario].copy}</p>
                  </div>
                  <div className="scenario-options">
                    {Object.entries(scenarioAdjustments).map(([id, item]) => (
                      <button key={id} className={`scenario-option ${scenario === id ? "selected" : ""}`} onClick={() => setScenario(id)}>
                        {id === "baseline" ? "Today" : id === "more-time" ? "More time" : id === "less-time" ? "Less time" : "Money shifts"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section execution-section">
            <div className="section-heading">
              <div><p className="eyebrow">EXECUTION</p><h2>Turn the route into something you can do today.</h2></div>
              <span className="section-note">{completedCount}/{dailyActions.length} complete · today's plan</span>
            </div>
            <div className="execution-grid">
              <SpotlightCard className="action-card">
                <div className="action-head"><span>TODAY</span><span>{completedCount} OF {dailyActions.length} COMPLETE</span></div>
                <div className="action-progress" role="progressbar" aria-label="Today's completed actions" aria-valuemin={0} aria-valuemax={dailyActions.length} aria-valuenow={completedCount}>
                  <span style={{ width: `${dailyActions.length ? (completedCount / dailyActions.length) * 100 : 0}%` }} />
                </div>
                <div className="action-list">
                  {dailyActions.map((action, index) => {
                    const isComplete = completedActions.includes(action.id);
                    return (
                      <button
                        className={`action-row ${index === 0 ? "primary-action" : ""} ${isComplete ? "is-complete" : ""}`}
                        key={action.id}
                        onClick={() => toggleAction(action.id)}
                        aria-pressed={isComplete}
                      >
                        <span className={`action-check ${action.tone} ${isComplete ? "checked" : ""}`}>{isComplete ? <Check size={12} /> : index === 0 ? <Zap size={12} /> : null}</span>
                        <span><strong>{action.title}</strong><small>{isComplete ? "Completed today" : action.meta}</small></span>
                        {isComplete ? <Check size={14} /> : <ChevronRight size={14} />}
                      </button>
                    );
                  })}
                </div>
                <p className="action-footnote">{dailyActions.length > 0 && completedCount === dailyActions.length ? "All planned actions complete. Nice work." : "Tap an action when it’s done. Progress saves automatically and resets tomorrow."}</p>
                {showActionForm && (
                  <form className="add-action-form" onSubmit={handleAddAction}>
                    <label>Action name
                      <input value={actionDraft} onChange={(event) => setActionDraft(event.target.value)} maxLength={80} placeholder="e.g. Practise 5 physics sums" required />
                    </label>
                    <label>Time budget
                      <select value={actionMinutes} onChange={(event) => setActionMinutes(event.target.value)}>
                        <option value="10">10 minutes</option>
                        <option value="20">20 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="90">90 minutes</option>
                      </select>
                    </label>
                    <div className="add-action-controls">
                      <button type="button" className="button button-quiet" onClick={() => setShowActionForm(false)}>Cancel</button>
                      <button type="submit" className="button button-primary">Add to today <Plus size={13} /></button>
                    </div>
                  </form>
                )}
                <button className="button button-secondary action-button" onClick={() => setShowActionForm((visible) => !visible)}><Plus size={14} /> {showActionForm ? "Close action form" : "Add action"}</button>
              </SpotlightCard>

              <SpotlightCard className="trajectory-card">
                <div className="brief-head"><div className="brief-icon neutral"><Layers3 size={15} /></div><span>JOURNEY LOG</span></div>
                <div className="journey-timeline">
                  {journey.map((item, index) => (
                    <div className={`journey-item ${item.done ? "done" : ""}`} key={item.title}>
                      <div className="journey-rail"><span>{item.done ? <Check size={10} /> : index === 3 ? <span className="live-dot" /> : null}</span>{index !== journey.length - 1 && <i />}</div>
                      <div><div className="journey-meta"><strong>{item.title}</strong><span>{item.date}</span></div><p>{item.detail}</p></div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>

              <SpotlightCard className="reroute-card">
                <div className="reroute-orb"><RefreshCw size={17} /></div>
                <span className="micro-label">REROUTE SIGNAL</span>
                <h3>One variable changed.</h3>
                <p>Your workload is tighter than the current route assumed. Northstar can rebalance the next 14 days without abandoning the destination.</p>
                <button className="button button-primary">Review reroute <ArrowUpRight size={14} /></button>
              </SpotlightCard>
            </div>
          </section>

          <section className="section principle-section">
            <div className="principle-card">
              <div><p className="eyebrow"><Compass size={13} /> THE NORTHSTAR PRINCIPLE</p><h2>The plan is allowed to change. The destination is not.</h2></div>
              <div className="principle-side"><span>GOAL</span><strong>↓</strong><span>ROUTE</span><strong>↓</strong><span>ACTION</span><strong>↓</strong><span>REALITY</span></div>
            </div>
          </section>

          <footer><span>NORTHSTAR</span><span>Goals. Routes. Reality. Reroute.</span></footer>
        </div>
      </section>

      {captureOpen && <GoalCapture onClose={() => setCaptureOpen(false)} onCreate={handleCreateGoal} />}
      {selectedGoal && <GoalDetail goal={selectedGoal} onClose={() => setSelectedGoal(null)} />}
    </main>
  );
}

export default App;