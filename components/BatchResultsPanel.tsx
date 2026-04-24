"use client";

import { useState } from "react";
import { BatchDocumentResult } from "@/lib/types";
import ScoreCard from "./ScoreCard";

interface BatchResultsPanelProps {
  results: BatchDocumentResult[];
  onRunAnother: () => void;
}

const DIMENSIONS = [
  { key: "chunking_readiness" as const, label: "CHUNKING READINESS" },
  { key: "ambiguity_detection" as const, label: "AMBIGUITY DETECTION" },
  { key: "internal_contradiction" as const, label: "INTERNAL CONTRADICTION" },
  { key: "staleness_signals" as const, label: "STALENESS SIGNALS" },
  { key: "coverage_gaps" as const, label: "COVERAGE GAPS" },
];

function riskPillClass(risk: string): string {
  if (risk === "low") return "batch-risk-low";
  if (risk === "medium") return "batch-risk-medium";
  return "batch-risk-high";
}

export default function BatchResultsPanel({ results, onRunAnother }: BatchResultsPanelProps) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const successful = results.filter((r) => r.analysis);
  const sorted = [...results].sort((a, b) => {
    const sa = a.analysis?.overall_score ?? 11;
    const sb = b.analysis?.overall_score ?? 11;
    return sa - sb;
  });

  const avgScore =
    successful.length > 0
      ? (
          successful.reduce((sum, r) => sum + (r.analysis?.overall_score ?? 0), 0) /
          successful.length
        ).toFixed(1)
      : "--";

  const countByRisk = (risk: string) =>
    successful.filter((r) => r.analysis?.retrieval_risk === risk).length;

  function toggle(index: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <section className="results-section fade-in">
      <div className="batch-header-row">
        <button className="batch-back-link" onClick={onRunAnother}>
          &larr; RUN ANOTHER BATCH
        </button>
      </div>

      <div className="batch-title-block">
        <p className="section-label">
          BATCH RESULTS &middot; {results.length} DOCUMENT{results.length !== 1 ? "S" : ""} ANALYZED
        </p>
        <p className="batch-stats">
          Average score: <span className="mono-stat">{avgScore}/10</span>
          &ensp;&middot;&ensp;
          <span className="stat-high">{countByRisk("high")} high risk</span>
          &ensp;&middot;&ensp;
          <span className="stat-medium">{countByRisk("medium")} medium risk</span>
          &ensp;&middot;&ensp;
          <span className="stat-low">{countByRisk("low")} low risk</span>
        </p>
      </div>

      <div className="batch-list">
        {sorted.map((result, rank) => {
          const isExpanded = expanded.has(rank);
          const { analysis, error, name } = result;

          return (
            <div key={rank} className={`batch-row ${isExpanded ? "batch-row-expanded" : ""}`}>
              <div className="batch-row-summary">
                <span className="batch-rank">{rank + 1}</span>
                <div className="batch-row-main">
                  <span className="batch-doc-name">{name}</span>
                  {analysis && (
                    <span className="batch-one-line">{analysis.overall_summary.split(".")[0]}.</span>
                  )}
                  {error && (
                    <span className="batch-error-inline">Analysis failed: {error}</span>
                  )}
                </div>
                <div className="batch-row-meta">
                  {analysis && (
                    <>
                      <span className="batch-score-num">{analysis.overall_score}<span className="batch-score-denom">/10</span></span>
                      <span className={`batch-risk-pill ${riskPillClass(analysis.retrieval_risk)}`}>
                        {analysis.retrieval_risk.toUpperCase()}
                      </span>
                    </>
                  )}
                  {!error && analysis && (
                    <button
                      className="batch-view-link"
                      onClick={() => toggle(rank)}
                    >
                      {isExpanded ? "HIDE DETAILS" : "VIEW DETAILS"}
                    </button>
                  )}
                </div>
              </div>

              {isExpanded && analysis && (
                <div className="batch-drill-down fade-in">
                  <div className="overall-card batch-overall-card">
                    <div className="overall-top">
                      <div className="overall-score-block">
                        <span className="overall-number">{analysis.overall_score}</span>
                        <span className="overall-denom">/10</span>
                      </div>
                      <span className={`risk-badge ${analysis.retrieval_risk === "low" ? "risk-low" : analysis.retrieval_risk === "medium" ? "risk-medium" : "risk-high"}`}>
                        {analysis.retrieval_risk.toUpperCase()} RETRIEVAL RISK
                      </span>
                    </div>
                    <p className="overall-summary">{analysis.overall_summary}</p>
                  </div>

                  <div className="dimensions-grid">
                    {DIMENSIONS.map(({ key, label }) => {
                      const dim = analysis[key];
                      if (!dim || typeof dim !== "object") return null;
                      return <ScoreCard key={key} label={label} dimension={dim} />;
                    })}
                  </div>

                  {analysis.top_recommendations.length > 0 && (
                    <div className="recommendations-section">
                      <p className="section-label">RECOMMENDATIONS</p>
                      <ol className="recommendations-list">
                        {analysis.top_recommendations.map((rec, i) => (
                          <li key={i} className="recommendation-item">
                            <span className="rec-number">{i + 1}</span>
                            <p className="rec-text">{rec}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
