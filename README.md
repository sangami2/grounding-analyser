# Grounding Quality Analyzer

I built this tool to learn something specific: what makes a document a good or bad grounding source for an AI agent? I was curious about the RAG (retrieval-augmented generation) pipeline, and I wanted to understand the quality problem at the data layer, not just the model layer. This is the artifact of that investigation.

The problem it addresses: when organizations ingest documents into a vector database to ground an AI agent, they generally do not evaluate those documents for retrieval readiness before they go in. A document that is vague, self-contradictory, stale, or poorly structured for chunking will produce low-quality agent responses, and the cause is invisible at inference time. There is no obvious self-service way to diagnose a document before it is ingested.

This tool takes a document -- a knowledge base article, policy doc, support macro, or any text intended for a retrieval layer -- and runs it through Claude with a structured analysis prompt. It returns a grounding quality score across five dimensions: chunking readiness, ambiguity, internal contradiction, staleness signals, and coverage gaps. Each dimension includes a score, a plain-language summary, and specific quoted evidence from the document. The tool also surfaces a retrieval risk rating and a short list of actionable recommendations.

## Running locally

**Prerequisites:** Node.js 18 or later, an Anthropic API key.

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/sangami2/grounding-analyser
cd grounding-analyser
npm install
```

2. Copy the example environment file and add your API key:

```bash
cp .env.example .env.local
```

Open `.env.local` and replace the placeholder with your actual Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
```

3. Start the development server:

```bash
npm run dev
```

4. Open http://localhost:3000 in your browser.

The API key is used only in the server-side API route (`app/api/analyze/route.ts`). It is never sent to the browser.

## Deploying to Vercel

1. Push the repository to GitHub (make sure `.env.local` is in `.gitignore` -- it is by default).

2. Go to vercel.com, create a new project, and import the GitHub repository.

3. In the Vercel project settings, add an environment variable:
   - Key: `ANTHROPIC_API_KEY`
   - Value: your Anthropic API key

4. Deploy. Vercel will run `npm run build` automatically. The API route runs as a serverless function, so the key stays server-side.

## Limitations

The scoring model is opinionated. The five dimensions and their weights reflect my own judgment about what matters for RAG retrieval quality -- they are not validated against Salesforce's internal benchmarks or any other production RAG system. Claude's analysis is not deterministic: the same document will produce slightly different scores across runs, even at temperature 0.3.

This is not a Salesforce product and has no affiliation with Salesforce. It does not use any Salesforce internal data, systems, or APIs. The tool is a personal learning artifact.

The 50,000-character document limit is a practical constraint to keep API costs and latency reasonable for a demo tool. Production RAG pipelines typically handle documents of arbitrary length through recursive chunking strategies this tool does not simulate.

## Acknowledgment

My understanding of the grounding quality problem was shaped in part by Chandrika Shankarnarayan's public writing and talks on data quality and AI readiness. I am grateful for that work being available.

## Tech stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Anthropic TypeScript SDK
- Deployed on Vercel
