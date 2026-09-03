export interface ActivityItem {
  id: number;
  time: string;
  title: string;
  description: string;
}

export interface DayItem {
  id: number;
  dayId: string;
  title: string;
  subtitle: string;
  kicker: string;
  highlights: string[];
  activities: ActivityItem[];
}

export const TIMELINE_DAYS: DayItem[] = [
  {
    id: 1,
    dayId: "DAY 01",
    title: "DAY 01",
    subtitle: "Registration & Hackathon Begins",
    kicker: "THE BEGINNING",
    highlights: ["Registration & Check-in", "Inauguration Ceremony", "Hackathon Begins"],
    activities: [
      {
        id: 1,
        time: "12:30 PM – 01:30 PM",
        title: "Registration & Team Check-in",
        description:
          "Warriors arrive at the venue for ID verification, welcome kit distribution, and setting up their dedicated workstations.",
      },
      {
        id: 2,
        time: "02:00 PM – 03:30 PM",
        title: "Inauguration Ceremony",
        description:
          "The official opening of Yodha 2.0, featuring welcome addresses from dignitaries and the Department of Artificial Intelligence and Data Science.",
      },
      {
        id: 3,
        time: "04:00 PM",
        title: "Hackathon Begins",
        description:
          "The 48-hour continuous countdown officially starts! Teams dive straight into coding.",
      },
      {
        id: 4,
        time: "07:00 PM",
        title: "Cultural Event",
        description:
          "High-energy live performances and entertainment to boost morale and shake off early coding fatigue.",
      },
      {
        id: 5,
        time: "08:30 PM",
        title: "Dinner",
        description:
          "A hearty dinner break provided for all participants, mentors, and volunteers to fuel the upcoming night shift.",
      },
      {
        id: 6,
        time: "10:00 PM",
        title: "Checkpoint 1: Concept & Architecture",
        description:
          "Mentors conduct a 15-point evaluation of each team's problem definition, proposed AI strategy, and overall technical feasibility.",
      },
    ],
  },
  {
    id: 2,
    dayId: "DAY 02",
    title: "DAY 02",
    subtitle: "Mentoring & Development",
    kicker: "MENTORING & SPRINT",
    highlights: ["Mentoring Session 1", "Mid-Hack Review", "Solution Validation"],
    activities: [
      {
        id: 1,
        time: "08:30 AM",
        title: "Breakfast",
        description:
          "A fresh morning meal to recharge the warriors after their first full night of coding.",
      },
      {
        id: 2,
        time: "10:00 AM",
        title: "Mentoring Session 1 (Follow-up)",
        description:
          "Hands-on technical debugging, algorithm guidance, and troubleshooting with our expert mentors.",
      },
      {
        id: 3,
        time: "11:00 AM",
        title: "Checkpoint 2: Mid-Hack Review",
        description:
          "A critical 20-point evaluation assessing tangible code progress, core AI model implementation, and effective use of chosen technologies.",
      },
      {
        id: 4,
        time: "01:00 PM",
        title: "Lunch",
        description: "Mid-day refueling break to keep the momentum going.",
      },
      {
        id: 5,
        time: "05:30 PM",
        title: "Mentoring Session 2",
        description:
          "Guidance shifts from pure backend tech to product viability, focusing on UI/UX, industry standards, and target users.",
      },
      {
        id: 6,
        time: "07:00 PM",
        title: "Cultural Event",
        description:
          "Mid-hack unwinding with a second round of cultural entertainment to refresh tired minds.",
      },
      {
        id: 7,
        time: "08:30 PM",
        title: "Dinner",
        description:
          "The final dinner break before the final overnight sprint to the finish line.",
      },
      {
        id: 8,
        time: "10:00 PM",
        title: "Checkpoint 3: Solution Validation",
        description:
          "The final 15-point milestone assessing the prototype's refinement, user experience, scalability, and clear social impact potential.",
      },
    ],
  },
  {
    id: 3,
    dayId: "DAY 03",
    title: "DAY 03",
    subtitle: "Final Presentation & Closing",
    kicker: "THE GRAND FINALE",
    highlights: ["Mentoring Session 3", "Final Pitch Demos", "Prize Distribution"],
    activities: [
      {
        id: 1,
        time: "08:30 AM",
        title: "Breakfast",
        description:
          "The final morning breakfast as teams tie up loose ends and finalize their code.",
      },
      {
        id: 2,
        time: "09:30 AM",
        title: "Mentoring Session 3",
        description:
          "Final polish time! Mentors help teams perfect their pitch decks, refine their storytelling, and prepare for live demos.",
      },
      {
        id: 3,
        time: "12:30 PM",
        title: "Lunch",
        description:
          "A quick lunch break right before the high-stakes final presentations begin.",
      },
      {
        id: 4,
        time: "01:30 PM",
        title: "Final Presentation & Live Demos",
        description:
          "Teams pitch their solutions and perform live prototype demonstrations in front of the expert jury panel for the final 50 points.",
      },
      {
        id: 5,
        time: "03:30 PM",
        title: "Prize Distribution & Closing Ceremony",
        description:
          "The grand finale! Announcement of the ultimate winners, distribution of the ₹70,000 prize pool, and the official closing of Yodha 2.0.",
      },
    ],
  },
];

export function getDayById(dayId: number): DayItem | undefined {
  return TIMELINE_DAYS.find((d) => d.id === dayId);
}
