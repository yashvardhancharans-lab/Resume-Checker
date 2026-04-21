"use client";

import { useState } from "react";

export default function Navbar({ activeTab, setActiveTab, onNewAnalysis }) {
  const links = ["Dashboard", "History", "Market Insights"];

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 40px",
        background: "white",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(255,255,255,0.9)",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <span
          style={{
            fontSize: "22px",
            fontWeight: 800,
            color: "var(--primary)",
            letterSpacing: "-0.5px",
          }}
        >
          Resume
        </span>
        <span
          style={{
            fontSize: "22px",
            fontWeight: 800,
            color: "var(--text-primary)",
            letterSpacing: "-0.5px",
          }}
        >
          Architect
        </span>
      </div>

      {/* Nav Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        {links.map((link) => (
          <button
            key={link}
            onClick={() => setActiveTab(link)}
            style={{
              background: "none",
              border: "none",
              fontSize: "14px",
              fontWeight: activeTab === link ? 600 : 400,
              color:
                activeTab === link
                  ? "var(--text-primary)"
                  : "var(--text-secondary)",
              cursor: "pointer",
              position: "relative",
              padding: "4px 0",
              transition: "color 0.2s ease",
              transition: "all 0.2s ease",
              borderBottom: activeTab === link ? "2px solid var(--primary)" : "2px solid transparent",
            }}
          >
            {link}
          </button>
        ))}
      </div>

      {/* Right Side */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button
          onClick={onNewAnalysis}
          style={{
            padding: "10px 20px",
            background: "var(--primary)",
            color: "white",
            border: "none",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: "0 2px 8px rgba(79,70,229,0.3)",
          }}
          onMouseOver={(e) => {
            e.target.style.background = "var(--primary-dark)";
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "var(--primary)";
            e.target.style.transform = "translateY(0)";
          }}
        >
          New Analysis
        </button>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--primary), var(--accent))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(79,70,229,0.25)",
          }}
        >
          Y
        </div>
      </div>
    </nav>
  );
}
