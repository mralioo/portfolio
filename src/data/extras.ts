// Physical AI lab, hackathons, hobbies, clubs — the "beyond work" sections.

// Current side build — shown as its own "Lab" section.
export const physicalAI = {
  title: 'Robotic arm × Vision-Language-Action models',
  status: 'Building now',
  summary:
    "Designing and building a robotic arm from the motors up, then giving it a brain: embedding VLA models trained with imitation learning from teleoperated demonstrations and refined with reinforcement learning — closing the loop between foundation models and the physical world.",
  tracks: [
    {
      title: 'Learning',
      items: ['Vision-Language-Action (VLA) policies', 'Imitation learning from teleop demos', 'RL fine-tuning', 'Sim-to-real transfer'],
    },
    {
      title: 'Hardware',
      items: ['Arm mechanics & servo actuation', 'Sensors & cameras', 'Power electronics', 'Wiring & PCB prototyping'],
    },
    {
      title: 'Embedded',
      items: ['Microcontroller firmware', 'Motor control loops', 'On-device inference', 'ROS 2 integration'],
    },
  ],
};

export type Hackathon = {
  name: string;
  date: string;
  result?: string;
  project: string;
  summary: string;
  link?: string;
};

export const hackathons: Hackathon[] = [
  {
    name: 'Nebius Build Week × NVIDIA — {Tech: Europe}',
    date: '10.2026 · Berlin',
    result: 'Siemens Mobility track',
    project: 'SupplyGuard',
    summary:
      'With ITUC colleagues, shipped and deployed a Nemotron-powered multi-agent supplier-risk assistant in under 6 hours.',
    link: 'https://github.com/EmilieD8/Track_records',
  },
  {
    name: 'InnoTrans 2026 Hackathon — FACTORY-C × Alstom',
    date: '09.2026 · Berlin',
    result: '🏆 1st place, AI Track',
    project: 'NextMove',
    summary: 'Four-agent system that turns an operator question into a verified railway control-room brief.',
    link: 'https://github.com/mralioo/NextMove',
  },
];

export const pastHackathons = ['Climathon', 'DeepBerlin', 'Bosch IoT Hackathon'];

export const hobbies = [
  {
    title: 'FPV Drone Racing',
    description:
      'Building and piloting drones from scratch, racing first-person-view — a mix of DIY hardware and a technical challenge.',
  },
  {
    title: 'Autonomous RoboCars',
    description:
      'Building and programming small-scale self-driving RC cars; competing at local events like Deep Berlin Robocars.',
  },
  {
    title: 'Running & Karate',
    description: 'Running and karate keep the other half of the brain in shape.',
  },
];

export const clubs = ['Tunisian Space Association', 'Deep Berlin Robocars'];
