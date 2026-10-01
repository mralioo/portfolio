export type SkillGroup = { label: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    label: 'Machine Learning',
    items: ['Deep Learning', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'MLOps', 'Sensor Fusion'],
  },
  {
    label: 'Engineering',
    items: ['Python', 'C++', 'Swift', 'Docker', 'Git / DVC', 'CI/CD'],
  },
  {
    label: 'Infra & Cloud',
    items: ['AWS (SageMaker, Lambda)', 'GCP', 'Airflow', 'MLflow', 'FastAPI', 'LangChain'],
  },
  {
    label: 'Data',
    items: ['ETL pipelines', 'SQL', 'tsfresh', 'Bokeh', 'REST APIs'],
  },
];

export const languages = [
  { label: 'German', level: 4 },
  { label: 'English', level: 4 },
  { label: 'French', level: 4 },
  { label: 'Arabic', level: 5 },
];

export const softSkills = [
  'Critical Thinking',
  'Troubleshooting',
  'Continuous Learning',
  'Teamwork',
  'Collaboration',
  'Communication',
];
