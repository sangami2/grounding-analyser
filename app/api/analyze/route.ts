import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@/lib/prompt";
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

  let body: { document?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const document = body.document ?? "";

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

  const client = new Anthropic({ apiKey });

  let rawContent: string;
  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 4096,
      temperature: 0.3,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Please analyze this document for RAG grounding quality:\n\n${document}`,
        },
        {
          role: "assistant",
          content: "{",
        },
      ],
    });

    const block = message.content[0];
    if (block.type !== "text") {
      return NextResponse.json(
        { error: "Unexpected response format from analysis model." },
        { status: 502 }
      );
    }
    // Prepend the prefilled "{" since Claude continues from there
    rawContent = "{" + block.text;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Analysis service error: ${message}` },
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
        error: "Failed to parse analysis response.",
        debug_raw_response: sanitized.slice(0, 500),
      },
      { status: 500 }
    );
  }
}
