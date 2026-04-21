"use client";

import { useState, useEffect } from "react";

export default function HistoryView({ onSelectHistory }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("resume_history");
      if (stored) {
        setHistory(JSON.parse(stored).reverse()); // newest first
      }
    } catch (err) {
      console.error("Failed to load history:", err);
    }
  }, []);

  const formatDate = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(new Date(timestamp));
  };

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear your analysis history?")) {
      localStorage.removeItem("resume_history");
      setHistory([]);
    }
  };

  if (history.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }} className="animate-fade-in-up">
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "var(--primary-50)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            fontSize: "24px"
          }}
        >
          📂
        </div>
        <h2 style={{ fontSize: "24px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px" }}>
          No History Yet
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "15px", maxWidth: "400px", margin: "0 auto" }}>
          Your past resume analyses will appear here. Head to the Dashboard to run your first analysis!
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up" style={{ padding: "0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", padding: "0 10px" }}>
        <div>
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "var(--text-primary)", marginBottom: "8px" }}>
            Analysis History
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
            Review your previously analyzed resumes and insights.
          </p>
        </div>
        
        <button 
          onClick={clearHistory}
          style={{
            padding: "8px 16px",
            background: "transparent",
            color: "#EF4444",
            border: "1px dashed #EF4444",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s"
          }}
          onMouseOver={(e) => {
            e.target.style.background = "rgba(239, 68, 68, 0.1)";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "transparent";
          }}
        >
          Clear History
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {history.map((item, index) => (
          <div 
            key={item.id || index}
            className="card"
            style={{
              padding: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "24px",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "var(--shadow-lg)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>
                  {item.filename || "Unknown File"}
                </h3>
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  {formatDate(item.timestamp)}
                </span>
                <span 
                  style={{ 
                    padding: "4px 8px", 
                    borderRadius: "12px", 
                    background: item.result?.score >= 80 ? "#D1FAE5" : item.result?.score >= 60 ? "#FEF3C7" : "#FEE2E2",
                    color: item.result?.score >= 80 ? "#065F46" : item.result?.score >= 60 ? "#92400E" : "#991B1B",
                    fontSize: "11px",
                    fontWeight: 700
                  }}
                >
                  Score: {item.result?.score || "N/A"}
                </span>
              </div>
              
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {item.roles?.map(role => (
                  <span key={role} style={{ fontSize: "11px", color: "var(--primary)", background: "var(--primary-50)", padding: "2px 8px", borderRadius: "4px", fontWeight: 500 }}>
                    {role}
                  </span>
                ))}
                {item.companies?.map(company => (
                  <span key={company} style={{ fontSize: "11px", color: "var(--text-secondary)", background: "#F3F4F6", padding: "2px 8px", borderRadius: "4px", fontWeight: 500 }}>
                    {company}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectHistory(item)}
              className="btn-primary"
              style={{
                padding: "10px 20px",
                fontSize: "13px",
                borderRadius: "8px"
              }}
            >
              View Results
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
