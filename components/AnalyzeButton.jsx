"use client";

export default function AnalyzeButton({ onClick, disabled, loading }) {
  return (
    <div style={{ textAlign: "center" }}>
      <button
        className="btn-primary"
        onClick={onClick}
        disabled={disabled || loading}
        id="start-analysis-btn"
        style={{
          minWidth: "220px",
          fontSize: "16px",
          padding: "16px 44px",
        }}
      >
        {loading ? (
          <>
            <div className="spinner" />
            Analyzing...
          </>
        ) : (
          <>
            Start Analysis
            <span style={{ fontSize: "18px" }}>✨</span>
          </>
        )}
      </button>

      {/* Privacy Notice */}
      <p
        style={{
          fontSize: "12px",
          color: "var(--text-muted)",
          marginTop: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Your data is processed securely and never shared with third parties.
      </p>
    </div>
  );
}
