// "Always learning" section: courses in progress and completed.
// `progress` is 0–100 and drives the animated bar. Bump it as you go;
// set it to 100 and add `completed` once done.
export type Course = {
  title: string;
  provider: string;
  progress: number;
  url?: string;
  completed?: string; // e.g. "11/2026"
  focus: string[];
};

export const courses: Course[] = [
  {
    title: 'Data Engineering Professional Certificate',
    provider: 'DeepLearning.AI × AWS',
    progress: 25, // TODO: update to your real progress
    url: 'https://www.deeplearning.ai/specializations/data-engineering',
    focus: ['Data pipelines', 'AWS', 'Batch & streaming', 'Data modeling'],
  },
  {
    title: 'Fundamentals of Deep Learning · Accelerated Computing with CUDA Python',
    provider: 'NVIDIA Deep Learning Institute',
    progress: 100,
    completed: '08/2024',
    focus: ['CUDA', 'GPU acceleration'],
  },
  {
    title: 'Deep Learning Specialization',
    provider: 'DeepLearning.AI',
    progress: 100,
    completed: '08/2018',
    focus: ['Neural networks', 'CNNs', 'Sequence models'],
  },
];
