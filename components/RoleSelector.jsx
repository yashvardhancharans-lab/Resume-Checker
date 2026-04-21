"use client";

import { useState, useRef, useEffect } from "react";

const SUGGESTED_ROLES = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "UI/UX Designer",
  "Machine Learning Engineer",
  "Cloud Architect",
  "Mobile Developer",
  "QA Engineer",
  "Technical Lead",
  "Engineering Manager",
  "Business Analyst",
  "Solutions Architect",
  "Cybersecurity Analyst",
  "Data Engineer",
  "AI Engineer",
  "Project Manager",
];

export default function RoleSelector({ roles, setRoles }) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const filtered = SUGGESTED_ROLES.filter(
    (r) =>
      r.toLowerCase().includes(query.toLowerCase()) && !roles.includes(r)
  );

  const addRole = (role) => {
    if (!roles.includes(role) && roles.length < 5) {
      setRoles([...roles, role]);
      setQuery("");
      setShowSuggestions(false);
    }
  };

  const removeRole = (role) => {
    setRoles(roles.filter((r) => r !== role));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      addRole(query.trim());
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showAddCustom =
    query.trim().length > 0 &&
    !roles.some((r) => r.toLowerCase() === query.trim().toLowerCase()) &&
    !filtered.some((r) => r.toLowerCase() === query.trim().toLowerCase());

  return (
    <div className="card" style={{ padding: "24px", flex: 1 }} ref={containerRef}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            background: "var(--primary-50)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" />
            <line x1="12" y1="2" x2="12" y2="5" />
            <line x1="12" y1="19" x2="12" y2="22" />
            <line x1="2" y1="12" x2="5" y2="12" />
            <line x1="19" y1="12" x2="22" y2="12" />
          </svg>
        </div>
        <h3
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          Target Roles
        </h3>
      </div>

      {/* Search Input */}
      <div style={{ position: "relative", marginBottom: "14px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 14px",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            background: "#FAFAFE",
            transition: "all 0.2s",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search roles..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "13px",
              color: "var(--text-primary)",
            }}
            id="role-search"
          />
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && (filtered.length > 0 || showAddCustom) && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              marginTop: "4px",
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              boxShadow: "var(--shadow-lg)",
              maxHeight: "180px",
              overflowY: "auto",
              zIndex: 50,
            }}
            className="animate-scale-in"
          >
            {filtered.slice(0, 5).map((role) => (
              <button
                key={role}
                onClick={() => addRole(role)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px 14px",
                  border: "none",
                  background: "transparent",
                  textAlign: "left",
                  fontSize: "13px",
                  color: "var(--text-primary)",
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.background = "var(--primary-50)")
                }
                onMouseOut={(e) =>
                  (e.target.style.background = "transparent")
                }
              >
                {role}
              </button>
            ))}
            {showAddCustom && (
              <button
                onClick={() => addRole(query.trim())}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px 14px",
                  border: "none",
                  borderTop: filtered.length > 0 ? "1px solid var(--border)" : "none",
                  background: "transparent",
                  textAlign: "left",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--primary)",
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.background = "var(--primary-50)")
                }
                onMouseOut={(e) =>
                  (e.target.style.background = "transparent")
                }
              >
                + Add "{query.trim()}"
              </button>
            )}
          </div>
        )}
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {roles.map((role) => (
          <span key={role} className="tag-chip">
            {role}
            <button onClick={() => removeRole(role)}>✕</button>
          </span>
        ))}
        {roles.length < 5 && (
          <button
            onClick={() => {
              inputRef.current?.focus();
              setShowSuggestions(true);
            }}
            style={{
              padding: "6px 14px",
              border: "1px dashed var(--border)",
              borderRadius: "999px",
              background: "transparent",
              fontSize: "12px",
              color: "var(--text-muted)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.target.style.borderColor = "var(--primary)";
              e.target.style.color = "var(--primary)";
            }}
            onMouseOut={(e) => {
              e.target.style.borderColor = "var(--border)";
              e.target.style.color = "var(--text-muted)";
            }}
          >
            + Add More
          </button>
        )}
      </div>
    </div>
  );
}
