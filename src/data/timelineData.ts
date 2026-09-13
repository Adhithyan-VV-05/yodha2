export interface PhaseItem {
  id: number;
  phaseId: string;
  title: string;
  description: string;
}

export const TIMELINE_PHASES: PhaseItem[] = [
  {
    id: 1,
    phaseId: "PHASE 01",
    title: "Online Registration",
    description: "Teams register through the official registration platform."
  },
  {
    id: 2,
    phaseId: "PHASE 02",
    title: "Problem Statement Release & Idea Submission",
    description: "Teams submit their innovative idea based on the provided problem statements."
  },
  {
    id: 3,
    phaseId: "PHASE 03",
    title: "Selection Process",
    description: "Submitted ideas will be evaluated, and selected teams will be shortlisted for the hackathon."
  },
  {
    id: 4,
    phaseId: "PHASE 04",
    title: "Final Registration & Confirmation",
    description: "Selected teams must pay the registration fee to confirm their participation in the 48-hour offline hackathon."
  },
  {
    id: 5,
    phaseId: "PHASE 05",
    title: "48-Hour Offline Hackathon",
    description: "Teams develop their solutions with mentoring, technical guidance, checkpoints, and review sessions."
  },
  {
    id: 6,
    phaseId: "PHASE 06",
    title: "Final Judging & Prize Distribution",
    description: "Teams present their completed projects before the judging panel, followed by the announcement of winners and prize distribution"
  }
];
