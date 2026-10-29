---
title: "NextMove: 1st Place at the InnoTrans 2026 Hackathon"
description: "How a four-agent system — Dispatcher, Analyst, Inspector, Writer — turns a plain-language question into a verified operator brief for railway control rooms. Architecture, guardrails, and the stack behind the win."
date: 2026-09-25
tags: ["agentic-ai", "hackathon", "google-adk", "fastmcp", "tabpfn", "neo4j", "litellm", "fastapi", "innotrans2026"]
draft: false
cover: "/blog/nextmove-innotrans-2026/trophy-team.jpg"
---

Last week, our team won **1st place in the AI Track** at the **InnoTrans 2026 Hackathon**, hosted by FACTORY-C and Alstom, with **NextMove** — an agentic AI system for the railway control room.

![Team NextMove accepting the InnoTrans Hackathon AI Track 2026 trophy](/blog/nextmove-innotrans-2026/trophy-team.jpg)

Repo: **[github.com/mralioo/NextMove](https://github.com/mralioo/NextMove)** · Animated system design: **[open the walkthrough](https://htmlpreview.github.io/?https://github.com/mralioo/NextMove/blob/main/docs/presentation/nextmove_agentic_system.html)**

## The problem

The challenge brief, and the conversations we had at Alstom's booth, pointed at the same gap: when something goes wrong on the network — say, *"U7 is suspended between Hermannplatz and Karl-Marx-Straße — where can passengers reroute, which stations face increased demand, and where should we send staff?"* — an operator's honest answer requires correlating live disruption data, historical demand patterns, and station capacity limits across several separate dashboards, under time pressure. That reassembly work is exactly the kind of thing an AI team can do in parallel — as long as it doesn't guess at the numbers.

That constraint became our design principle: **the model never invents a number.** Every figure in the final brief has to be traceable to a deterministic tool call, not to the language model's imagination.

## Why an agent *team*, not an agent

A single LLM call that both *does the analysis* and *writes the answer* has no way to catch its own mistakes. We split the work into four roles instead, each with a narrow job and the ability to block the ones downstream:

| Role | Job | Code |
|---|---|---|
| **Dispatcher** | Interprets the question, routes it, rejects off-topic or manipulative input | `agent/supervisor.py`, `router.py`, `guardrails.py` |
| **Analyst** | Pulls data through MCP tools, runs the passenger-demand forecast with **TabPFN** | `agent/worker.py`, `specialists.py`, `executor.py` |
| **Inspector** | Recomputes the key figures independently from raw data and the quality database, checks them against operational constraints, and can send the Analyst back for another round | `agent/evaluator.py`, `loop.py`, `quality_mcp.py` |
| **Writer** | Produces a one-screen brief — verdict, evidence, recommended action, caveats, sources — never the full report unless asked | `agent/writer.py`, `artifacts.py` |

The Analyst and Inspector run in a bounded loop (two rounds max, 40 seconds): the Inspector doesn't just sanity-check the Writer's prose, it independently recomputes ground truth from the raw CSVs and the quality database, and that ground truth outranks whatever the Analyst produced. If verification fails, the system declines rather than guesses. **NextMove advises; the operator decides.**

## Grounding and memory

Two things keep the system honest and let it improve over time:

- **Numerical facts are forced through MCP tools**, never through the LLM's own recall — three FastMCP servers expose 57 tools across data access, TabPFN forecasting, and quality/ground-truth checks. Forecasts are explicitly labeled as estimates, not facts.
- **Operator feedback writes back into a Neo4j knowledge graph.** Every rating and every "here's what I actually did" report becomes a precedent, so a similar future question surfaces *what operators did last time and how it went* — not just a fresh forecast.

## Stack

Google **ADK** for the agent team · **FastMCP** for the tool servers · **TabPFN** as the tabular foundation model behind the demand forecast · **LiteLLM** to route each role to its own model (Azure/OpenAI) · **FastAPI** + **React/Vite** for the operator UI · **SQLite** for the knowledge base and observability store · **Neo4j** for the knowledge graph · **Streamlit** for the internal dashboard.

## The team

Built with **Till Determann**, **Kawther Ramadan**, and **Harsh Patel** — four roles on the whiteboard, four of us building, over roughly 36 hours.

![NextMove team and mentors on the AI Mobility Corner main stage](/blog/nextmove-innotrans-2026/main-stage.jpg)

Thanks to our mentors — Nenad Mijatovic, Simone Libera, Victor Andres Martin Moreno, and Annelie Andersson — for the sharp feedback throughout. Thanks to the Alstom team for the booth walkthrough and for showing us the real systems behind the challenge; seeing the operational context firsthand shaped how we thought about the Inspector role. And thanks to FACTORY-C and InnoTrans for putting the whole thing together.

Official announcement: [Alstom's LinkedIn post](https://www.linkedin.com/posts/alstom_innotrans2026-hackathon-activity-7509529622674329600-X2tu).

## Try it

The [README](https://github.com/mralioo/NextMove) has a `make install && make up` quick start, and the [animated walkthrough](https://htmlpreview.github.io/?https://github.com/mralioo/NextMove/blob/main/docs/presentation/nextmove_agentic_system.html) is the fastest way to see the agent hierarchy, the verification loop, and the knowledge graph in motion without running anything locally.
