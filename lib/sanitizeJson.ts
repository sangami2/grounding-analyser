/**
 * Strip markdown code fences from a Claude response before JSON.parse.
 * Claude occasionally wraps JSON in ```json ... ``` despite being told not to.
 * The assistant-prefill technique makes this nearly impossible, but this runs
 * as a belt-and-suspenders fallback.
 */
export function sanitizeJsonResponse(raw: string): string {
  let text = raw.trim();

  // Full-wrap pattern: ```json\n...\n``` or ```\n...\n```
  const fenceMatch = text.match(/^```(?:json)?\s*\n?([\s\S]*?)\n?```\s*$/);
  if (fenceMatch) {
    return fenceMatch[1].trim();
  }

  // Opening fence only (no closing, or prefill already starts with {)
  if (text.startsWith("```json") || text.startsWith("```")) {
    const firstNewline = text.indexOf("\n");
    if (firstNewline !== -1) {
      text = text.slice(firstNewline + 1);
    }
  }

  // Closing fence only
  if (text.endsWith("```")) {
    text = text.slice(0, text.lastIndexOf("```"));
  }

  return text.trim();
}
