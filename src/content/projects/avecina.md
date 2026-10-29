---
title: "Avecina (Viaticum)"
summary: "AI clinical scribe for German hospitals: a wearable streams the consultation, German medical speech-to-text plus fine-tuned NER and a LoRA-tuned Gemma model turn it into a SOAP note, and a RAG companion helps fill the hospital's KIS. Built at the Berlin Big Hackathon 2026, then grown into an MVP."
stack: ["FastAPI", "React", "Gemma-3 LoRA", "GLiNER2", "Parakeet ASR", "OpenSearch RAG", "GCP"]
repo: "https://github.com/mralioo/viaticum"
demo: "https://kindred-scribe-35.lovable.app/"
featured: true
badge: "Berlin Big Hackathon 2026 → MVP"
image: "/projects/avecina.jpg"
order: 3
---

**Avecina** is a healthcare AI prototype that reduces the documentation burden on doctors
and nurses. It listens to a doctor–patient consultation, transcribes it in German medical
language, structures it into a SOAP note and helps transfer it into the hospital
information system (KIS). The clinician always reviews and approves the result.


## The problem

German hospital physicians spend a large share of their day on documentation, re-entering
information across disconnected, often API-less systems such as SAP IS-H, ORBIS and CGM.
Most medical AI scribes are English-first and cloud-only, which makes them hard to deploy
inside German hospital networks.

**Core idea:** capture audio, process it close to the hospital, and write back into the
existing KIS user interface instead of waiting years for vendor API access.

## What I built

Built in two days at the **Berlin Big Hackathon 2026** and extended afterwards:

- **Ambient capture:** an Omi wearable pin (or a `.wav` simulator) streams PCM-16 / 16 kHz
  audio over WebSocket.
- **Dual-redundant speech-to-text:** Parakeet-DE-Med on a GCE T4 GPU as primary, the
  Gradium streaming API as fallback, plus a demo stub, all behind one router so the
  pipeline degrades gracefully.
- **Fine-tuned NLP:** GLiNER2-DE-Med (205M) extracts 7 medical entity types; a Gemma-3-4B
  LoRA model turns the transcript into structured SOAP JSON. Both were trained on
  synthetic German data on the Pioneer platform, so no real patient data was used.
- **RAG:** BAAI/bge-m3 embeddings in an OpenSearch k-NN index with a German analyzer,
  plus PostgreSQL and Firestore for patients, chat history and SOAP records.
- **Hakîm AI companion:** FastAPI endpoints for SOAP drafts with confidence, colour-coded
  entity chips and RAG Q&A with citations.
- **Mock KIS frontend:** 12 German-language React screens with a typewriter form-fill
  that shows the hand-off into the hospital system.

## Engineering decisions

- **Model per task:** small, fine-tuned models for German ASR, NER and SOAP generation
  instead of one frontier LLM: cheaper, deterministic and deployable on modest hardware.
- **Non-invasive integration:** OCR / UI automation over the existing KIS screens instead
  of vendor-specific backend integrations.
- **Privacy-first architecture:** the proof of concept runs on Google Cloud (EU); fully
  on-premise deployment is the production goal.

## Roadmap

1. **Ambient documentation copilot:** conversation → SOAP notes, codes and KIS entry, human-reviewed.
2. **Hospital data layer:** extract labs, reports and scans into validated JSON mapped to HL7 FHIR.
3. **Agentic coordination:** permission-scoped agents for clinical and operational teams,
   with explicit human authorization for anything sensitive.

*Hackathon proof of concept and MVP, not a clinically validated or deployed medical device.*
