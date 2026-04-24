"use client";

export default function Header() {
  return (
    <header className="pt-12 pb-8">
      <p className="eyebrow mb-4">A LEARNING PROJECT &middot; BY AKASH SANGAMI</p>
      <h1 className="headline-serif mb-3">Grounding Quality Analyzer</h1>
      <p className="deck-serif mb-8">
        How well would this document ground an AI agent? A diagnostic tool for
        thinking about RAG readiness.
      </p>
      <div className="rule" />
    </header>
  );
}
