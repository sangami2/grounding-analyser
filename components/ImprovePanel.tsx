"use client";

import { useState } from "react";
import { ImproveResult } from "@/lib/types";

interface ImprovePanelProps {
  result: ImproveResult;
}

export default function ImprovePanel({ result }: ImprovePanelProps) {
  const [copyLabel, setCopyLabel] = useState("COPY TO CLIPBOARD");

  const charCount = result.improved_document.length;

  function handleCopy() {
    navigator.clipboard.writeText(result.improved_document).then(() => {
      setCopyLabel("COPIED");
      setTimeout(() => setCopyLabel("COPY TO CLIPBOARD"), 1500);
    });
  }

  return (
    <div className="improve-section fade-in">
      <div className="improve-rule" />

      {/* IMPROVED DOCUMENT */}
      <div className="improve-block">
        <div className="improve-doc-header">
          <p className="section-label" style={{ marginBottom: 0 }}>IMPROVED DOCUMENT</p>
          <span className="char-count">{charCount.toLocaleString()} chars</span>
        </div>
        <textarea
          className="improved-doc-box"
          readOnly
          value={result.improved_document}
        />
        <div className="copy-btn-row">
          <span className="copy-helper">
            Review before using. Claude may not have full context for every change.
          </span>
          <button className="btn-ghost copy-btn" onClick={handleCopy}>
            {copyLabel}
          </button>
        </div>
      </div>

      {/* WHAT CHANGED */}
      <div className="improve-block">
        <p className="section-label">WHAT CHANGED</p>
        <ul className="change-list">
          {result.changes.map((change, i) => (
            <li key={i} className="change-item">
              <span className="change-bullet" aria-hidden="true">&middot;</span>
              <span className="change-text">{change}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
