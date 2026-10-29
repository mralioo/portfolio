// Work history, newest first. Content: content/experience.json.
import data from './content/experience.json';

// `date` free-form ("10.2026", "2024" or empty); `link` optional, site-relative or URL
export type Milestone = { date: string; title: string; link?: string };

export type ExperienceItem = {
  role: string;
  org: string;
  start: string;
  end: string; // "Today" for current role
  bullets: string[];
  stack: string[];
  milestones?: Milestone[];
};

export const experience: ExperienceItem[] = data.experience;
