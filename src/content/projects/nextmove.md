---
title: "NextMove"
summary: "1st place, InnoTrans 2026 AI Track. A four-agent system — Dispatcher, Analyst, Inspector, Writer — that turns a plain-language question into a verified railway control-room brief. Every number comes from a tool call, never from the model."
stack: ["Google ADK", "FastMCP", "TabPFN", "Neo4j", "LiteLLM", "FastAPI"]
repo: "https://github.com/mralioo/NextMove"
featured: true
badge: "🏆 1st place · InnoTrans 2026"
order: 2
---

Winner of the **AI Track at the InnoTrans 2026 Hackathon** (FACTORY-C × Alstom).

- **Dispatcher** routes and guards input, **Analyst** pulls data through 57 MCP tools and
  forecasts demand with TabPFN, **Inspector** independently recomputes ground truth and can
  send the Analyst back, **Writer** produces a one-screen operator brief.
- Operator feedback writes back into a **Neo4j knowledge graph** so precedents surface next time.

Full write-up on the blog: [NextMove: 1st Place at the InnoTrans 2026 Hackathon](/blog/nextmove-innotrans-2026).
