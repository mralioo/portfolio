// Work history, newest first. Pulled from resume.pdf (Oct 2026 version).
export type ExperienceItem = {
  role: string;
  org: string;
  start: string;
  end: string; // "Today" for current role
  bullets: string[];
  stack: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: 'Machine Learning Engineer',
    org: 'ITUC GmbH',
    start: '11.2024',
    end: 'Today',
    bullets: [
      'Design and implement scalable ML pipelines for LLMs across business applications.',
      'Rapid-prototype AI-driven solutions for fast iteration and proof-of-concepts.',
      'Build deployment workflows with CI/CD integration for production readiness.',
      'Run systematic model evaluation, benchmarking, and optimization.',
      'Collaborate cross-functionally to translate business concepts into production systems.',
    ],
    stack: ['LangChain', 'GitHub Actions', 'Airflow', 'MLflow', 'FastAPI'],
  },
  {
    role: 'Technical Co-Founder & Lead ML Engineer',
    org: 'ROVEONE',
    start: '10.2023',
    end: '08.2024',
    bullets: [
      'Co-founded an edge-AI civilian protection startup; served on the board, led the privacy-first iOS threat detection engine.',
      'Designed a Bayesian sensor-fusion engine combining audio, motion, and contextual signals; deployed optimized YAMNet/CoreML models on the Apple Neural Engine.',
      'Built a GDPR-compliant GCP data and active-learning pipeline for ingestion, labeling, model improvement, and analytics.',
    ],
    stack: ['TensorFlow', 'CoreML', 'Python', 'Swift', 'GCP', 'Docker'],
  },
  {
    role: 'ML Engineer — Intern & Freelancer',
    org: 'truemetrics GmbH (YC S23)',
    start: '04.2022',
    end: '10.2023',
    bullets: [
      "Progressed from intern to the startup's first ML Engineer; continued as freelancer with end-to-end ownership.",
      'Analyzed and visualized large-scale mobility/sensor data for logistics insights.',
      'Developed, fine-tuned, and evaluated time-series ML models for real-world predictions.',
      'Built and deployed a production ML pipeline on AWS — processing, feature extraction, experiment tracking, inference.',
    ],
    stack: ['Python', 'TensorFlow', 'tsfresh', 'AWS', 'MLflow', 'Scrum'],
  },
  {
    role: 'Working Student — Transmission & Hybrid Systems',
    org: 'IAV GmbH',
    start: '09.2018',
    end: '10.2020',
    bullets: [
      'Developed a reinforcement learning framework for automotive applications.',
      'Automated data preprocessing pipelines for efficiency.',
      'Implemented and evaluated RL and supervised learning algorithms.',
    ],
    stack: ['Python', 'Matlab', 'PyTorch', 'Jenkins'],
  },
];
