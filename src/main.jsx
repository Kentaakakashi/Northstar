import { createRoot } from "react-dom/client";
import "./styles.css";

const root = document.getElementById("root");

root.innerHTML = `
  <div style="min-height:100vh;display:grid;place-items:center;padding:24px;background:#080809;color:#eeeef1;font-family:system-ui,sans-serif">
    <div style="max-width:620px;width:100%;padding:28px;border:1px solid rgba(255,255,255,.1);border-radius:16px;background:#0e0e10">
      <div style="font-size:11px;letter-spacing:.16em;color:#8f8f98;font-weight:700">NORTHSTAR</div>
      <h1 style="margin:12px 0 8px;font-size:24px">Starting navigation system…</h1>
      <p id="boot-status" style="margin:0;color:#777780;font-size:13px;line-height:1.6">Loading the interface.</p>
      <pre id="boot-error" style="display:none;margin-top:18px;padding:14px;overflow:auto;white-space:pre-wrap;background:#09090a;border:1px solid rgba(255,255,255,.08);border-radius:10px;color:#ffaaa7;font-size:11px;line-height:1.5"></pre>
    </div>
  </div>
`;

const status = document.getElementById("boot-status");
const errorBox = document.getElementById("boot-error");

import("./App.jsx")
  .then(({ default: App }) => {
    createRoot(root).render(<App />);
  })
  .catch((error) => {
    console.error("Northstar failed to start:", error);
    status.textContent = "Northstar could not start. The exact browser error is below.";
    errorBox.style.display = "block";
    errorBox.textContent = error?.stack || error?.message || String(error);
  });
