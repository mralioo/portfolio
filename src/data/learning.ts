// "Learning" section courses. Content: content/learning.json.
// `progress` is 0–100 and drives the bar; at 100 add `completed` ("MM/YYYY").
import data from './content/learning.json';

export type Course = {
  title: string;
  provider: string;
  progress: number;
  url?: string;
  completed?: string;
  focus: string[];
};

export const courses: Course[] = data.courses;
