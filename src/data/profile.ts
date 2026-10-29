// Identity, sidebar copy, About paragraphs and social links.
// Content lives in content/profile.json — edit it with the visual editor
// (`npm run dev`, then open /__editor) or by hand.
import data from './content/profile.json';

export type Profile = {
  name: string;
  role: string;
  location: string;
  tagline: string;
  status: string;
  motto: string;
  // About section paragraphs; inline **bold**, *italic*, `code`, [links](url)
  about: string[];
  email: string;
  resumeUrl: string;
  calendlyUrl: string;
  github: string;
  linkedin: string;
};

export type Social = { label: string; url: string; icon: 'github' | 'linkedin' | 'mail' };

export const profile: Profile = data.profile;
export const socials = data.socials as Social[];
