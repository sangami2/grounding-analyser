"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import InputPanel from "@/components/InputPanel";
import ResultsPanel from "@/components/ResultsPanel";
import BatchInputPanel from "@/components/BatchInputPanel";
import BatchResultsPanel from "@/components/BatchResultsPanel";
import {
  AnalysisResult,
  AppMode,
  BatchAnalysisResponse,
  BatchDocumentResult,
  ImproveResult,
  ParsedDocument,
} from "@/lib/types";

export default function Home() {
  const [mode, setMode] = useState<AppMode>("single");

  // Input text — lifted so it persists across tab switches
  const [singleDocText, setSingleDocText] = useState("");
  const [batchDocText, setBatchDocText] = useState("");

  // Single mode state
  const [singleLoading, setSingleLoading] = useState(false);
  const [singleError, setSingleError] = useState<string | null>(null);
  const [singleResult, setSingleResult] = useState<AnalysisResult | null>(null);

  // Improve state
  const [improveLoading, setImproveLoading] = useState(false);
  const [improveError, setImproveError] = useState<string | null>(null);
  const [improveResult, setImproveResult] = useState<ImproveResult | null>(null);

  // Batch mode state
  const [batchLoading, setBatchLoading] = useState(false);
  const [batchError, setBatchError] = useState<string | null>(null);
  const [batchResults, setBatchResults] = useState<BatchDocumentResult[] | null>(null);
  const [batchProgress, setBatchProgress] = useState<{ current: number; total: number } | null>(null);

  function clearImproveState() {
    setImproveResult(null);
    setImproveError(null);
  }

  function switchMode(next: AppMode) {
    if (next === mode) return;
    setMode(next);
    setSingleResult(null);
    setSingleError(null);
    clearImproveState();
    setBatchResults(null);
    setBatchError(null);
    setBatchProgress(null);
  }

  const handleSingleAnalyze = useCallback(async (document: string) => {
    setSingleError(null);
    setSingleResult(null);
    setImproveResult(null);
    setImproveError(null);
    setSingleLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ document }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSingleError(data.error ?? `Request failed with status ${res.status}.`);
        return;
      }
      setSingleResult(data as AnalysisResult);
    } catch (err) {
      setSingleError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setSingleLoading(false);
    }
  }, []);

  const handleSingleAnalyzeAgain = useCallback(() => {
    setSingleResult(null);
    setSingleError(null);
    clearImproveState();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleImprove = useCallback(
    async (docText: string, result: AnalysisResult) => {
      setImproveLoading(true);
      setImproveError(null);
      setImproveResult(null);

      const dimension_summaries = [
        result.chunking_readiness.summary,
        result.ambiguity_detection.summary,
        result.internal_contradiction.summary,
        result.staleness_signals.summary,
        result.coverage_gaps.summary,
      ];

      try {
        const res = await fetch("/api/improve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            document: docText,
            recommendations: result.top_recommendations,
            dimension_summaries,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          setImproveError(
            data.error ?? `Improve request failed with status ${res.status}.`
          );
          return;
        }
        setImproveResult(data as ImproveResult);
      } catch (err) {
        setImproveError(
          err instanceof Error ? err.message : "An unexpected error occurred."
        );
      } finally {
        setImproveLoading(false);
      }
    },
    []
  );

  const handleBatchAnalyze = useCallback(
    async (
      documents: ParsedDocument[],
      _progressCallback: (n: number, total: number) => void
    ) => {
      setBatchError(null);
      setBatchResults(null);
      setBatchLoading(true);
      setBatchProgress({ current: 0, total: documents.length });

      try {
        const res = await fetch("/api/analyze-batch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ documents }),
        });
        const data = await res.json();
        if (!res.ok) {
          setBatchError(data.error ?? `Request failed with status ${res.status}.`);
          return;
        }
        const response = data as BatchAnalysisResponse;
        setBatchResults(response.results);
      } catch (err) {
        setBatchError(
          err instanceof Error ? err.message : "An unexpected error occurred."
        );
      } finally {
        setBatchLoading(false);
        setBatchProgress(null);
      }
    },
    []
  );

  const handleBatchRunAnother = useCallback(() => {
    setBatchResults(null);
    setBatchError(null);
    setBatchProgress(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="page-wrapper">
      <div className="content-container">
        <Header />

        <div className="mode-toggle">
          <button
            className={`mode-tab ${mode === "single" ? "mode-tab-active" : ""}`}
            onClick={() => switchMode("single")}
          >
            SINGLE DOCUMENT
          </button>
          <button
            className={`mode-tab ${mode === "batch" ? "mode-tab-active" : ""}`}
            onClick={() => switchMode("batch")}
          >
            BATCH (UP TO 10 DOCS)
          </button>
        </div>

        {mode === "single" && (
          <>
            <InputPanel
              value={singleDocText}
              onValueChange={setSingleDocText}
              onAnalyze={handleSingleAnalyze}
              isLoading={singleLoading}
              error={singleError}
            />
            {singleResult && (
              <ResultsPanel
                result={singleResult}
                onAnalyzeAgain={handleSingleAnalyzeAgain}
                onImprove={() => handleImprove(singleDocText, singleResult)}
                improveResult={improveResult}
                isImproving={improveLoading}
                improveError={improveError}
              />
            )}
          </>
        )}

        {mode === "batch" && (
          <>
            {!batchResults && (
              <BatchInputPanel
                value={batchDocText}
                onValueChange={setBatchDocText}
                onAnalyze={handleBatchAnalyze}
                isLoading={batchLoading}
                progress={batchProgress}
                error={batchError}
              />
            )}
            {batchResults && (
              <BatchResultsPanel
                results={batchResults}
                onRunAnother={handleBatchRunAnother}
              />
            )}
          </>
        )}

        <footer className="site-footer">
          <div className="rule" />
          <p className="footer-text">
            Built as a learning project. Uses Claude API for analysis.{" "}
            <a
              href="https://github.com/sangami2/grounding-analyser"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source on GitHub
            </a>
            {" "}&middot;{" "}
            <a
              href="https://linkedin.com/in/akashsangami"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Akash Sangami
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
