import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

class NorthstarErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      const message =
        this.state.error?.stack ||
        this.state.error?.message ||
        String(this.state.error);

      return (
        <div
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: 24,
            background: "#080809",
            color: "#eeeef1",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 680,
              padding: 28,
              border: "1px solid rgba(255,255,255,.1)",
              borderRadius: 16,
              background: "#0e0e10",
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: ".16em",
                color: "#8f8f98",
                fontWeight: 700,
              }}
            >
              NORTHSTAR
            </div>
            <h1 style={{ margin: "12px 0 8px", fontSize: 24 }}>
              Northstar could not render.
            </h1>
            <p
              style={{
                margin: 0,
                color: "#777780",
                fontSize: 13,
                lineHeight: 1.6,
              }}
            >
              The application started, but a component failed while rendering.
            </p>
            <pre
              style={{
                marginTop: 18,
                padding: 14,
                overflow: "auto",
                whiteSpace: "pre-wrap",
                background: "#09090a",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 10,
                color: "#ffaaa7",
                fontSize: 11,
                lineHeight: 1.5,
              }}
            >
              {message}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById("root")).render(
  <NorthstarErrorBoundary>
    <App />
  </NorthstarErrorBoundary>
);
