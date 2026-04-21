"use client";

import { useState } from "react";

function ScoreGauge({ score }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s) => {
    if (s >= 80) return "#10B981";
    if (s >= 60) return "#F59E0B";
    if (s >= 40) return "#F97316";
    return "#EF4444";
  };

  const getLabel = (s) => {
    if (s >= 80) return "Excellent";
    if (s >= 60) return "Good";
    if (s >= 40) return "Fair";
    return "Needs Work";
  };

  return (
    <div className="score-ring" style={{ margin: "0 auto" }}>
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#F1F5F9"
          strokeWidth="10"
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={getColor(score)}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
        />
      </svg>
      <div style={{ textAlign: "center", zIndex: 1 }}>
        <div
          style={{
            fontSize: "32px",
            fontWeight: 800,
            color: getColor(score),
            lineHeight: 1,
          }}
        >
          {score}
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "var(--text-muted)",
            fontWeight: 500,
            marginTop: "2px",
          }}
        >
          {getLabel(score)}
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, children, delay = 0 }) {
  return (
    <div
      className="result-section"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "16px",
        }}
      >
        <span style={{ fontSize: "20px" }}>{icon}</span>
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function BulletList({ items, color = "var(--primary)" }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            padding: "8px 0",
            borderBottom:
              i < items.length - 1 ? "1px solid var(--border)" : "none",
            fontSize: "14px",
            lineHeight: "1.6",
            color: "var(--text-secondary)",
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: color,
              marginTop: "8px",
              flexShrink: 0,
            }}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ResultDisplay({ result }) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!result) return null;

  const { score, verdict, summary, strengths, weaknesses, improvements, companyTips } =
    result;

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "strengths", label: "Strengths" },
    { id: "improvements", label: "Improvements" },
    { id: "company", label: "Company Tips" },
  ];

  return (
    <div
      className="animate-fade-in-up"
      style={{ marginTop: "48px" }}
      id="analysis-results"
    >
      {/* Results Header */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: 800,
            color: "var(--text-primary)",
            marginBottom: "8px",
          }}
        >
          Analysis Results
        </h2>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
          Here&apos;s how your resume stacks up against your targets
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "4px",
          marginBottom: "32px",
          background: "#F1F5F9",
          borderRadius: "12px",
          padding: "4px",
          maxWidth: "500px",
          margin: "0 auto 32px",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: "10px 16px",
              border: "none",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: activeTab === tab.id ? 600 : 400,
              color:
                activeTab === tab.id
                  ? "var(--primary)"
                  : "var(--text-secondary)",
              background: activeTab === tab.id ? "white" : "transparent",
              boxShadow:
                activeTab === tab.id ? "var(--shadow-sm)" : "none",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >
          {/* Score */}
          <Section title="Resume Score" icon="📊" delay={0}>
            <ScoreGauge score={score} />
            <div
              style={{
                textAlign: "center",
                marginTop: "16px",
                padding: "12px",
                background:
                  verdict === "Appropriate"
                    ? "rgba(16,185,129,0.08)"
                    : "rgba(249,115,22,0.08)",
                borderRadius: "10px",
                border: `1px solid ${
                  verdict === "Appropriate"
                    ? "rgba(16,185,129,0.2)"
                    : "rgba(249,115,22,0.2)"
                }`,
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color:
                    verdict === "Appropriate" ? "#10B981" : "#F97316",
                }}
              >
                {verdict === "Appropriate"
                  ? "✅ Strong Match"
                  : "⚠️ Needs Improvement"}
              </span>
            </div>
          </Section>

          {/* Summary */}
          <Section title="Candidate Summary" icon="👤" delay={100}>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.7",
                color: "var(--text-secondary)",
              }}
            >
              {summary}
            </p>
          </Section>
        </div>
      )}

      {activeTab === "strengths" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
        >
          <Section title="Key Strengths" icon="💪" delay={0}>
            <BulletList items={strengths} color="#10B981" />
          </Section>
          <Section title="Areas for Improvement" icon="🎯" delay={100}>
            <BulletList items={weaknesses} color="#F59E0B" />
          </Section>
        </div>
      )}

      {activeTab === "improvements" && (
        <Section title="Actionable Improvements" icon="🚀" delay={0}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            {improvements.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "16px",
                  background: "var(--primary-50)",
                  borderRadius: "12px",
                  border: "1px solid var(--primary-100)",
                  animation: `fadeInUp 0.4s ease-out ${i * 100}ms forwards`,
                  opacity: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: "var(--primary)",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    Step {i + 1}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    lineHeight: "1.6",
                    color: "var(--text-secondary)",
                    margin: 0,
                  }}
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {activeTab === "company" && (
        <Section title="Company-Specific Tips" icon="🏢" delay={0}>
          {companyTips && companyTips.length > 0 ? (
            <BulletList items={companyTips} color="var(--accent)" />
          ) : (
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-muted)",
                textAlign: "center",
                padding: "24px",
              }}
            >
              No company-specific tips available. Select target companies
              for personalized recommendations.
            </p>
          )}
        </Section>
      )}
    </div>
  );
}
