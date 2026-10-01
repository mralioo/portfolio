export type EducationItem = {
  degree: string;
  org: string;
  start: string;
  end: string;
  detail?: string;
  thesis?: { title: string; group: string };
};

export const education: EducationItem[] = [
  {
    degree: 'M.Sc. Electrical Engineering',
    org: 'Technical University of Berlin',
    start: '2018',
    end: '2024',
    detail: 'Specializing in communication networks and signal processing.',
    thesis: {
      title: 'Deep Learning Approaches to Decoding Sensorimotor Rhythms for Brain-Computer Interfaces',
      group: 'Neurotechnology Group',
    },
  },
  {
    degree: 'B.Sc. Electrical Engineering and Information Technology',
    org: 'University of Stuttgart',
    start: '2013',
    end: '2017',
    detail: 'Specializing in communication networks and signal processing.',
    thesis: {
      title: 'Multidimensional Energy Disaggregation in Residential Buildings via Deep Learning',
      group: 'Institute for Signal Processing',
    },
  },
];

export type Certificate = {
  title: string;
  org: string;
  date: string;
  detail?: string;
};

export const certificates: Certificate[] = [
  {
    title: '10-Week Startup Bootcamp',
    org: 'Berlin Startup School',
    date: 'Summer 2026',
    detail: 'Validated a healthcare business idea via structured customer discovery; MVP and business-model fundamentals.',
  },
  {
    title: 'Deep Learning Institute',
    org: 'NVIDIA',
    date: '08/2024',
    detail: 'Fundamentals of Deep Learning and Accelerated Computing with CUDA Python.',
  },
  {
    title: 'Design Thinking Intensive Training',
    org: '.msg',
    date: '05/2024',
    detail: 'User research, problem definition, prototyping, and user testing.',
  },
  {
    title: 'Deep Learning Specialization',
    org: 'deeplearning.ai',
    date: '08/2018',
    detail: 'Coursera specialization in neural networks, ML, and AI applications.',
  },
];
