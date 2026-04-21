"use client";

import { useState, useRef, useCallback } from "react";

export default function UploadBox({ onFileSelect, file }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        processFile(droppedFile);
      }
    },
    [onFileSelect]
  );

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = async (selectedFile) => {
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(selectedFile.type)) {
      alert("Please upload a PDF or DOCX file.");
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("File size must be under 10MB.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      clearInterval(interval);
      setUploadProgress(100);

      if (data.success) {
        onFileSelect({
          name: selectedFile.name,
          size: selectedFile.size,
          type: selectedFile.type,
          text: data.text,
        });
      } else {
        alert(data.error || "Failed to parse file.");
      }
    } catch (err) {
      clearInterval(interval);
      alert("Upload failed. Please try again.");
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };

  const removeFile = (e) => {
    e.stopPropagation();
    onFileSelect(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div
      className={`upload-zone ${isDragging ? "drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !file && fileInputRef.current?.click()}
      style={{
        padding: file ? "24px 32px" : "48px 32px",
        cursor: file ? "default" : "pointer",
        textAlign: "center",
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileInput}
        style={{ display: "none" }}
        id="resume-upload"
      />

      {!file ? (
        <div className="animate-fade-in">
          {/* Upload Icon */}
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background:
                "linear-gradient(135deg, var(--primary-50), var(--primary-100))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>

          <p
            style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: "6px",
            }}
          >
            Drag and drop your resume
          </p>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
            PDF, DOCX up to 10MB •{" "}
            <span
              style={{
                color: "var(--primary)",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Browse files
            </span>
          </p>
        </div>
      ) : (
        <div
          className="animate-scale-in"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          {/* File Icon */}
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: file.type.includes("pdf")
                ? "linear-gradient(135deg, #FEF2F2, #FECACA)"
                : "linear-gradient(135deg, #EFF6FF, #BFDBFE)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={file.type.includes("pdf") ? "#DC2626" : "#2563EB"}
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>

          <div style={{ textAlign: "left" }}>
            <p
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              {file.name}
            </p>
            <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
              {formatSize(file.size)} • Ready for analysis
            </p>
          </div>

          <button
            onClick={removeFile}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "1px solid var(--border)",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s",
              flexShrink: 0,
              marginLeft: "8px",
              fontSize: "16px",
              color: "var(--text-secondary)",
            }}
            onMouseOver={(e) => {
              e.target.style.borderColor = "#DC2626";
              e.target.style.color = "#DC2626";
            }}
            onMouseOut={(e) => {
              e.target.style.borderColor = "var(--border)";
              e.target.style.color = "var(--text-secondary)";
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div style={{ marginTop: "16px", maxWidth: "300px", margin: "16px auto 0" }}>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
              marginTop: "6px",
            }}
          >
            Parsing resume... {uploadProgress}%
          </p>
        </div>
      )}
    </div>
  );
}
