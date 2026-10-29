---
title: "SupplyGuard"
summary: "Agentic supplier-risk assistant for Siemens Mobility rail procurement — a Nemotron supervisor fans out to four specialist agents (data, documents, email, web) and returns cited, explainable buy/avoid recommendations. Built and deployed with ITUC colleagues in under 6 hours."
stack: ["NVIDIA Nemotron", "Multi-Agent", "Nebius Token Factory", "Tavily", "FastAPI + SSE", "React", "Docker"]
repo: "https://github.com/EmilieD8/Track_records"
featured: true
badge: "Nebius × NVIDIA Hackathon · 10.2026"
image: "/projects/supplyguard-agents.png"
order: 1
---

Built at the **Nebius Build Week Hackathon in partnership with NVIDIA** ({Tech: Europe},
Berlin, 18 October 2026) for the **Siemens Mobility: Supplier Risk Intelligence** track,
together with colleagues from ITUC — designed, built, and deployed to a Nebius VM in
**less than 6 hours**.

## The problem

Rail procurement teams juggle thousands of suppliers. Headline risk scores hide danger
(911 of 10,000 suppliers rated Low/Medium carry a *Critical* sub-score), and signals —
audit PDFs, supplier emails, news — are scattered across tools nobody links back to the score.

## What we built

- A **supervisor agent on NVIDIA Nemotron** delegates in parallel to a **Data Agent**,
  **Document Agent** (Nemotron Parse OCR), **Email Agent**, and **Web Agent** (Tavily).
- **Explainable risk, no invented numbers:** we reverse-engineered the dataset's 18-factor
  weighted risk index exactly — the LLM picks the tool and explains, the tool does the maths.
- **Email-driven re-scoring:** a supplier delay email triggers risk recomputation, line-stop
  analysis against safety stock, and alternative suppliers — applied only after human approval.
- **Generated workspace:** Nemotron writes a role-specific layout spec, validated against a
  fixed component list (the LLM never writes code).
- **Security layer:** prompt-injection guardrails, untrusted-content handling, user-defined
  boundaries, a Validator Agent, human-in-the-loop approvals, and an audit log.

**Stack:** Nemotron 3 Super, Nebius Token Factory & Cloud, Tavily, FastAPI with Server-Sent
Events, pandas, PyMuPDF, React 18, Vite, Tailwind, d3, Docker, Caddy.
