// Builds the items for the Journey timeline (Experience, Learning) from the
// site data: parses the free-form dates used in the content files into
// sortable values and display labels.
import type { ExperienceItem, Milestone } from '../data/experience';
import type { EducationItem, Certificate } from '../data/education';
import type { Course } from '../data/learning';
import { withBase } from './url';

export type JourneyKind = 'role' | 'degree' | 'certificate' | 'course';

export type JourneyItem = {
  id: string;
  kind: JourneyKind;
  sort: number; // fractional year, used for ordering + year markers
  year: number;
  when: string; // "Nov 2024 – Today"
  title: string;
  org: string;
  kicker: string; // "Role", "Master's degree", …
  summary?: string;
  bullets: string[];
  tags: string[];
  milestones: { when: string; title: string; href?: string }[];
  thesis?: { title: string; group: string };
  progress?: number;
  href?: string;
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const SEASONS: Record<string, number> = { spring: 4, summer: 7, autumn: 10, fall: 10, winter: 1 };

type Parsed = { y: number; m?: number; now?: boolean } | null;

// "11.2024", "08/2024", "2024", "Summer 2026", "Today"
export function parseDate(raw?: string): Parsed {
  const s = (raw ?? '').trim();
  if (!s) return null;
  if (/^(today|now|present)$/i.test(s)) {
    const d = new Date();
    return { y: d.getFullYear(), m: d.getMonth() + 1, now: true };
  }
  let m = s.match(/^(\d{1,2})[./-](\d{4})$/);
  if (m) return { y: +m[2], m: +m[1] };
  m = s.match(/^(spring|summer|autumn|fall|winter)\s+(\d{4})$/i);
  if (m) return { y: +m[2], m: SEASONS[m[1].toLowerCase()] };
  m = s.match(/^(\d{4})$/);
  if (m) return { y: +m[1] };
  return null;
}

const label = (p: Parsed, raw = '') => (!p ? raw : p.now ? 'Today' : p.m ? `${MONTHS[p.m - 1]} ${p.y}` : String(p.y));
// year-only dates sort mid-year
const value = (p: Parsed) => (!p ? 0 : p.y + ((p.m ?? 6.5) - 1) / 12);
const range = (a: string, b?: string) => {
  const pa = parseDate(a);
  const pb = parseDate(b);
  return pb ? `${label(pa, a)} – ${label(pb, b)}` : label(pa, a);
};

const href = (link?: string) => (!link ? undefined : link.startsWith('/') ? withBase(link) : link);
const milestones = (list: Milestone[] = []) =>
  list.filter((m) => m.title).map((m) => ({ when: label(parseDate(m.date), m.date), title: m.title, href: href(m.link) }));

const byNewest = (a: JourneyItem, b: JourneyItem) => b.sort - a.sort;

export function experienceJourney(items: ExperienceItem[]): JourneyItem[] {
  return items
    .map((e, i) => {
      const start = parseDate(e.start);
      return {
        id: `role-${i}`,
        kind: 'role' as const,
        sort: value(start),
        year: start?.y ?? 0,
        when: range(e.start, e.end),
        title: e.role,
        org: e.org,
        kicker: parseDate(e.end)?.now ? 'Current role' : 'Role',
        bullets: e.bullets,
        tags: e.stack,
        milestones: milestones(e.milestones),
      };
    })
    .sort(byNewest);
}

export function learningJourney(
  degrees: EducationItem[],
  certificates: Certificate[],
  courses: Course[],
  show: { education: boolean; certificates: boolean; courses: boolean }
): JourneyItem[] {
  const out: JourneyItem[] = [];
  if (show.education) {
    degrees.forEach((d, i) => {
      const end = parseDate(d.end);
      out.push({
        id: `degree-${i}`,
        kind: 'degree',
        sort: value(end),
        year: end?.y ?? 0,
        when: range(d.start, d.end),
        title: d.degree,
        org: d.org,
        kicker: /^m\.?\s?sc|master/i.test(d.degree) ? "Master's degree" : /^b\.?\s?sc|bachelor/i.test(d.degree) ? "Bachelor's degree" : 'Degree',
        summary: d.detail,
        bullets: [],
        tags: [],
        thesis: d.thesis?.title ? d.thesis : undefined,
        milestones: milestones(d.milestones),
      });
    });
  }
  if (show.certificates) {
    certificates.forEach((c, i) => {
      const at = parseDate(c.date);
      out.push({
        id: `cert-${i}`,
        kind: 'certificate',
        sort: value(at),
        year: at?.y ?? 0,
        when: label(at, c.date),
        title: c.title,
        org: c.org,
        kicker: 'Certificate',
        summary: c.detail,
        bullets: [],
        tags: [],
        milestones: milestones(c.milestones),
      });
    });
  }
  if (show.courses) {
    courses.forEach((c, i) => {
      const done = c.progress >= 100;
      const at = done ? parseDate(c.completed) : parseDate('today');
      out.push({
        id: `course-${i}`,
        kind: 'course',
        sort: value(at) + (done ? 0 : 0.01), // in-progress first
        year: at?.y ?? 0,
        when: done ? label(at, c.completed) : 'In progress',
        title: c.title,
        org: c.provider,
        kicker: done ? 'Course · completed' : 'Course · in progress',
        bullets: [],
        tags: c.focus,
        milestones: [],
        progress: c.progress,
        href: c.url,
      });
    });
  }
  return out.sort(byNewest);
}
