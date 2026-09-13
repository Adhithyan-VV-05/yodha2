import { getProblemStatementImage } from "../lib/psImages";

export interface ReadMoreDetails {
  background: string;
  challenge: string;
  objectives: string[];
  constraints: string[];
  expectedOutcome: string;
  innovationScope: string[];
  suggestedTechnologies: string[];
}

export interface ProblemStatement {
  id: number;
  title: string;
  slug: string;
  category: "Healthcare" | "Environmental" | "Environment";
  difficulty: "Easy" | "Medium" | "Hard";
  sdgs: string[];
  tags: string[];
  cardDescription: string;
  image?: string;
  readMore: ReadMoreDetails;
}

export function getPSImage(st: ProblemStatement | { id: number; image?: string }): string {
  return st.image || getProblemStatementImage(st.id);
}

export const HEALTHCARE_PROBLEM_STATEMENTS: ProblemStatement[] = [
  {
    "id": 1,
    "title": "AI Clinical Documentation Assistant",
    "slug": "ai-clinical-documentation-assistant",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": [
      "SDG 3"
    ],
    "tags": [
      "Healthcare",
      "AI"
    ],
    "cardDescription": "Build a system utilizing speech-to-text, LLMs, and structured extraction that intelligently converts a simulated doctor-patient conversation into a structured, professional clinical note.",
    "image": "/ps/PS1_compressed.webp",
    "readMore": {
      "background": "Healthcare professionals spend substantial time documenting consultations, which often takes valuable time away from direct patient interaction and care.",
      "challenge": "Build a system utilizing speech-to-text, LLMs, and structured extraction that intelligently converts a simulated doctor-patient conversation into a structured, professional clinical note.",
      "objectives": [
        "Automatically extract the chief complaint, symptoms, duration, and relevant history from raw conversational audio.",
        "Generate a list of clinical observations and suggested follow-up questions for the doctor.",
        "Provide a seamless interface for the clinician to review and edit all extracted data before it becomes part of the official record."
      ],
      "constraints": [],
      "expectedOutcome": "",
      "innovationScope": [],
      "suggestedTechnologies": []
    }
  },
  {
    "id": 2,
    "title": "Unified Intelligent Personal Healthcare Journey System",
    "slug": "unified-intelligent-personal-healthcare-journey-system",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": [
      "SDG 3"
    ],
    "tags": [
      "Healthcare",
      "AI"
    ],
    "cardDescription": "Build an AI-powered intelligent healthcare journey system that securely collects and organizes patient information from multiple sources into a unified, digital health record.",
    "image": "/ps/PS2_compressed.webp",
    "readMore": {
      "background": "Patients often receive healthcare services from multiple doctors and departments, resulting in fragmented medical records, repeated tests, and confusion about the next steps in their healthcare journey.",
      "challenge": "Build an AI-powered intelligent healthcare journey system that securely collects and organizes patient information from multiple sources into a unified, digital health record.",
      "objectives": [
        "Integrate and organize data from EMRs, laboratory reports, scans, prescriptions, PDFs, and medical images.",
        "Translate complex medical terminology from these documents into an accessible format.",
        "Create a complete, easy-to-understand patient health timeline to help healthcare professionals and patients identify next steps."
      ],
      "constraints": [],
      "expectedOutcome": "",
      "innovationScope": [],
      "suggestedTechnologies": []
    }
  },
  {
    "id": 3,
    "title": "Predicting Alzheimer's Progression from Brain MRI",
    "slug": "predicting-alzheimer's-progression-from-brain-mri",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": [
      "SDG 3"
    ],
    "tags": [
      "Healthcare",
      "AI"
    ],
    "cardDescription": "Build a 3D AI/ML system that analyzes brain MRI scans of patients with MCI to predict whether the patient may develop Alzheimer's within 12, 24, or 36 months.",
    "image": "/ps/PS3_compressed.webp",
    "readMore": {
      "background": "Predicting Alzheimer's progression early is incredibly important to support timely treatment and effective long-term planning for patients experiencing Mild Cognitive Impairment (MCI).",
      "challenge": "Build a 3D AI/ML system that analyzes brain MRI scans of patients with MCI to predict whether the patient may develop Alzheimer's within 12, 24, or 36 months.",
      "objectives": [
        "Analyze physical brain changes, specifically hippocampus shrinkage and brain cortex volume loss.",
        "Correlate the MRI scan data with patient age and cognitive test scores.",
        "Output a clear timeline forecasting the risk and rate of disease progression."
      ],
      "constraints": [],
      "expectedOutcome": "",
      "innovationScope": [],
      "suggestedTechnologies": []
    }
  },
  {
    "id": 4,
    "title": "Early Melanoma Progression & Malignancy Forecasting",
    "slug": "early-melanoma-progression-and-malignancy-forecasting",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": [
      "SDG 3"
    ],
    "tags": [
      "Healthcare",
      "AI"
    ],
    "cardDescription": "Build an AI vision system where patients or doctors can upload time-series photographs of a mole to evaluate visual changes and forecast the risk of malignancy within the next 12 months.",
    "image": "/ps/PS4_compressed.webp",
    "readMore": {
      "background": "Skin cancers such as melanoma often develop subtly from existing or new moles, making visual tracking over time critical yet challenging for patients to monitor manually before clinical evaluation.",
      "challenge": "Build an AI vision system where patients or doctors can upload time-series photographs of a mole to evaluate visual changes and forecast the risk of malignancy within the next 12 months.",
      "objectives": [
        "Analyze chronological image series for changes in shape, border asymmetry, color variations, and structural size.",
        "Predict the statistical risk of the lesion developing into melanoma within the upcoming year.",
        "Flag high-risk cases automatically to advise early biopsy and clinical dermatologist consultation.",
        "Provide visual heatmaps or feature markers highlighting specific regions of concern on the lesion."
      ],
      "constraints": [],
      "expectedOutcome": "",
      "innovationScope": [],
      "suggestedTechnologies": []
    }
  },
  {
    "id": 5,
    "title": "Preventive Healthcare \u2014 Non-Communicable Diseases (NCDs)",
    "slug": "preventive-healthcare-non-communicable-diseases-(ncds)",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": [
      "SDG 3"
    ],
    "tags": [
      "Healthcare",
      "AI"
    ],
    "cardDescription": "Build an AI system that continuously analyzes existing health data (lab history, vitals, lifestyle inputs) to flag NCD risk months in advance and recommend low-cost, actionable interventions before diagnosis becomes necessary.",
    "image": "/ps/PS5_compressed.webp",
    "readMore": {
      "background": "Chronic non-communicable diseases like diabetes and cardiovascular disease are largely preventable, yet most people discover they're at risk only after symptoms appear or during a routine checkup \u2014 by which point early intervention windows have often closed.",
      "challenge": "Build an AI system that continuously analyzes existing health data (lab history, vitals, lifestyle inputs) to flag NCD risk months in advance and recommend low-cost, actionable interventions before diagnosis becomes necessary.",
      "objectives": [
        "Analyze historical lab data and daily vitals to detect early NCD markers.",
        "Predict chronic disease risk trajectory months prior to clinical onset.",
        "Generate personalized, low-cost lifestyle & dietary intervention plans.",
        "Alert healthcare providers when high-risk thresholds are crossed."
      ],
      "constraints": [],
      "expectedOutcome": "",
      "innovationScope": [],
      "suggestedTechnologies": []
    }
  },
  {
    "id": 6,
    "title": "Glaucoma Blindness Progression Mapping via OCT Scans",
    "slug": "glaucoma-blindness-progression-mapping-via-oct-scans",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": [
      "SDG 3"
    ],
    "tags": [
      "Healthcare",
      "AI"
    ],
    "cardDescription": "Develop an AI-powered prediction system using Optical Coherence Tomography (OCT) scans and clinical metrics to track and forecast vision field deterioration over a 24-month horizon.",
    "image": "/ps/PS6_compressed.webp",
    "readMore": {
      "background": "Glaucoma causes progressive, irreversible damage to the optic nerve, often without noticeable symptoms until substantial and permanent vision loss has already taken place.",
      "challenge": "Develop an AI-powered prediction system using Optical Coherence Tomography (OCT) scans and clinical metrics to track and forecast vision field deterioration over a 24-month horizon.",
      "objectives": [
        "Utilize 2D/3D CNN architectures to quantify Retinal Nerve Fiber Layer (RNFL) thickness and identify structural optic nerve damage.",
        "Integrate multimodal patient records, combining OCT scan data, RNFL metrics, and Intraocular Pressure (IOP) readings.",
        "Predict the trajectory and rate of visual field deterioration over the subsequent 24 months.",
        "Generate early risk alerts that assist ophthalmologists in adjusting therapeutic interventions before irreversible blindness occurs."
      ],
      "constraints": [],
      "expectedOutcome": "",
      "innovationScope": [],
      "suggestedTechnologies": []
    }
  },
  {
    "id": 7,
    "title": "Mental Health \u2014 Social Media Addiction & Digital Wellbeing",
    "slug": "mental-health-social-media-addiction-and-digital-wellbeing",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": [
      "SDG 3"
    ],
    "tags": [
      "Healthcare",
      "AI"
    ],
    "cardDescription": "Build an AI digital wellbeing companion that tracks screen time patterns and self-reported emotional states to identify compulsive habits and provide real-time behavioral nudges.",
    "image": "/ps/PS7_compressed.webp",
    "readMore": {
      "background": "Excessive and compulsive digital consumption increasingly degrades mental health, sleep quality, and focus, yet individuals often fail to recognize unhealthy digital habits as they form.",
      "challenge": "Build an AI digital wellbeing companion that tracks screen time patterns and self-reported emotional states to identify compulsive habits and provide real-time behavioral nudges.",
      "objectives": [
        "Monitor continuous device metrics including app categories, screen duration, notification response cycles, and late-night usage triggers.",
        "Analyze sentiment from self-reported mood logs alongside digital activity to detect correlations between usage spikes and emotional decline.",
        "Identify early markers of compulsive digital dependency and doomscrolling routines.",
        "Deliver personalized, contextual micro-interventions and mindful pauses to promote healthy digital habits."
      ],
      "constraints": [],
      "expectedOutcome": "",
      "innovationScope": [],
      "suggestedTechnologies": []
    }
  },
  {
    "id": 8,
    "title": "Pharmaceutical Distribution \u2014 Medicine Expiry & Waste Management",
    "slug": "pharmaceutical-distribution-medicine-expiry-and-waste-management",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": [
      "SDG 3"
    ],
    "tags": [
      "Healthcare",
      "AI"
    ],
    "cardDescription": "Design an intelligent inventory and logistics model that analyzes pharmaceutical stock levels, shelf lives, and regional consumption trends to minimize drug wastage and optimize redistribution.",
    "image": "/ps/PS8_compressed.webp",
    "readMore": {
      "background": "Inefficient inventory oversight causes massive quantities of critical medications to expire on shelves, resulting in financial loss and supply shortages in surrounding clinics.",
      "challenge": "Design an intelligent inventory and logistics model that analyzes pharmaceutical stock levels, shelf lives, and regional consumption trends to minimize drug wastage and optimize redistribution.",
      "objectives": [
        "Track batch-level expiry timelines, baseline stock levels, and consumption velocities across distributed pharmacies.",
        "Predict which specific medication batches are at imminent risk of expiring unutilized.",
        "Generate dynamic inter-facility transfer recommendations to route near-expiry supplies to high-demand facilities.",
        "Optimize reorder thresholds and purchasing volumes based on seasonal and regional demand forecasting."
      ],
      "constraints": [],
      "expectedOutcome": "",
      "innovationScope": [],
      "suggestedTechnologies": []
    }
  },
  {
    "id": 9,
    "title": "AI-Powered Personnel Wellbeing & Stress Prediction System",
    "slug": "ai-powered-personnel-wellbeing-and-stress-prediction-system",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": [
      "SDG 3"
    ],
    "tags": [
      "Healthcare",
      "AI"
    ],
    "cardDescription": "Construct a non-invasive, privacy-preserving AI system that monitors work schedules, workload fluctuations, and voluntary lifestyle indicators to flag rising burnout risks well before crisis point.",
    "image": "/ps/PS9_compressed.webp",
    "readMore": {
      "background": "Workplace stress and professional burnout severely impact individual health and organizational productivity, yet indicators are routinely identified only after severe exhaustion or turnover takes place.",
      "challenge": "Construct a non-invasive, privacy-preserving AI system that monitors work schedules, workload fluctuations, and voluntary lifestyle indicators to flag rising burnout risks well before crisis point.",
      "objectives": [
        "Analyze workload trends, meeting densities, communication volume, and after-hours work patterns.",
        "Securely process optional biometric indicators such as resting heart rate trends, sleep duration, and daily step counts.",
        "Correlate passive indicators with periodic voluntary wellbeing self-assessments.",
        "Provide anonymous, aggregated team wellness insights for leadership alongside private coping recommendations for individuals."
      ],
      "constraints": [],
      "expectedOutcome": "",
      "innovationScope": [],
      "suggestedTechnologies": []
    }
  },
  {
    "id": 10,
    "title": "Smart Post-Discharge Care",
    "slug": "smart-post-discharge-care",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": [
      "SDG 3"
    ],
    "tags": [
      "Healthcare",
      "AI"
    ],
    "cardDescription": "Build an AI-powered personalized post-discharge care assistant that helps patients safely and confidently manage their recovery at home to reduce preventable readmissions.",
    "image": "/ps/PS10_compressed.webp",
    "readMore": {
      "background": "After leaving the hospital, patients are often confused about their recovery process, unsure if symptoms like pain or fever are normal, and struggle to manage new medication schedules and follow-up appointments.",
      "challenge": "Build an AI-powered personalized post-discharge care assistant that helps patients safely and confidently manage their recovery at home to reduce preventable readmissions.",
      "objectives": [
        "Track daily symptoms and recovery progress while providing medication and follow-up reminders.",
        "Identify critical warning signs based on the patient's specific condition and discharge instructions.",
        "Provide simple, actionable guidance on when to monitor symptoms at home versus when to seek immediate medical care.",
        "Automatically alert a designated caregiver or healthcare professional when concerning health changes are detected."
      ],
      "constraints": [],
      "expectedOutcome": "",
      "innovationScope": [],
      "suggestedTechnologies": []
    }
  },
  {
    "id": 11,
    "title": "Predictive Hospital Flow Management System",
    "slug": "predictive-hospital-flow-management-system",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": [
      "SDG 3"
    ],
    "tags": [
      "Healthcare",
      "AI"
    ],
    "cardDescription": "Build an AI-powered hospital flow system that accurately predicts expected discharge dates and helps care teams optimize bed availability without ever compromising patient care.",
    "image": "/ps/PS11_compressed.webp",
    "readMore": {
      "background": "Hospital beds are often occupied longer than medically necessary due to delayed investigations, incomplete documentation, administrative bottlenecks, and poor coordination between different departments.",
      "challenge": "Build an AI-powered hospital flow system that accurately predicts expected discharge dates and helps care teams optimize bed availability without ever compromising patient care.",
      "objectives": [
        "Analyze patient data to forecast expected discharge timelines upon admission.",
        "Identify and flag potential administrative or investigative delays early in the patient's stay.",
        "Track pending tasks across various hospital departments to streamline coordination.",
        "Optimize overall bed turnover rates and improve emergency room admission workflows."
      ],
      "constraints": [],
      "expectedOutcome": "",
      "innovationScope": [],
      "suggestedTechnologies": []
    }
  },
  {
    "id": 12,
    "title": "AI-Powered Sepsis Early Warning System",
    "slug": "ai-powered-sepsis-early-warning-system",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": [
      "SDG 3"
    ],
    "tags": [
      "Healthcare",
      "AI"
    ],
    "cardDescription": "Build an AI system that continuously monitors vital signs and laboratory data in real-time to detect early sepsis patterns hours before severe clinical deterioration occurs.",
    "image": "/ps/PS12_compressed.webp",
    "readMore": {
      "background": "Sepsis progresses rapidly and is a leading cause of preventable ICU deaths, yet its early symptoms (such as mild fever, slight confusion, or an elevated heart rate) are often subtle and easily overlooked amid other clinical priorities.",
      "challenge": "Build an AI system that continuously monitors vital signs and laboratory data in real-time to detect early sepsis patterns hours before severe clinical deterioration occurs.",
      "objectives": [
        "Continuously ingest and analyze real-time vital signs, nursing notes, and lab values like lactate and WBC count.",
        "Detect subtle, complex patterns indicative of sepsis onset hours before they become clinically obvious.",
        "Alert care teams immediately with a calculated risk score.",
        "Suggest immediate clinical interventions based on the detected data."
      ],
      "constraints": [],
      "expectedOutcome": "",
      "innovationScope": [],
      "suggestedTechnologies": []
    }
  },
  {
    "id": 13,
    "title": "AI-Powered Personalized Health, Diet & Exercise Assistant",
    "slug": "ai-powered-personalized-health-diet-and-exercise-assistant",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": [
      "SDG 3"
    ],
    "tags": [
      "Healthcare",
      "AI"
    ],
    "cardDescription": "Build an AI-powered personalized health assistant that analyzes a patient's complex medical history, existing diseases, and medications to provide safe, highly tailored diet and exercise recommendations.",
    "image": "/ps/PS13_compressed.webp",
    "readMore": {
      "background": "Patients managing multiple diseases face immense difficulty handling their daily health, as a diet or exercise recommendation perfectly suitable for one health condition might be harmful to another.",
      "challenge": "Build an AI-powered personalized health assistant that analyzes a patient's complex medical history, existing diseases, and medications to provide safe, highly tailored diet and exercise recommendations.",
      "objectives": [
        "Cross-reference multiple health conditions to ensure lifestyle recommendations do not conflict with existing diseases or medications.",
        "Generate safe, personalized daily diet and exercise routines.",
        "Provide proactive medication reminders and track daily health adherence.",
        "Offer real-time alerts when tracked lifestyle changes or symptoms require professional medical attention."
      ],
      "constraints": [],
      "expectedOutcome": "",
      "innovationScope": [],
      "suggestedTechnologies": []
    }
  },
  {
    "id": 14,
    "title": "Medical Equipment Tracking",
    "slug": "medical-equipment-tracking",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": [
      "SDG 3"
    ],
    "tags": [
      "Healthcare",
      "AI"
    ],
    "cardDescription": "Develop a robust tracking system that continuously monitors the real-time availability, physical location, and operational status of critical hospital equipment.",
    "image": "/ps/PS14_compressed.webp",
    "readMore": {
      "background": "Hospitals frequently struggle to locate essential movable medical equipment quickly during emergencies, leading to delayed patient care, staff frustration, and inefficient resource utilization.",
      "challenge": "Develop a robust tracking system that continuously monitors the real-time availability, physical location, and operational status of critical hospital equipment.",
      "objectives": [
        "Map the real-time location of movable medical assets across different hospital floors and departments.",
        "Display the current usage status of equipment (e.g., available, in-use, out for maintenance).",
        "Provide an intuitive, searchable dashboard for hospital staff to quickly locate urgently needed tools."
      ],
      "constraints": [],
      "expectedOutcome": "",
      "innovationScope": [],
      "suggestedTechnologies": []
    }
  },
  {
    "id": 15,
    "title": "Blood Availability Network",
    "slug": "blood-availability-network",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": [
      "SDG 3"
    ],
    "tags": [
      "Healthcare",
      "AI"
    ],
    "cardDescription": "Create an intelligent network platform designed to instantly match urgent blood requirements with nearby eligible donors and available blood bank inventories.",
    "image": "/ps/PS15_compressed.webp",
    "readMore": {
      "background": "During severe medical emergencies, finding specific blood types quickly is a life-or-death challenge, and miscommunication between blood banks, hospitals, and donors costs valuable time.",
      "challenge": "Create an intelligent network platform designed to instantly match urgent blood requirements with nearby eligible donors and available blood bank inventories.",
      "objectives": [
        "Aggregate and display real-time blood inventory data from local hospitals and regional blood banks.",
        "Instantly notify nearby, registered, and eligible donors of urgent blood shortages matching their blood type.",
        "Route emergency requests automatically to the closest available supply to minimize transit time."
      ],
      "constraints": [],
      "expectedOutcome": "",
      "innovationScope": [],
      "suggestedTechnologies": []
    }
  },
  {
    "id": 16,
    "title": "Healthcare Cost Estimator",
    "slug": "healthcare-cost-estimator",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": [
      "SDG 3"
    ],
    "tags": [
      "Healthcare",
      "AI"
    ],
    "cardDescription": "Build a transparent healthcare cost estimator that provides patients with an easily understandable and highly accurate estimate of out-of-pocket expenses before they undergo planned medical procedures.",
    "image": "/ps/PS16_compressed.webp",
    "readMore": {
      "background": "Patients frequently face unexpected and overwhelming medical bills because they lack clear, upfront transparency regarding the financial impact of their planned procedures and treatments.",
      "challenge": "Build a transparent healthcare cost estimator that provides patients with an easily understandable and highly accurate estimate of out-of-pocket expenses before they undergo planned medical procedures.",
      "objectives": [
        "Analyze procedure codes, insurance coverage details, and standard hospital pricing models.",
        "Generate easy-to-read financial breakdowns so patients understand their exact out-of-pocket liabilities.",
        "Allow users to compare estimated costs across different local healthcare providers to make informed decisions."
      ],
      "constraints": [],
      "expectedOutcome": "",
      "innovationScope": [],
      "suggestedTechnologies": []
    }
  }
];
export const ENVIRONMENTAL_PROBLEM_STATEMENTS: ProblemStatement[] = [];
