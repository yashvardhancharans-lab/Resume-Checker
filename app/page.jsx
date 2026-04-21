"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import UploadBox from "@/components/UploadBox";
import RoleSelector from "@/components/RoleSelector";
import CompanySelector from "@/components/CompanySelector";
import AnalyzeButton from "@/components/AnalyzeButton";
import ResultDisplay from "@/components/ResultDisplay";
import InsightCard from "@/components/InsightCard";
import HistoryView from "@/components/HistoryView";
import MarketInsights from "@/components/MarketInsights";

export default function Home() {
  const [file, setFile] = useState(null);
  const [roles, setRoles] = useState(["Software Engineer", "Product Manager"]);
  const [companies, setCompanies] = useState(["Google", "OpenAI", "Stripe"]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [hoveredCompany, setHoveredCompany] = useState(null);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const canAnalyze = file && file.text && (roles.length > 0 || companies.length > 0);

  const handleAnalyze = async () => {
    if (!canAnalyze) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: file.text,
          roles,
          companies,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setResult(data.result);
        
        // Save to History
        try {
          const historyItem = {
            id: Date.now().toString(),
            timestamp: Date.now(),
            filename: file.name,
            roles,
            companies,
            result: data.result,
          };
          const stored = localStorage.getItem("resume_history");
          const historyList = stored ? JSON.parse(stored) : [];
          historyList.push(historyItem);
          localStorage.setItem("resume_history", JSON.stringify(historyList));
        } catch (e) {
          console.error("Failed to save history", e);
        }

        // Scroll to results
        setTimeout(() => {
          document
            .getElementById("analysis-results")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 200);
      } else {
        setError(data.error || "Analysis failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setFile(null);
    setRoles(["Software Engineer", "Product Manager"]);
    setCompanies(["Google", "OpenAI", "Stripe"]);
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)" }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onNewAnalysis={resetState} />

      {/* Main Content */}
      <main
        style={{
          maxWidth: "880px",
          margin: "0 auto",
          padding: "48px 24px 80px",
        }}
      >
        {activeTab === "History" ? (
          <HistoryView 
            onSelectHistory={(historyItem) => {
              setResult(historyItem.result);
              setFile({ name: historyItem.filename, type: "application/pdf", size: 0, text: "" });
              setRoles(historyItem.roles || []);
              setCompanies(historyItem.companies || []);
              setActiveTab("Dashboard");
              setTimeout(() => {
                document.getElementById("analysis-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 100);
            }} 
          />
        ) : activeTab === "Market Insights" ? (
          <MarketInsights />
        ) : activeTab === "Dashboard" ? (
          <>
            {/* Hero Section */}
            <div
          className="animate-fade-in-up"
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <h1
            style={{
              fontSize: "48px",
              fontWeight: 800,
              color: "var(--text-primary)",
              lineHeight: 1.15,
              marginBottom: "16px",
              letterSpacing: "-1px",
            }}
          >
            Optimize Your{" "}
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                background: "linear-gradient(135deg, var(--primary), var(--accent))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Trajectory
            </span>
            .
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "var(--text-secondary)",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Upload your resume and define your target. Our AI architect will
            align your professional story with market-leading standards.
          </p>
        </div>

        {/* Upload Section */}
        <div
          className="animate-fade-in-up delay-100"
          style={{ marginBottom: "32px" }}
        >
          <UploadBox onFileSelect={setFile} file={file} />
        </div>

        {/* Selectors + Insight Row */}
        <div
          className="animate-fade-in-up delay-200"
          style={{
            display: "flex",
            gap: "24px",
            marginBottom: "40px",
            position: "relative",
            zIndex: 20,
          }}
        >
          <RoleSelector roles={roles} setRoles={setRoles} />
          
          {/* Company Selector Wrapper for Hover */}
          <div
            style={{ flex: 1, position: "relative" }}
          >
            <CompanySelector companies={companies} setCompanies={setCompanies} onHoverCompany={setHoveredCompany} />

            {/* Floating Insight Card */}
            <div
              style={{
                position: "absolute",
                right: "-20px",
                top: "50%",
                transform: "translateX(0%) translateY(-20%)",
                zIndex: 10,
                opacity: hoveredCompany ? 1 : 0,
                pointerEvents: hoveredCompany ? "auto" : "none",
                transition: "opacity 0.2s ease, transform 0.2s ease",
              }}
            >
              <InsightCard companies={hoveredCompany ? [hoveredCompany] : []} roles={[]} />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="animate-scale-in"
            style={{
              padding: "14px 20px",
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "12px",
              color: "#DC2626",
              fontSize: "14px",
              textAlign: "center",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <span>⚠️</span>
            {error}
          </div>
        )}

        {/* Analyze Button */}
        <div
          className="animate-fade-in-up delay-300"
          style={{ marginBottom: "16px" }}
        >
          <AnalyzeButton
            onClick={handleAnalyze}
            disabled={!canAnalyze}
            loading={loading}
          />
        </div>

        {/* Results */}
        <ResultDisplay result={result} />
          </>
        ) : null}
      </main>
    </div>
  );
}
