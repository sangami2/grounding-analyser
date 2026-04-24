"use client";

import { useCallback, KeyboardEvent } from "react";
import { parseBatchInput, estimateCost } from "@/lib/batchParser";
import { batchExampleContent } from "@/lib/examples";
import { ParsedDocument } from "@/lib/types";

interface BatchInputPanelProps {
  value: string;
  onValueChange: (text: string) => void;
  onAnalyze: (documents: ParsedDocument[], progressCallback: (n: number, total: number) => void) => void;
  isLoading: boolean;
  progress: { current: number; total: number } | null;
  error: string | null;
}

const MAX_DOCS = 10;

export default function BatchInputPanel({
  value,
  onValueChange,
  onAnalyze,
  isLoading,
  progress,
  error,
}: BatchInputPanelProps) {
  const parseResult = parseBatchInput(value);
  const { documents, errors, overLimit } = parseResult;
  const docCount = documents.length;
  const hasValidDocs = docCount > 0 && !overLimit && errors.length === 0;
  const canRun = hasValidDocs && !isLoading;

  const handleRun = useCallback(() => {
    if (!canRun) return;
    onAnalyze(documents, () => {});
  }, [canRun, documents, onAnalyze]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      }
    },
    [handleRun]
  );

  return (
    <section className="input-section">
      <div className="input-label-row">
        <label className="field-label" htmlFor="batch-input">
          PASTE UP TO 10 DOCUMENTS
        </label>
        {value.length > 0 && (
          <span className={`char-count ${docCount > MAX_DOCS ? "over" : ""}`}>
            Detected: {docCount} document{docCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <p className="field-helper">
        Separate each document with a line containing exactly three dashes:{" "}
        <code className="inline-code">---</code>. Optionally prefix each doc
        with{" "}
        <code className="inline-code"># Document Name</code> on its own line.
        Each doc must be 200 to 50,000 characters.
      </p>

      <textarea
        id="batch-input"
        className="document-textarea batch-textarea"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={`# Document Name\n\nPaste document content here...\n\n---\n\n# Second Document\n\nPaste second document here...`}
        spellCheck={false}
      />

      {overLimit && (
        <p className="batch-validation-error">
          Batch mode supports a maximum of {MAX_DOCS} documents. Currently
          detected: {docCount}. Please reduce.
        </p>
      )}

      {!overLimit && errors.length > 0 && (
        <div className="batch-validation-errors">
          {errors.map((e, i) => (
            <p key={i} className="batch-validation-error">
              {e.message}
            </p>
          ))}
        </div>
      )}

      {hasValidDocs && (
        <div className="batch-cost-estimate">
          <span className="cost-label">
            This batch will make {docCount} Claude API call
            {docCount !== 1 ? "s" : ""}.
          </span>
          <span className="cost-value">
            Estimated cost: ${estimateCost(docCount)}
          </span>
        </div>
      )}

      <div className="button-row">
        <button
          className="btn-primary"
          onClick={handleRun}
          disabled={!canRun}
        >
          {isLoading
            ? progress
              ? `ANALYZING ${progress.current} OF ${progress.total}...`
              : "ANALYZING..."
            : "RUN BATCH ANALYSIS"}
        </button>
        <button
          className="btn-ghost"
          onClick={() => onValueChange(batchExampleContent)}
          disabled={isLoading}
        >
          LOAD EXAMPLE
        </button>
        <span className="keyboard-hint">or cmd+enter</span>
      </div>

      {error && (
        <div className="error-banner" role="alert">
          {error}
        </div>
      )}
    </section>
  );
}
