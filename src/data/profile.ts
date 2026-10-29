// Top-level identity + hero/contact copy. Edit freely — this is the first
// place to touch when your title, tagline, or contact info changes.

export const profile = {
  name: 'Ali Alouane',
  role: 'AI Engineer — LLMs, RAG & Agentic Systems',
  location: 'Berlin, Germany',
  // Hero headline cycles through these after "I build ..."
  rotatingWords: ['agentic systems', 'RAG pipelines', 'LLM products', 'robots that learn'],
  tagline: 'From proof-of-concept to production: I ship GenAI that survives real users.',
  // Personal philosophy / north star — shown as a pull-quote in the About section.
  motto: 'Move fast on evidence. Move carefully on power.',
  heroDescription:
    "AI Engineer with 4+ years turning frontier models into production systems — multi-agent orchestration, retrieval-augmented generation, evaluation harnesses, and the MLOps that keeps it all running. Currently building LLM platforms at ITUC GmbH; previously co-founded an edge-AI startup and shipped production ML at truemetrics (YC S23). After hours I'm teaching a robotic arm new tricks with vision-language-action models.",
  email: 'mr.ali.alouane@gmail.com',
  resumeUrl: '/resume.pdf',
  calendlyUrl: 'https://calendly.com/mr_ali-alouane',
  github: 'https://github.com/mralioo',
  linkedin: 'https://www.linkedin.com/in/ali-alouane/',
};

// Animated counters in the About section. `value` is the number counted up
// to, `suffix` is appended verbatim.
export const stats = [
  { value: 4, suffix: '+', label: 'years shipping production ML' },
  { value: 2, suffix: '', label: 'agentic hackathon builds in 2026' },
  { value: 1, suffix: 'st', label: 'place — InnoTrans 2026 AI Track' },
  { value: 1, suffix: '', label: 'startup co-founded (edge AI)' },
];

export const socials = [
  { label: 'GitHub', url: 'https://github.com/mralioo', icon: 'github' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ali-alouane/', icon: 'linkedin' },
  { label: 'Email', url: 'mailto:mr.ali.alouane@gmail.com', icon: 'mail' },
];
