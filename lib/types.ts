export interface EvidenceItem {
  quote: string;
  note: string;
}

export interface DimensionResult {
  score: number;
  summary: string;
  evidence: EvidenceItem[];
}

export interface AnalysisResult {
  chunking_readiness: DimensionResult;
  ambiguity_detection: DimensionResult;
  internal_contradiction: DimensionResult;
  staleness_signals: DimensionResult;
  coverage_gaps: DimensionResult;
  overall_score: number;
  overall_summary: string;
  retrieval_risk: "low" | "medium" | "high";
  top_recommendations: string[];
}

export type RetrievalRisk = "low" | "medium" | "high";

export type AppMode = "single" | "batch";

export interface ParsedDocument {
  name: string;
  content: string;
}

export interface ParseError {
  index: number;
  name: string;
  message: string;
}

export interface BatchDocumentResult {
  name: string;
  analysis?: AnalysisResult;
  error?: string;
}

export interface BatchAnalysisResponse {
  results: BatchDocumentResult[];
}

export interface ImproveResult {
  changes: string[];
  improved_document: string;
}
