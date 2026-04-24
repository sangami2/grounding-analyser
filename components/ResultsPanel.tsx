"use client";

import { AnalysisResult, ImproveResult } from "@/lib/types";
import ScoreCard from "./ScoreCard";
import ImprovePanel from "./ImprovePanel";

interface ResultsPanelProps {
  result: AnalysisResult;
  onAnalyzeAgain: () => void;
  onImprove: () => void;
  improveResult: ImproveResult | null;
  isImproving: boolean;
  improveError: string | null;
}

const DIMENSIONS: { key: keyof AnalysisResult; label: string }[] = [
  { key: "chunking_readiness", label: "CHUNKING READINESS" },
  { key: "ambiguity_detection", label: "AMBIGUITY DETECTION" },
  { key: "internal_contradiction", label: "INTERNAL CONTRADICTION" },
  { key: "staleness_signals", label: "STALENESS SIGNALS" },
  { key: "coverage_gaps", label: "COVERAGE GAPS" },
];

function riskClass(risk: string): string {
  if (risk === "low") return "risk-low";
  if (risk === "medium") return "risk-medium";
  return "risk-high";
}

function riskLabel(risk: string): string {
  return `${risk.toUpperCase()} RETRIEVAL RISK`;
}

export default function ResultsPanel({
  result,
  onAnalyzeAgain,
  onImprove,
  improveResult,
  isImproving,
  improveError,
}: ResultsPanelProps) {
  return (
    <section className="results-section fade-in">
      <div className="overall-card">
        <div className="overall-top">
          <div className="overall-score-block">
            <span className="overall-number">{result.overall_score}</span>
            <span className="overall-denom">/10</span>
          </div>
          <span className={`risk-badge ${riskClass(result.retrieval_risk)}`}>
            {riskLabel(result.retrieval_risk)}
          </span>
        </div>
        <p className="overall-summary">{result.overall_summary}</p>
      </div>

      <div className="dimensions-grid">
        {DIMENSIONS.map(({ key, label }) => {
          const dim = result[key];
          if (typeof dim !== "object" || !dim || !("score" in dim)) return null;
          return (
            <ScoreCard
              key={key}
              label={label}
              dimension={dim as import("@/lib/types").DimensionResult}
            />
          );
        })}
      </div>

      {result.top_recommendations.length > 0 && (
        <div className="recommendations-section">
          <p className="section-label">RECOMMENDATIONS</p>
          <ol className="recommendations-list">
            {result.top_recommendations.map((rec, i) => (
              <li key={i} className="recommendation-item">
                <span className="rec-number">{i + 1}</span>
                <p className="rec-text">{rec}</p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {!improveResult && (
        <div className="generate-btn-row">
          <button
            className={`btn-secondary ${isImproving ? "btn-loading" : ""}`}
            onClick={onImprove}
            disabled={isImproving}
          >
            {isImproving ? "GENERATING..." : "GENERATE IMPROVED VERSION"}
          </button>
        </div>
      )}

      {improveError && (
        <div className="error-banner" role="alert">
          {improveError}
        </div>
      )}

      {improveResult && <ImprovePanel result={improveResult} />}

      <div className="analyze-again-row">
        <button className="btn-secondary" onClick={onAnalyzeAgain}>
          ANALYZE AGAIN
        </button>
      </div>
    </section>
  );
}
