"use client";

import { DimensionResult } from "@/lib/types";

interface ScoreCardProps {
  label: string;
  dimension: DimensionResult;
}

function scoreColor(score: number): string {
  if (score >= 8) return "var(--forest)";
  if (score >= 5) return "var(--amber)";
  return "var(--vermillion)";
}

function scoreBarWidth(score: number): string {
  return `${(score / 10) * 100}%`;
}

export default function ScoreCard({ label, dimension }: ScoreCardProps) {
  const { score, summary, evidence } = dimension;
  const color = scoreColor(score);

  return (
    <div className="score-card">
      <div className="score-card-header">
        <span className="dimension-label">{label}</span>
        <span className="score-number" style={{ color }}>
          {score}<span className="score-denom">/10</span>
        </span>
      </div>

      <div className="score-bar-track">
        <div
          className="score-bar-fill"
          style={{ width: scoreBarWidth(score), backgroundColor: color }}
        />
      </div>

      <p className="dimension-summary">{summary}</p>

      {evidence.length > 0 && (
        <div className="evidence-list">
          {evidence.map((item, i) => (
            <div key={i} className="evidence-item">
              <blockquote className="evidence-quote">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <p className="evidence-note">{item.note}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
