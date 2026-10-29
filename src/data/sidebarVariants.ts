// TEMPORARY — design review. Four candidate intros for the sidebar (copy +
// typography). The review picker (dev server, or any page with ?review)
// switches between them. Once one is chosen, its text moves into
// content/profile.json and this file and the picker get deleted.
//
// Inline Markdown: **bold**, *italic*, [links](url).
export type SidebarVariant = {
  id: 'a' | 'b' | 'c' | 'd';
  name: string;
  pitch: string; // one line describing the option, shown in the picker
  role: string;
  statement: string[]; // one entry per paragraph / line
  quote: string;
  quoteBy?: string;
};

export const sidebarVariants: SidebarVariant[] = [
  {
    id: 'a',
    name: 'Editorial',
    pitch: 'Fraunces serif name, warm human voice, worldview as a pull quote.',
    role: 'ML/AI Engineer · GenAI, Robotics & Physical AI',
    statement: [
      'I build **generative AI that ships**: LLMs, RAG and agentic systems, taken from first prototype to production.',
      'Outside my day job, I build robots that learn: I’m teaching a self-built robotic arm to see and act with **vision-language-action models**.',
    ],
    quote: 'AI is the next industrial revolution. I want to help steer it toward the most good, for the most people.',
  },
  {
    id: 'b',
    name: 'Terminal',
    pitch: 'Space Grotesk + monospace, engineer voice, scannable bullet lines.',
    role: '$ whoami → ML/AI engineer',
    statement: [
      '› GenAI in production: **LLMs · RAG · agents**',
      '› Robotics & Physical AI: **VLA, imitation learning, RL**',
      '› Thesis: AI is the **next industrial revolution**, so build it with care',
    ],
    quote: 'Move fast on evidence. Move carefully on power.',
  },
  {
    id: 'c',
    name: 'Manifesto',
    pitch: 'Instrument Serif display, leads with the industrial-revolution + effective-altruism stance.',
    role: 'ML/AI Engineer',
    statement: [
      'Steam automated muscle. Electricity scaled the factory. **AI is automating thinking**, the next industrial revolution.',
      'I build it in production (GenAI, agents, RAG) and in the physical world (robotics, VLA models).',
    ],
    quote: 'The question isn’t whether AI changes everything. It’s whether it changes things for the better, and for whom.',
    quoteBy: 'my effective-altruism lens',
  },
  {
    id: 'd',
    name: 'Minimal',
    pitch: 'Inter only, closest to today, one short paragraph and your motto.',
    role: 'ML/AI Engineer · LLMs, RAG & Agentic Systems',
    statement: [
      'From proof-of-concept to production, I ship GenAI that survives real users, and I’m building toward **robots that learn**.',
    ],
    quote: 'Move fast on evidence. Move carefully on power.',
  },
];
