// Avatar "personas": alternate AI-generated looks of the profile photo.
// The avatar switches look depending on what the visitor is reading:
// each homepage section, POC→Production stage and tech-stack tab names a
// persona id (see sections.json / skills.json). Content: content/personas.json.
import data from './content/personas.json';

export type Persona = { id: string; label: string; image: string };

export const personas: Persona[] = data.personas;
export const personasEnabled: boolean = data.enabled;
