---
title: "H.AI (Humanized AI)"
summary: "Work in progress: an agentic AI co-planner for railway electrical engineering. It reads CAD drawings, calculation sheets and norms together, drafts the authority-ready documents with citations and flags every discrepancy, while the certified engineer reviews and signs."
stack: ["Multi-Agent", "RAG", "Vision-Language Models", "ezdxf / shapely", "Vertex AI", "Customer Discovery"]
repo: "https://github.com/Humanized-AI"
featured: true
badge: "WIP · Berlin Startup School 2026"
image: "/projects/humanized-thumb.jpg"
cover: "/projects/humanized-band.jpg"
order: 4
---

**Engineering Clarity. AI Velocity.** H.AI is the venture idea I validated and developed
during the **10-week bootcamp at [Berlin Startup School](https://www.berlinstartupschool.com/de/10-week-bootcamp)**
in summer 2026.


## The problem

Planning railway electrical systems (50 Hz auxiliary power and control cabinets, DACH
region) is slow, manual and highly regulated. Certified engineers spend weeks copying
values from CAD into spreadsheets, from spreadsheets into Word and from Word into
submission portals. A single number that drifts out of sync can send the whole plan back
for a long, costly authority review.

*The problem was never the engineering. It was the coordination around it.*

## The idea: the AI drafts, the engineer decides

A set of specialized agents, coordinated by an orchestrator, moves a project from raw
inputs to an authority-ready draft:

1. **Read:** ingest CAD drawings, calculation sheets and documents as one connected model.
2. **Understand:** extract requirements and constraints.
3. **Check:** validate against the applicable norms via retrieval over a live norm base.
4. **Draft & flag:** generate the required document with sources attached and flag every discrepancy.
5. **Approve:** the certified engineer reviews, corrects and signs.

Human-in-the-loop by design: every expert correction becomes training data for a
dedicated domain model, a data flywheel a general model can't replicate.

## What I'm building

- **groundwork:** an engineer-in-the-loop workflow engine for AEC (node-based, self-hosted, extensible).
- **nodes-aec:** domain nodes for CAD, BIM (IFC), calculation sheets and submission formats.
- **normbase:** a norm and standard index with citation-level traceability.

## What I did during the bootcamp

- Designed the agentic architecture (orchestrator + specialist agents) and the human-in-the-loop control flow.
- Validated the problem in customer-discovery interviews with practising railway electrical planners.
- Worked on positioning, competitive analysis against horizontal AEC-AI tools, the B2B SaaS
  model (free pilot, then per-seat) and the brand identity.

Domain grounding comes from a practising 50 Hz railway electrical planner.
