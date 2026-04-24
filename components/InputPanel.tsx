"use client";

import { useRef, useState, useCallback, KeyboardEvent } from "react";
import { examples } from "@/lib/examples";

interface InputPanelProps {
  value: string;
  onValueChange: (text: string) => void;
  onAnalyze: (document: string) => void;
  isLoading: boolean;
  error: string | null;
}

export default function InputPanel({
  value,
  onValueChange,
  onAnalyze,
  isLoading,
  error,
}: InputPanelProps) {
  const [exampleIndex, setExampleIndex] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const charCount = value.length;
  const MAX = 50000;

  function charCountClass() {
    if (charCount > MAX) return "char-count over";
    if (charCount > 40000) return "char-count warning";
    return "char-count";
  }

  function handleLoadExample() {
    const example = examples[exampleIndex % examples.length];
    onValueChange(example.content);
    setExampleIndex((i) => i + 1);
    textareaRef.current?.focus();
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (!isLoading && value.trim().length >= 200) {
          onAnalyze(value);
        }
      }
    },
    [isLoading, value, onAnalyze]
  );

  return (
    <section className="input-section">
      <div className="input-label-row">
        <label className="field-label" htmlFor="document-input">
          PASTE A DOCUMENT TO ANALYZE
        </label>
        <span className={charCountClass()}>
          {charCount.toLocaleString()} / {MAX.toLocaleString()}
        </span>
      </div>

      <p className="field-helper">
        No document handy?{" "}
        <button className="load-example-inline" onClick={handleLoadExample} disabled={isLoading}>
          Load an example
        </button>
        {" "}to see the tool in action.
      </p>

      <p className="field-helper">
        Knowledge base article, policy doc, support macro, or any text that
        would be ingested into a retrieval layer for an AI agent. 200 to 50,000
        characters.
      </p>

      <textarea
        id="document-input"
        ref={textareaRef}
        className="document-textarea"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Paste document content here..."
        spellCheck={false}
      />

      <div className="button-row">
        <button
          className="btn-primary"
          onClick={() => onAnalyze(value)}
          disabled={isLoading}
        >
          {isLoading ? "ANALYZING..." : "RUN ANALYSIS"}
        </button>
        <button
          className="btn-ghost"
          onClick={handleLoadExample}
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
