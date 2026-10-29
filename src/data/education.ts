// Degrees and certificates. Content: content/education.json.
// Courses (DeepLearning.AI, NVIDIA DLI, …) live in learning.ts.
import data from './content/education.json';
import type { Milestone } from './experience';

export type EducationItem = {
  degree: string;
  org: string;
  start: string;
  end: string;
  detail?: string;
  thesis?: { title: string; group: string };
  milestones?: Milestone[];
};

export type Certificate = {
  title: string;
  org: string;
  date: string;
  detail?: string;
  milestones?: Milestone[];
};

export const education: EducationItem[] = data.education;
export const certificates: Certificate[] = data.certificates;
