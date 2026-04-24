import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { IMPROVE_SYSTEM_PROMPT } from "@/lib/improvePrompt";
import { sanitizeJsonResponse } from "@/lib/sanitizeJson";

const MIN_CHARS = 200;
const MAX_CHARS = 50000;

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === "sk-ant-placeholder-replace-me") {
    return NextResponse.json(
      { error: "Server misconfigured: API key not set." },
      { status: 500 }
    );
  }

  let body: {
    document?: string;
    recommendations?: string[];
    dimension_summaries?: string[];
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const document = body.document ?? "";
  const recommendations = body.recommendations;
  const dimension_summaries = body.dimension_summaries;

  if (document.length < MIN_CHARS) {
    return NextResponse.json(
      {
        error: `Document is too short. Minimum is ${MIN_CHARS} characters; received ${document.length}.`,
      },
      { status: 400 }
    );
  }

  if (document.length > MAX_CHARS) {
    return NextResponse.json(
      {
        error: `Document is too long. Maximum is ${MAX_CHARS.toLocaleString()} characters; received ${document.length.toLocaleString()}.`,
      },
      { status: 400 }
    );
  }

  if (!Array.isArray(recommendations)) {
    return NextResponse.json(
      { error: "recommendations must be an array." },
      { status: 400 }
    );
  }

  if (!Array.isArray(dimension_summaries)) {
    return NextResponse.json(
      { error: "dimension_summaries must be an array." },
      { status: 400 }
    );
  }

  const recLines = recommendations.map((r) => `- ${r}`).join("\n");
  const dimLines = dimension_summaries.map((s) => `- ${s}`).join("\n");

  const userMessage = `Original document (${document.length.toLocaleString()} characters):
${document}

Issues identified in this document (use these to guide your rewriting):
Recommendations from analysis:
${recLines}

Per-dimension findings:
${dimLines}

TASK: Rewrite this document to score 9 or 10 out of 10 on every RAG quality dimension. Make targeted in-place fixes only — replace vague text with specific text, do not add whole new sections or paragraphs. The improved_document field MUST be under ${(document.length + 2000).toLocaleString()} characters (original is ${document.length.toLocaleString()} chars). Return JSON only.`;

  const client = new Anthropic({ apiKey });

  let rawContent: string;
  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 8192,
      temperature: 0.3,
      system: IMPROVE_SYSTEM_PROMPT,
      messages: [
        { role: "user", content: userMessage },
        { role: "assistant", content: "{" },
      ],
    });

    const block = message.content[0];
    if (block.type !== "text") {
      return NextResponse.json(
        { error: "Unexpected response format from improve model." },
        { status: 502 }
      );
    }
    rawContent = "{" + block.text;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Improve service error: ${msg}` },
      { status: 502 }
    );
  }

  const sanitized = sanitizeJsonResponse(rawContent);

  try {
    const parsed = JSON.parse(sanitized);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json(
      {
        error: "Failed to parse improve response.",
        debug_raw_response: sanitized.slice(0, 500),
      },
      { status: 500 }
    );
  }
}
