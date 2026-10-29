// "POC → Production" lifecycle stages, stack table and languages.
// Content: content/skills.json.
import data from './content/skills.json';

export type LifecycleIcon = 'lightbulb' | 'database' | 'agents' | 'gauge' | 'rocket';

export type LifecycleStage = {
  step: string;
  title: string;
  short: string; // label under the node in the interactive lifecycle
  icon: LifecycleIcon;
  outcome: string; // "what you get" line
  activities: string; // what happens in this stage
  pitch: string;
  tools: string[];
  persona?: string; // avatar look while this stage is shown
};

export type GroupIcon = 'spark' | 'brain' | 'cloud' | 'code' | 'robot';
export type SkillGroup = { label: string; icon: GroupIcon; blurb: string; items: string[]; persona?: string };

export const lifecycle = data.lifecycle as LifecycleStage[];
// caption on the loop-back arc (Deploy → Discover)
export const lifecycleLoop: string = data.lifecycleLoop;
export const skillGroups = data.skillGroups as SkillGroup[];
export const languages: { label: string; level: number }[] = data.languages;
// avatar look for the Languages tab of the tech-stack explorer
export const languagesPersona: string = data.languagesPersona;
