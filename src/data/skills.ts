// The "POC → Production" lifecycle is the centrepiece of the Skills section:
// one card per stage, scrolled horizontally on desktop. Keep each stage to
// ~6–8 tools so the cards stay readable.
export type LifecycleStage = {
  step: string;
  title: string;
  pitch: string;
  tools: string[];
};

export const lifecycle: LifecycleStage[] = [
  {
    step: '01',
    title: 'Discover & Prototype',
    pitch:
      'Turn a fuzzy business problem into a working GenAI proof-of-concept in days, not quarters — rapid prompting, model selection, and a demo stakeholders can click.',
    tools: ['Prompt Engineering', 'Claude / GPT / Gemini', 'Llama · Qwen · Nemotron', 'Streamlit', 'Jupyter', 'Design Thinking'],
  },
  {
    step: '02',
    title: 'Retrieve & Ground',
    pitch:
      'Production-grade RAG: ingestion, chunking, hybrid search, re-ranking, and knowledge graphs — so every answer is grounded and cited, never hallucinated.',
    tools: ['RAG', 'GraphRAG', 'Vector DBs (Qdrant, pgvector)', 'Neo4j', 'Embeddings & Re-rankers', 'Hybrid Search', 'Document AI / OCR'],
  },
  {
    step: '03',
    title: 'Orchestrate Agents',
    pitch:
      'Multi-agent systems with supervisors, specialists, and verifiers — tool calling over MCP, guardrails, and human-in-the-loop by design.',
    tools: ['LangGraph', 'LangChain', 'Google ADK', 'MCP / FastMCP', 'Tool Calling', 'Guardrails', 'LiteLLM'],
  },
  {
    step: '04',
    title: 'Evaluate & Optimize',
    pitch:
      "If it isn't measured, it isn't shipped. LLM-as-a-judge, golden datasets, regression suites, latency/cost tuning, and fine-tuning when prompting hits its ceiling.",
    tools: ['LLM Evals', 'LLM-as-a-Judge', 'RAGAS', 'LoRA / PEFT Fine-tuning', 'Quantization', 'Observability (Langfuse)'],
  },
  {
    step: '05',
    title: 'Deploy & Scale',
    pitch:
      'Containerized, CI/CD-driven, cloud-native deployments with streaming APIs, model serving, monitoring, and cost control — LLMOps end to end.',
    tools: ['FastAPI + SSE', 'Docker', 'Kubernetes', 'vLLM', 'AWS · GCP · Nebius', 'GitHub Actions', 'MLflow', 'Airflow'],
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    label: 'Generative AI',
    items: ['LLMs', 'Agentic AI', 'Multi-Agent Systems', 'RAG', 'Prompt Engineering', 'Fine-tuning', 'Context Engineering'],
  },
  {
    label: 'ML & Deep Learning',
    items: ['PyTorch', 'TensorFlow', 'Hugging Face', 'Scikit-learn', 'Time-Series', 'Sensor Fusion', 'Reinforcement Learning'],
  },
  {
    label: 'LLMOps & Cloud',
    items: ['MLOps / LLMOps', 'Docker', 'CI/CD', 'AWS', 'GCP', 'MLflow', 'Airflow', 'DVC'],
  },
  {
    label: 'Engineering',
    items: ['Python', 'TypeScript', 'C++', 'Swift', 'FastAPI', 'REST & Streaming APIs', 'SQL'],
  },
  {
    label: 'Physical AI & Embedded',
    items: ['VLA Models', 'Imitation Learning', 'ROS 2', 'MuJoCo / Isaac Sim', 'Edge AI (CoreML)', 'Microcontrollers', 'Electronics & PCB'],
  },
];

// Scrolling marquee strip under the hero — a quick visual "stack at a glance".
export const marquee = [
  'LangGraph', 'RAG', 'MCP', 'PyTorch', 'Nemotron', 'Claude', 'Neo4j', 'FastAPI', 'Docker',
  'Kubernetes', 'vLLM', 'Hugging Face', 'LeRobot', 'ROS 2', 'MLflow', 'AWS', 'GCP',
];

export const languages = [
  { label: 'German', level: 4 },
  { label: 'English', level: 4 },
  { label: 'French', level: 4 },
  { label: 'Arabic', level: 5 },
];

export const softSkills = [
  'Product Thinking',
  'Stakeholder Communication',
  'Rapid Prototyping',
  'Ownership',
  'Cross-functional Collaboration',
  'Continuous Learning',
];
