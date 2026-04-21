"use client";

import { useState, useEffect } from "react";

export default function InsightCard({ companies, roles }) {
  const [insight, setInsight] = useState("");
  const [visible, setVisible] = useState(false);

  const insights = {
    Google: "Google values **scalable system design** and **data-driven decisions**. Quantify your impact with metrics like QPS, latency improvements, or user growth.",
    OpenAI: "OpenAI looks for **research-minded engineers** with strong ML foundations. Highlight any publications, open-source contributions, or novel problem-solving.",
    Stripe: "Companies like Stripe value **Impact Metrics**. Ensure your resume quantifies achievements with exact percentages.",
    Microsoft: "Microsoft prioritizes **cross-team collaboration** and **growth mindset**. Showcase projects where you drove alignment across organizations.",
    Apple: "Apple values **attention to craft** and **user experience obsession**. Highlight projects where you shipped polished, user-facing products.",
    Amazon: "Amazon hires by **Leadership Principles**. Frame every bullet point around customer obsession, ownership, and bias for action.",
    Meta: "Meta looks for **move fast** engineers who can ship at scale. Highlight rapid iteration cycles and A/B testing experience.",
    Netflix: "Netflix values **senior-level judgment** and radical candor. Emphasize autonomous decision-making and high-stakes project ownership.",
    Tesla: "Tesla seeks **first-principles thinkers** who thrive in ambiguity. Show how you've solved hard engineering problems creatively.",
    default: "Tailor your resume to each target company. Research their values and culture to align your experience with what they prioritize most.",
  };

  const roleInsights = {
    "Software Engineer": "Focus on **system design**, algorithms, and code quality. Include specific tech stacks and scale metrics.",
    "Product Manager": "Highlight **user empathy**, roadmap ownership, and cross-functional leadership. Use data to show product impact.",
    "Data Scientist": "Showcase **statistical rigor**, ML models deployed to production, and business impact of your analyses.",
    "Frontend Developer": "Emphasize **performance optimization**, accessibility standards, and pixel-perfect UI implementations.",
    default: "Align your experience with the core competencies of your target role. Use industry-standard terminology.",
  };

  useEffect(() => {
    if (companies.length > 0) {
      const company = companies[companies.length - 1];
      const text = insights[company] || insights.default;
      setInsight(text);
      setVisible(true);
    } else if (roles.length > 0) {
      const role = roles[roles.length - 1];
      const text = roleInsights[role] || roleInsights.default;
      setInsight(text);
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [companies, roles]);

  if (!visible || !insight) return null;

  // Parse **bold** markers
  const renderText = (text) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} style={{ color: "var(--text-primary)", fontWeight: 600 }}>
          {part}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div className="insight-card animate-slide-in-right">
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FEF3C7, #FDE68A)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
          }}
        >
          💡
        </div>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          AI Insight
        </span>
      </div>

      {/* Body */}
      <p
        style={{
          fontSize: "13px",
          lineHeight: "1.6",
          color: "var(--text-secondary)",
        }}
      >
        &ldquo;{renderText(insight)}&rdquo;
      </p>
    </div>
  );
}
