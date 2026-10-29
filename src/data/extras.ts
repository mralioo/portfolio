// Physical AI lab content. Content: content/extras.json.
import data from './content/extras.json';

export const physicalAI: {
  title: string;
  status: string;
  summary: string;
  tracks: { title: string; items: string[] }[];
} = data.physicalAI;
