// Describes every editable file so the editor can build forms for it.
// Field types:
//   text, textarea, md (inline **bold** / [link](url)), number, bool,
//   select (options), date, image (path + upload), list (one item per line),
//   object (fields), array (of: field, itemTitle: key used as card title,
//   fixed: true = no add/remove, only reorder/edit).
// Add a field here and to the JSON/TS data to make it editable.

const t = (label, help) => ({ type: 'text', label, help });
const ta = (label, help) => ({ type: 'textarea', label, help });
const md = (label, help) => ({ type: 'md', label, help: help ?? 'Supports **bold**, *italic* and [links](https://…).' });
const list = (label, help) => ({ type: 'list', label, help: help ?? 'One per line.' });
const bool = (label, help) => ({ type: 'bool', label, help });
const num = (label, help) => ({ type: 'number', label, help });
const img = (label, help) => ({ type: 'image', label, help });
const obj = (label, fields, help) => ({ type: 'object', label, fields, help });
const arr = (label, of, opts = {}) => ({ type: 'array', label, of, ...opts });
const milestonesField = () =>
  arr(
    'Milestones & achievements',
    obj('Milestone', {
      title: t('Achievement'),
      date: t('Date', 'e.g. 09.2026, 2024, or empty'),
      link: t('Link', 'Optional: /projects/… or https://…'),
    }),
    { itemTitle: 'title', newItem: { title: 'New milestone', date: '', link: '' }, help: 'Shown with a ★ on the timeline, always visible.' }
  );
// avatar looks defined in personas.json (keep in sync when adding one there)
const PERSONAS = ['original', 'researcher', 'engineer', 'minimalist', 'builder', 'illustrated'];
const persona = (label = 'Avatar look') => ({ type: 'select', label, options: PERSONAS, help: 'Which profile photo shows while visitors read this.' });

export const contentFiles = [
  {
    name: 'sections',
    label: 'Sections & layout',
    description: 'Order, show/hide and rename the homepage sections and the smaller blocks inside them.',
    fields: {
      sections: arr(
        'Homepage sections',
        obj('Section', {
          label: t('Nav label', 'Short name in the sidebar nav and the small kicker above the title.'),
          title: t('Heading', 'Big visible title, e.g. "What I bring to the table".'),
          headingStyle: {
            type: 'select',
            label: 'Heading typeface',
            options: ['serif', 'serif-italic', 'grotesk', 'display', 'display-italic', 'mono'],
            help: 'Give neighbouring sections different styles so transitions stand out.',
          },
          visible: bool('Show this section'),
          lead: md('Intro line', 'Optional sentence under the section title. **bold**, [links](…) allowed.'),
          persona: persona(),
        }),
        { itemTitle: 'label', fixed: true, help: 'Drag order with ↑ ↓. Hidden sections disappear from the page and the nav.' }
      ),
      blocks: obj('Blocks inside sections', {
        motto: obj('About → motto quote', { visible: bool('Show') }),
        stack: obj('Skills → tech stack', { title: t('Sub-heading'), kicker: t('Line under it'), visible: bool('Show') }),
        resumeLink: obj('Experience → résumé link', { title: t('Link text'), visible: bool('Show') }),
        githubLink: obj('Projects → GitHub link', { title: t('Link text'), visible: bool('Show') }),
        courses: obj('Learning → courses', { title: t('Heading (optional)'), visible: bool('Show') }),
        education: obj('Learning → education', { title: t('Heading'), visible: bool('Show') }),
        certificates: obj('Learning → certificates', { title: t('Heading'), visible: bool('Show') }),
        allPosts: obj('Writing → all posts link', { title: t('Link text'), visible: bool('Show') }),
      }),
    },
  },
  {
    name: 'personas',
    label: 'Avatar looks',
    description: 'Alternate profile photos. The avatar switches look as visitors move through sections, lifecycle stages and tech tabs (pick looks per section in "Sections & layout" and per stage/tab in "Skills").',
    fields: {
      enabled: bool('Change looks while scrolling', 'Off = always show the first photo.'),
      personas: arr(
        'Looks',
        obj('Look', {
          id: t('Id', `Used by the "Avatar look" fields: ${PERSONAS.join(', ')}. Keep ids stable.`),
          label: t('Caption', 'Shown under your name, e.g. "AI engineer mode".'),
          image: img('Image', 'Square photo, ~320 px. The first look is the default.'),
        }),
        { itemTitle: 'label', newItem: { id: 'new', label: 'New look', image: '' } }
      ),
    },
  },
  {
    name: 'profile',
    label: 'Profile & About',
    description: 'Sidebar (name, role, tagline, buttons), About paragraphs and social links.',
    fields: {
      profile: obj('Profile', {
        name: t('Name'),
        role: t('Role / title'),
        tagline: ta('Tagline'),
        status: t('Status line', 'Green-dot line under the tagline. Empty = hidden.'),
        location: t('Location'),
        about: arr('About paragraphs', md('Paragraph'), { help: 'Each card is one paragraph.' }),
        motto: t('Motto quote'),
        email: t('Email', 'Empty hides the "Get in touch" button.'),
        resumeUrl: img('Résumé PDF', 'Path under public/, e.g. /resume.pdf. Upload a new PDF here. Empty hides the button.'),
        calendlyUrl: t('Calendly URL'),
        github: t('GitHub URL'),
        linkedin: t('LinkedIn URL'),
      }),
      socials: arr(
        'Social icons',
        obj('Social', {
          label: t('Label'),
          url: t('URL', 'mailto:… for email'),
          icon: { type: 'select', label: 'Icon', options: ['github', 'linkedin', 'mail'] },
        }),
        { itemTitle: 'label', newItem: { label: 'New', url: 'https://', icon: 'github' } }
      ),
    },
  },
  {
    name: 'skills',
    label: 'Skills',
    description: 'POC → Production stages, the stack table and languages.',
    fields: {
      lifecycle: arr(
        'POC → Production stages',
        obj('Stage', {
          step: t('Number', 'e.g. 01'),
          title: t('Title'),
          short: t('Short label', 'One word under the node, e.g. Discover.'),
          icon: { type: 'select', label: 'Icon', options: ['lightbulb', 'database', 'agents', 'gauge', 'rocket'] },
          outcome: t('Outcome', 'What a stakeholder gets out of this stage.'),
          activities: t('Activities', 'Short line of what you do.'),
          pitch: ta('Description'),
          tools: list('Tools / tags'),
          persona: persona(),
        }),
        { itemTitle: 'title', newItem: { step: '', title: 'New stage', short: 'New', icon: 'lightbulb', outcome: '', activities: '', pitch: '', tools: [] } }
      ),
      lifecycleLoop: t('Loop-back caption', 'Text on the arc from the last stage back to the first.'),
      skillGroups: arr(
        'Tech stack categories',
        obj('Category', {
          label: t('Tab label'),
          icon: { type: 'select', label: 'Tab icon', options: ['spark', 'brain', 'cloud', 'code', 'robot'] },
          blurb: ta('One-line description'),
          items: list('Technologies', 'One per line. Known tools get their logo automatically; others get an icon or initials.'),
          persona: persona(),
        }),
        { itemTitle: 'label', newItem: { label: 'New category', icon: 'spark', blurb: '', items: [] } }
      ),
      languagesPersona: persona('Avatar look on the Languages tab'),
      languages: arr('Languages', obj('Language', { label: t('Language'), level: num('Level 1–5') }), {
        itemTitle: 'label',
        newItem: { label: '', level: 3 },
      }),
    },
  },
  {
    name: 'experience',
    label: 'Experience',
    description: 'Work history, newest first.',
    fields: {
      experience: arr(
        'Roles',
        obj('Role', {
          role: t('Role'),
          org: t('Company'),
          start: t('Start', 'e.g. 11.2024'),
          end: t('End', 'e.g. Today'),
          bullets: list('Bullet points', 'One bullet per line.'),
          stack: list('Tech tags'),
          milestones: milestonesField(),
        }),
        { itemTitle: 'role', newItem: { role: 'New role', org: '', start: '', end: 'Today', bullets: [], stack: [] } }
      ),
    },
  },
  {
    name: 'education',
    label: 'Education & certificates',
    fields: {
      education: arr(
        'Degrees',
        obj('Degree', {
          degree: t('Degree'),
          org: t('University'),
          start: t('Start'),
          end: t('End'),
          detail: ta('Detail'),
          thesis: obj('Thesis', { title: t('Title'), group: t('Group / lab') }, 'Leave both empty to hide.'),
          milestones: milestonesField(),
        }),
        { itemTitle: 'degree', newItem: { degree: 'New degree', org: '', start: '', end: '', detail: '', thesis: { title: '', group: '' } } }
      ),
      certificates: arr(
        'Certificates',
        obj('Certificate', { title: t('Title'), org: t('Issuer'), date: t('Date', 'e.g. 05/2024 or Summer 2026'), detail: ta('Detail'), milestones: milestonesField() }),
        { itemTitle: 'title', newItem: { title: 'New certificate', org: '', date: '', detail: '' } }
      ),
    },
  },
  {
    name: 'extras',
    label: 'Physical AI lab',
    fields: {
      physicalAI: obj('Physical AI lab', {
        title: t('Title'),
        status: t('Status badge', 'e.g. Building now. Empty = hidden.'),
        summary: ta('Summary'),
        tracks: arr('Columns', obj('Column', { title: t('Heading'), items: list('Items') }), {
          itemTitle: 'title',
          newItem: { title: 'New', items: [] },
        }),
      }),
    },
  },
  {
    name: 'learning',
    label: 'Learning (courses)',
    description: 'Courses with progress bars.',
    fields: {
      courses: arr(
        'Courses',
        obj('Course', {
          title: t('Title'),
          provider: t('Provider'),
          progress: num('Progress %', '0–100. At 100 it shows as Done.'),
          completed: t('Completed', 'e.g. 11/2026'),
          url: t('Course URL'),
          focus: list('Topics'),
        }),
        { itemTitle: 'title', newItem: { title: 'New course', provider: '', progress: 0, completed: '', url: '', focus: [] } }
      ),
    },
  },
];

export const collections = [
  {
    name: 'projects',
    label: 'Projects',
    singular: 'project',
    titleKey: 'title',
    fields: {
      title: t('Title'),
      summary: ta('Summary', 'Shown on the homepage card.'),
      badge: t('Badge', 'e.g. 🏆 1st place · InnoTrans 2026'),
      image: img('Thumbnail', 'Path under public/. Upload or paste e.g. /projects/foo.png'),
      cover: img('Page hero image', 'Optional wide image at the top of the project page. Defaults to the thumbnail.'),
      stack: list('Tech tags'),
      repo: t('GitHub URL'),
      demo: t('Live demo URL'),
      order: num('Order', 'Lower shows first.'),
      draft: bool('Hidden (draft)', 'Keeps the file but removes it from the site.'),
    },
    newItem: { title: 'New project', summary: '', stack: [], order: 100, draft: true },
  },
  {
    name: 'blog',
    label: 'Blog posts',
    singular: 'post',
    titleKey: 'title',
    fields: {
      title: t('Title'),
      description: ta('Description', 'Shown on the blog index and in search results.'),
      date: { type: 'date', label: 'Date' },
      tags: list('Tags'),
      cover: img('Cover image'),
      draft: bool('Draft (hidden)'),
    },
    newItem: { title: 'New post', description: '', date: new Date().toISOString().slice(0, 10), tags: [], draft: true },
  },
];
