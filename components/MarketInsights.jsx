"use client";

import { useState, useRef, useEffect } from "react";

export default function MarketInsights() {
  const [role, setRole] = useState("Software Engineer");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchInsights = async (targetRole) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/market", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: targetRole }),
      });
      const json = await res.json();
      if (json.success) {
        setData(json.result);
      } else {
        setError(json.error || "Failed to fetch market insights.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial insights on mount
  useEffect(() => {
    fetchInsights(role);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setRole(inputValue.trim());
      fetchInsights(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="animate-fade-in-up" style={{ padding: "0 10px" }}>
      {/* Header & Search */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "36px", fontWeight: 800, color: "var(--text-primary)", marginBottom: "16px", letterSpacing: "-0.5px" }}>
          Live <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", background: "linear-gradient(135deg, var(--primary), var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Market Insights</span>
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "16px", maxWidth: "500px", margin: "0 auto 24px" }}>
          Stay ahead of the curve. Enter any career role to pull real-time hiring velocity, salary bands, and trending skills.
        </p>

        <form onSubmit={handleSearch} style={{ display: "flex", gap: "12px", maxWidth: "480px", margin: "0 auto" }}>
          <input
            type="text"
            placeholder="e.g. Data Scientist, Product Manager..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              flex: 1,
              padding: "14px 20px",
              borderRadius: "999px",
              border: "1px solid var(--border)",
              fontSize: "15px",
              outline: "none",
              boxShadow: "var(--shadow-sm)",
              transition: "border-color 0.2s"
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
            onBlur={(e) => e.target.style.borderColor = "var(--border)"}
          />
          <button
            type="submit"
            disabled={loading || !inputValue.trim()}
            className="btn-primary"
            style={{ padding: "0 28px", minWidth: "auto" }}
          >
            {loading ? <div className="spinner" style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white" }} /> : "Analyze"}
          </button>
        </form>
      </div>

      {/* Error State */}
      {error && (
        <div className="animate-scale-in" style={{ padding: "16px", background: "rgba(239,68,68,0.08)", color: "#DC2626", borderRadius: "12px", textAlign: "center", marginBottom: "32px", fontSize: "14px" }}>
          ⚠️ {error}
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && !data && (
        <div className="animate-pulse" style={{ display: "flex", flexDirection: "column", gap: "24px", opacity: 0.7 }}>
          <div style={{ height: "40px", width: "200px", background: "var(--border)", borderRadius: "8px", margin: "0 auto" }} />
          <div style={{ display: "flex", gap: "24px" }}>
            <div style={{ flex: 1, height: "120px", background: "var(--border)", borderRadius: "16px" }} />
            <div style={{ flex: 1, height: "120px", background: "var(--border)", borderRadius: "16px" }} />
          </div>
          <div style={{ height: "200px", background: "var(--border)", borderRadius: "16px" }} />
        </div>
      )}

      {/* Dashboard Data */}
      {!loading && data && (
        <div className="animate-fade-in-up delay-100">
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h3 style={{ fontSize: "24px", fontWeight: 700, color: "var(--text-primary)", display: "inline-block", borderBottom: "3px solid var(--primary)", paddingBottom: "4px" }}>
              {data.role || role}
            </h3>
          </div>

          {/* Top Metrics Row */}
          <div style={{ display: "flex", gap: "24px", marginBottom: "24px", flexWrap: "wrap" }}>
            {/* Hiring Velocity Card */}
            <div className="card" style={{ flex: "1 1 250px", padding: "24px", background: "linear-gradient(145deg, #FFFFFF, #F8FAFC)", borderLeft: "4px solid var(--primary)" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>📈</span> Hiring Velocity
              </div>
              <div style={{ fontSize: "28px", fontWeight: 800, color: "var(--primary-dark)" }}>
                {data.hiringVelocity}
              </div>
            </div>

            {/* Salary Range Card */}
            <div className="card" style={{ flex: "1 1 250px", padding: "24px", background: "linear-gradient(145deg, #FFFFFF, #F8FAFC)", borderLeft: "4px solid #10B981" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>💰</span> Est. Market Rate
              </div>
              <div style={{ fontSize: "28px", fontWeight: 800, color: "#065F46" }}>
                {data.salaryRange}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {/* Summary */}
            <div className="card" style={{ flex: "2 1 350px", padding: "32px" }}>
              <h4 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "16px" }}>Market Overview</h4>
              <p style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--text-secondary)" }}>
                {data.summary}
              </p>
            </div>

            {/* Trending Skills */}
            <div className="card" style={{ flex: "1 1 250px", padding: "32px" }}>
              <h4 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "20px" }}>Trending Skills</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {data.trendingSkills?.map((skill, i) => (
                  <span 
                    key={i} 
                    className="animate-scale-in" 
                    onClick={() => {
                      setRole(skill);
                      setInputValue(skill);
                      fetchInsights(skill);
                    }}
                    style={{ 
                      animationDelay: `${i * 0.05}s`, 
                      padding: "6px 14px", 
                      background: "var(--primary-50)", 
                      color: "var(--primary)", 
                      borderRadius: "8px", 
                      fontSize: "13px", 
                      fontWeight: 600, 
                      border: "1px solid var(--primary-100)",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "var(--primary)";
                      e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "var(--primary-50)";
                      e.target.style.color = "var(--primary)";
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
