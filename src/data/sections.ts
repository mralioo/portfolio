// Homepage section order, nav labels and visibility, plus show/hide and
// titles for the smaller blocks inside sections. Content: content/sections.json.
import data from './content/sections.json';

export type SectionId = 'about' | 'skills' | 'experience' | 'projects' | 'lab' | 'learning' | 'writing';
// typeface treatment of the section header (see .sec-head in global.css)
export type HeadingStyle = 'serif' | 'serif-italic' | 'grotesk' | 'display' | 'display-italic' | 'mono';
export type Section = {
  id: SectionId;
  label: string; // nav label + small kicker above the title
  title: string; // big visible heading
  headingStyle: HeadingStyle;
  visible: boolean;
  lead: string;
  persona?: string;
};
export type Block = { title: string; visible: boolean; kicker?: string };

export const sections = data.sections as Section[];
export const blocks: Record<keyof typeof data.blocks, Block> = data.blocks;
