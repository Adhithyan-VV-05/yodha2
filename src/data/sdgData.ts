export interface SDGItem {
  id: number;
  numberStr: string;
  title: string;
  description: string;
  side: "left" | "right";
  iconName: "health" | "water" | "industry" | "city" | "climate" | "nature";
}

export const SDG_ITEMS: SDGItem[] = [
  {
    id: 3,
    numberStr: "03",
    title: "Good Health &\nWell-being",
    description: "Ensuring healthy lives and promoting well-being for all.",
    side: "left",
    iconName: "health",
  },
  {
    id: 6,
    numberStr: "06",
    title: "Clean Water &\nSanitation",
    description: "Ensuring availability and sustainable management of water.",
    side: "right",
    iconName: "water",
  },
  {
    id: 9,
    numberStr: "09",
    title: "Industry &\nInnovation",
    description: "Building resilient infrastructure and fostering innovation.",
    side: "right",
    iconName: "industry",
  },
  {
    id: 11,
    numberStr: "11",
    title: "Sustainable\nCities",
    description: "Building inclusive, safe, resilient and sustainable cities.",
    side: "left",
    iconName: "city",
  },
  {
    id: 13,
    numberStr: "13",
    title: "Climate\nAction",
    description: "Taking urgent action to combat climate change.",
    side: "left",
    iconName: "climate",
  },
  {
    id: 15,
    numberStr: "15",
    title: "Life on\nLand",
    description: "Protecting, restoring and promoting sustainable land use.",
    side: "right",
    iconName: "nature",
  },
];

// Sequential order array for 4-second auto-cycle: 3 -> 6 -> 9 -> 11 -> 13 -> 15
export const SDG_SEQUENCE = [3, 6, 9, 11, 13, 15];

export function getNextSdgId(currentId: number): number {
  const currentIndex = SDG_SEQUENCE.indexOf(currentId);
  if (currentIndex === -1) return SDG_SEQUENCE[0];
  const nextIndex = (currentIndex + 1) % SDG_SEQUENCE.length;
  return SDG_SEQUENCE[nextIndex];
}
