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

export interface ProblemStatementStyle {
  id: number;
  theme: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  border: string;
  heading: string;
  content: string;
  button: string;
  buttonHover: string;
  glow: string;
}

// ------------------------------------------------------------------------------
// HEALTHCARE AI PROBLEM STATEMENTS (IDs 1 to 16)
// ------------------------------------------------------------------------------
export const HEALTHCARE_PROBLEM_STATEMENTS: ProblemStatement[] = [
  // IDs 1 to 8 (User-Specified Problem Statements)
  {
    "id": 1,
    "title": "Preventive Healthcare — Non-Communicable Diseases (NCDs)",
    "slug": "preventive-healthcare-ncds",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": ["SDG 3", "SDG 10"],
    "tags": ["Preventive Care", "NCDs", "Predictive AI", "Healthcare Analytics"],
    "cardDescription": "Chronic non-communicable diseases like diabetes and cardiovascular disease are largely preventable, yet most people discover they're at risk only after symptoms appear or during a routine checkup — by which point early intervention windows have often closed. Build an AI system that continuously analyzes existing health data (lab history, vitals, lifestyle inputs) to flag NCD risk months in advance and recommend low-cost, actionable interventions before diagnosis becomes necessary.",
    "image": "/ps/p1.webp",
    "readMore": {
      "background": "Chronic non-communicable diseases like diabetes and cardiovascular disease are largely preventable, yet most people discover they're at risk only after symptoms appear or during a routine checkup — by which point early intervention windows have often closed.",
      "challenge": "Build an AI system that continuously analyzes existing health data (lab history, vitals, lifestyle inputs) to flag NCD risk months in advance and recommend low-cost, actionable interventions before diagnosis becomes necessary.",
      "objectives": [
        "Analyze historical lab data and daily vitals to detect early NCD markers",
        "Predict chronic disease risk trajectory months prior to clinical onset",
        "Generate personalized, low-cost lifestyle & dietary intervention plans",
        "Alert healthcare providers when high-risk thresholds are crossed"
      ],
      "constraints": [
        "Must operate securely with anonymized EHR and patient vitals",
        "Interventions must be evidence-backed and safe",
        "Model outputs must provide transparent risk factor explanations"
      ],
      "expectedOutcome": "An AI early warning platform for non-communicable disease prevention.",
      "innovationScope": ["Predictive Risk Modeling", "Longitudinal Health Analytics", "Actionable Prevention Nudges"],
      "suggestedTechnologies": ["Python", "PyTorch", "FastAPI", "React", "Firebase"]
    }
  },
  {
    "id": 2,
    "title": "Mental Health — Social Media Addiction & Digital Wellbeing",
    "slug": "mental-health-digital-wellbeing",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": ["SDG 3"],
    "tags": ["Mental Health", "Digital Wellbeing", "Behavioral AI", "Habit Tracking"],
    "cardDescription": "Social media platforms are algorithmically optimized for engagement, not wellbeing, leading to compulsive usage patterns, anxiety, and declining mental health — especially among young users who lack tools to recognize their own addictive usage patterns. Build an AI companion that monitors a user's digital behavior (screen time, usage triggers, mood self-reports) and delivers personalized, real-time nudges and interventions to reduce compulsive use and measurably improve self-reported happiness and wellbeing.",
    "image": "/ps/p2.webp",
    "readMore": {
      "background": "Social media platforms are algorithmically optimized for engagement, not wellbeing, leading to compulsive usage patterns, anxiety, and declining mental health — especially among young users who lack tools to recognize their own addictive usage patterns.",
      "challenge": "Build an AI companion that monitors a user's digital behavior (screen time, usage triggers, mood self-reports) and delivers personalized, real-time nudges and interventions to reduce compulsive use and measurably improve self-reported happiness and wellbeing.",
      "objectives": [
        "Detect compulsive app usage patterns and emotional triggers in real-time",
        "Deliver personalized, empathetic micro-interventions and mindfulness nudges",
        "Track longitudinal self-reported mood, sleep quality, and mental wellbeing",
        "Provide actionable digital habits analytics and weekly progress insights"
      ],
      "constraints": [
        "Must prioritize complete user privacy (on-device or encrypted data)",
        "Nudges must be supportive and non-intrusive",
        "Must comply with digital mental health safety guidelines"
      ],
      "expectedOutcome": "An intelligent digital wellbeing coach reducing compulsive screen time and improving mental health.",
      "innovationScope": ["On-Device Behavioral Analytics", "Real-Time Nudge Engines", "Empathetic AI Conversational Design"],
      "suggestedTechnologies": ["React Native", "Python", "TensorFlow Lite", "FastAPI"]
    }
  },
  {
    "id": 3,
    "title": "Pharmaceutical Distribution — Medicine Expiry & Waste Management",
    "slug": "pharmaceutical-distribution-waste-management",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": ["SDG 3", "SDG 12"],
    "tags": ["Supply Chain", "Pharma", "Waste Reduction", "Demand Forecasting"],
    "cardDescription": "A significant share of medicines in pharmacies, hospitals, and distribution warehouses expire unused due to poor demand forecasting, inefficient stock rotation, and lack of real-time visibility across the supply chain — resulting in financial loss and waste of usable medicine that could have reached patients in need. Build an AI-driven inventory and demand-forecasting system that predicts expiry risk at the SKU level, recommends redistribution to locations with active demand, and optimizes restocking to minimize waste across the pharmaceutical supply chain.",
    "image": "/ps/p3.webp",
    "readMore": {
      "background": "A significant share of medicines in pharmacies, hospitals, and distribution warehouses expire unused due to poor demand forecasting, inefficient stock rotation, and lack of real-time visibility across the supply chain — resulting in financial loss and waste of usable medicine that could have reached patients in need.",
      "challenge": "Build an AI-driven inventory and demand-forecasting system that predicts expiry risk at the SKU level, recommends redistribution to locations with active demand, and optimizes restocking to minimize waste across the pharmaceutical supply chain.",
      "objectives": [
        "Predict batch and SKU-level drug expiration risks up to 6 months in advance",
        "Optimize inter-pharmacy and regional hospital inventory redistribution routes",
        "Forecast local clinical demand dynamically using seasonal disease trends",
        "Divert usable near-expiry medicine to high-demand relief sectors"
      ],
      "constraints": [
        "Must integrate with standard pharmacy inventory management systems",
        "Redistribution routes must maintain cold-chain safety regulations",
        "Forecasts must handle supply chain volatility and lead times"
      ],
      "expectedOutcome": "An end-to-end pharmaceutical supply chain intelligence platform eliminating drug waste.",
      "innovationScope": ["SKU Expiry Predictive Analytics", "Dynamic Inventory Redistribution Routing", "Demand Forecasting"],
      "suggestedTechnologies": ["Python", "XGBoost", "FastAPI", "React", "PostgreSQL"]
    }
  },
  {
    "id": 4,
    "title": "Preventive Healthcare — Maternal & Postnatal Risk Monitoring",
    "slug": "maternal-postnatal-risk-monitoring",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": ["SDG 3", "SDG 10"],
    "tags": ["Maternal Health", "Remote Care", "Risk Stratification", "Clinical AI"],
    "cardDescription": "High-risk pregnancies often go undetected until complications like preeclampsia or gestational diabetes become severe, particularly in areas with limited access to frequent prenatal checkups. Build an AI system that uses routine prenatal data (vitals, past pregnancy history, basic lab results) combined with simple at-home inputs to flag high-risk pregnancies early and route patients to timely specialist care before complications become emergencies.",
    "image": "/ps/p4.webp",
    "readMore": {
      "background": "High-risk pregnancies often go undetected until complications like preeclampsia or gestational diabetes become severe, particularly in areas with limited access to frequent prenatal checkups.",
      "challenge": "Build an AI system that uses routine prenatal data (vitals, past pregnancy history, basic lab results) combined with simple at-home inputs to flag high-risk pregnancies early and route patients to timely specialist care before complications become emergencies.",
      "objectives": [
        "Detect early indicators of preeclampsia, gestational diabetes, and fetal risk",
        "Analyze simple patient-entered at-home vitals and clinical lab markers",
        "Automate triage scoring and route high-risk expectant mothers to specialists",
        "Provide accessible multi-lingual maternal health guidance"
      ],
      "constraints": [
        "Must function with sparse or low-cost diagnostic inputs",
        "Triage logic must adhere to maternal healthcare protocols",
        "Must maintain high sensitivity to avoid false negatives"
      ],
      "expectedOutcome": "An early maternal risk monitoring and specialist triage assistant safeguarding mothers and infants.",
      "innovationScope": ["Clinical Triage Algorithms", "Sparse Data Risk Classification", "Remote Maternal Care"],
      "suggestedTechnologies": ["Python", "Scikit-Learn", "FastAPI", "React", "Twilio / WhatsApp API"]
    }
  },
  {
    "id": 5,
    "title": "Medication Adherence Chatbot",
    "slug": "medication-adherence-chatbot",
    "category": "Healthcare",
    "difficulty": "Easy",
    "sdgs": ["SDG 3"],
    "tags": ["Conversational AI", "Patient Adherence", "Chatbot", "Chronic Care"],
    "cardDescription": "Patients on long-term medication (for hypertension, diabetes, etc.) often skip doses or stop early without telling their doctor, leading to preventable complications, and most reminder apps are generic and easily ignored. Build an AI chatbot that sends personalized, conversational medication reminders via text/WhatsApp, asks simple daily check-in questions, detects patterns of missed doses from user replies, and nudges patients or alerts a caregiver before a health setback occurs.",
    "image": "/ps/p5.webp",
    "readMore": {
      "background": "Patients on long-term medication (for hypertension, diabetes, etc.) often skip doses or stop early without telling their doctor, leading to preventable complications, and most reminder apps are generic and easily ignored.",
      "challenge": "Build an AI chatbot that sends personalized, conversational medication reminders via text/WhatsApp, asks simple daily check-in questions, detects patterns of missed doses from user replies, and nudges patients or alerts a caregiver before a health setback occurs.",
      "objectives": [
        "Send context-aware, non-repetitive medication reminders via text/WhatsApp",
        "Engage patients in natural daily check-ins regarding dosage and side-effects",
        "Analyze reply patterns to detect adherence degradation early",
        "Escalate unresolved missed dose streaks to family caregivers or clinicians"
      ],
      "constraints": [
        "Must support natural conversational language understanding",
        "Must respect patient messaging channel preferences and consent",
        "Caregiver alerts must trigger reliably upon non-response thresholds"
      ],
      "expectedOutcome": "A smart conversational medication adherence assistant reducing missed doses.",
      "innovationScope": ["Conversational Nudge Design", "Adherence Pattern Detection", "Multi-Channel Messaging AI"],
      "suggestedTechnologies": ["Node.js / Python", "WhatsApp Cloud API", "Gemini / OpenAI API", "React"]
    }
  },
  {
    "id": 6,
    "title": "Conversational Adherence Coach",
    "slug": "conversational-adherence-coach",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": ["SDG 3"],
    "tags": ["Behavioral Change", "Voice/Chat AI", "Preventive Care", "Health Literacy"],
    "cardDescription": "Patients who receive a preventive-care risk flag (e.g., pre-diabetic, high cardiovascular risk) frequently don't follow through on recommended lifestyle changes or screenings, and generic reminder apps get ignored. Build an AI conversational agent (chat/voice) that personalizes follow-up nudges based on a patient's stated barriers, past adherence behavior, and health literacy level, and measurably increases screening/appointment follow-through.",
    "image": "/ps/p6.webp",
    "readMore": {
      "background": "Patients who receive a preventive-care risk flag (e.g., pre-diabetic, high cardiovascular risk) frequently don't follow through on recommended lifestyle changes or screenings, and generic reminder apps get ignored.",
      "challenge": "Build an AI conversational agent (chat/voice) that personalizes follow-up nudges based on a patient's stated barriers, past adherence behavior, and health literacy level, and measurably increases screening/appointment follow-through.",
      "objectives": [
        "Identify patient-specific barriers (cost, anxiety, transportation, literacy)",
        "Tailor motivational follow-up dialogs to match patient literacy level",
        "Automate appointment scheduling and screening check-in reminders",
        "Measure and optimize patient screening compliance over time"
      ],
      "constraints": [
        "Conversational tone must be empathetic and non-judgmental",
        "Must adapt language complexity to low health-literacy users",
        "Must maintain clinical accuracy regarding screening urgency"
      ],
      "expectedOutcome": "An empathetic conversational coach driving high screening and lifestyle follow-through rates.",
      "innovationScope": ["Behavioral Motivation AI", "Health Literacy Translation", "Personalized Conversational Flows"],
      "suggestedTechnologies": ["Python", "FastAPI", "Web Speech API / ElevenLabs", "React", "Gemini"]
    }
  },
  {
    "id": 7,
    "title": "Health Checkup Report Explainer",
    "slug": "health-checkup-report-explainer",
    "category": "Healthcare",
    "difficulty": "Easy",
    "sdgs": ["SDG 3"],
    "tags": ["OCR", "Medical Report Parsing", "Plain Language AI", "Health Literacy"],
    "cardDescription": "Most people get an annual health checkup report full of numbers (cholesterol, HbA1c, vitamin levels) but have no idea what any of it actually means for their health, so the report just gets filed away and ignored. Build an AI tool that takes a photo/PDF of any lab report and explains each value in plain language — what's normal, what's borderline, and what simple lifestyle change could fix it.",
    "image": "/ps/p7.webp",
    "readMore": {
      "background": "Most people get an annual health checkup report full of numbers (cholesterol, HbA1c, vitamin levels) but have no idea what any of it actually means for their health, so the report just gets filed away and ignored.",
      "challenge": "Build an AI tool that takes a photo/PDF of any lab report and explains each value in plain language — what's normal, what's borderline, and what simple lifestyle change could fix it.",
      "objectives": [
        "Extract clinical lab metrics automatically from images and PDFs using OCR",
        "Translate complex biomarkers (HbA1c, Lipid profile, CBC) into layman terms",
        "Categorize metrics clearly into Normal, Borderline, and Attention Required",
        "Provide safe, low-cost lifestyle, dietary, and exercise recommendations"
      ],
      "constraints": [
        "Must explicitly disclaim that it does not provide formal medical diagnosis",
        "OCR parsing must handle distorted photos and varied lab layouts",
        "Explanations must be easy to read for non-medical users"
      ],
      "expectedOutcome": "An instant medical lab report explainer making health diagnostic data accessible to everyone.",
      "innovationScope": ["Document OCR Parsing", "Medical Biomarker Interpretation", "Plain-Language Translation"],
      "suggestedTechnologies": ["Tesseract OCR / Vision API", "Python", "FastAPI", "React", "Gemini AI"]
    }
  },
  {
    "id": 8,
    "title": "Personal Health Digital Twin for Lifestyle & Medication",
    "slug": "personal-health-digital-twin",
    "category": "Healthcare",
    "difficulty": "Hard",
    "sdgs": ["SDG 3", "SDG 9"],
    "tags": ["Digital Twin", "Predictive Simulation", "Personalized Medicine", "Biometrics"],
    "cardDescription": "Doctors prescribe medications through trial-and-error, and patients get generic lifestyle advice — both without knowing how that specific patient's body will actually respond. Build an AI-powered Personal Health Digital Twin, built from a patient's existing health data and similar-patient outcomes, that simulates the likely impact of a lifestyle change or medication choice before it's tried — helping doctors prescribe smarter and patients stay motivated to change.",
    "image": "/ps/p8.webp",
    "readMore": {
      "background": "Doctors prescribe medications through trial-and-error, and patients get generic lifestyle advice — both without knowing how that specific patient's body will actually respond.",
      "challenge": "Build an AI-powered Personal Health Digital Twin, built from a patient's existing health data and similar-patient outcomes, that simulates the likely impact of a lifestyle change or medication choice before it's tried — helping doctors prescribe smarter and patients stay motivated to change.",
      "objectives": [
        "Construct a virtual biophysical digital twin using patient EHR and vitals",
        "Simulate glycemic, blood pressure, and weight responses to candidate treatments",
        "Compare simulated patient outcomes against cohort synthetic trajectories",
        "Empower clinicians with predictive efficacy insights prior to prescription"
      ],
      "constraints": [
        "Must handle missing or noisy longitudinal patient biometric feeds",
        "Simulations must provide confidence ranges and clinical rationale",
        "Must strictly enforce patient biometric data security and privacy"
      ],
      "expectedOutcome": "A biophysical digital twin engine optimizing treatment selection and patient lifestyle motivation.",
      "innovationScope": ["Personal Biophysical Digital Twins", "Cohort Outcome Simulation", "Predictive Clinical Modeling"],
      "suggestedTechnologies": ["PyTorch", "Python", "FastAPI", "Three.js / Canvas", "React"]
    }
  },

  // IDs 9 to 16 (Selected Problem Statements from Existing Repository Set)
  {
    "id": 9,
    "title": "Accelerating Drug Discovery",
    "slug": "accelerating-drug-discovery",
    "category": "Healthcare",
    "difficulty": "Hard",
    "sdgs": ["SDG 3", "SDG 9"],
    "tags": ["Drug Discovery", "AI", "Bioinformatics", "Pharma"],
    "cardDescription": "Build AI tools to identify promising drug candidates, predict protein-ligand binding affinity, and accelerate the research pipeline.",
    "readMore": {
      "background": "Traditional pharmaceutical drug discovery takes over a decade and billions of dollars to identify viable lead compounds.",
      "challenge": "Build a computational molecular AI engine that predicts target protein-ligand binding affinity, screens virtual chemical libraries, and predicts ADMET toxicity profiles.",
      "objectives": [
        "Accelerate virtual lead compound screening from months to days",
        "Predict molecular binding affinity and toxicity early",
        "Reduce wet-lab trial costs and drug development timelines",
        "Identify novel therapeutic candidates for emerging pathogens"
      ],
      "constraints": [
        "Must handle complex SMILES molecular structures",
        "Must adhere to chemical informatics standards",
        "Predictions must cite molecular docking physics benchmarks"
      ],
      "expectedOutcome": "An AI bioinformatics platform accelerating early-stage drug discovery.",
      "innovationScope": ["Graph Neural Networks", "Molecular Docking AI", "Pharma Informatics"],
      "suggestedTechnologies": ["RDKit", "PyTorch Geometric", "FastAPI", "React"]
    }
  },
  {
    "id": 10,
    "title": "Outbreak Prediction & Epidemic Surveillance",
    "slug": "outbreak-prediction",
    "category": "Healthcare",
    "difficulty": "Easy",
    "sdgs": ["SDG 3", "SDG 11"],
    "tags": ["Public Health", "AI", "Epidemiology", "Surveillance"],
    "cardDescription": "Develop models to predict and prevent disease outbreaks using population, mobility, and environmental data.",
    "readMore": {
      "background": "Infectious disease outbreaks spread rapidly before traditional public health reporting catches up.",
      "challenge": "Design a public health surveillance platform that analyzes climate data, hospital admission trends, and mobility data to forecast epidemic vector hotspots.",
      "objectives": [
        "Forecast viral and vector-borne outbreak hotspots 14 days early",
        "Improve public health resource allocation",
        "Alert municipal health officers to emerging cluster risks",
        "Provide public preventive safety guidance"
      ],
      "constraints": [
        "Must operate with anonymized aggregate data",
        "Should handle missing regional health feeds",
        "Must prioritize early spatial alerts"
      ],
      "expectedOutcome": "An AI epidemic surveillance system enabling proactive public health containment.",
      "innovationScope": ["Epidemiological AI", "Spatial-Temporal Modeling", "Public Health"],
      "suggestedTechnologies": ["Python", "Prophet", "Leaflet GIS", "React"]
    }
  },
  {
    "id": 11,
    "title": "Assistive AI for Differently-Abled",
    "slug": "assistive-ai-differently-abled",
    "category": "Healthcare",
    "difficulty": "Hard",
    "sdgs": ["SDG 3", "SDG 10"],
    "tags": ["Accessibility", "AI", "Computer Vision", "Assistive Tech"],
    "cardDescription": "Create AI-powered solutions to improve accessibility and independence for differently-abled individuals.",
    "readMore": {
      "background": "Visually impaired, hearing impaired, and mobility impaired individuals encounter daily urban navigation and communication barriers.",
      "challenge": "Develop an integrated multimodal assistive companion utilizing computer vision, real-time spatial scene description, sign language translation, and voice interaction.",
      "objectives": [
        "Empower visually impaired users with real-time audio scene description",
        "Translate sign language gestures into text/speech instantly",
        "Detect obstacle hazards and indoor navigation waypoints",
        "Ensure full hands-free accessibility"
      ],
      "constraints": [
        "Must process camera feeds with sub-second latency",
        "Should operate on mobile or wearable smart glasses",
        "Must prioritize user safety alerts"
      ],
      "expectedOutcome": "An inclusive multimodal assistive AI platform enhancing independence.",
      "innovationScope": ["Multimodal Vision-Language", "Real-Time Gesture Translation", "Accessibility Tech"],
      "suggestedTechnologies": ["MediaPipe", "YOLOv8", "Whisper", "React Native / Web"]
    }
  },
  {
    "id": 12,
    "title": "LifeFlow Hospital Resource Optimization",
    "slug": "lifeflow-resource-optimization",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": ["SDG 3", "SDG 9"],
    "tags": ["Hospital", "Optimization", "AI", "Predictive Analytics"],
    "cardDescription": "Hospitals frequently face sudden shortages of ICU beds, ventilators, and specialist staff. Build an intelligent forecasting system that predicts patient surges and optimizes hospital assets.",
    "readMore": {
      "background": "Fluctuating seasonal admission rates and unexpected epidemic spikes create acute resource shortages in metropolitan hospitals.",
      "challenge": "Develop a predictive hospital operations engine that forecasts bed occupancy, emergency queue lengths, and oxygen supply needs using historical and real-time admission trends.",
      "objectives": [
        "Improve hospital bed turnaround efficiency",
        "Reduce patient wait times in emergency wards",
        "Optimize ICU and ventilator inventory allocation",
        "Support hospital administrators with data-driven staffing insights"
      ],
      "constraints": [
        "Must ingest real-time hospital sensor & admission streams",
        "Should support flexible parameter tuning for hospital size",
        "Must provide transparent forecasting reasoning"
      ],
      "expectedOutcome": "A predictive operations dashboard maximizing hospital capacity utilization.",
      "innovationScope": ["Time-Series Demand Forecasting", "Resource Allocation Algorithms", "Hospital Intelligence"],
      "suggestedTechnologies": ["Python", "Prophet / ARIMA", "FastAPI", "React"]
    }
  },
  {
    "id": 13,
    "title": "BioChain Organ Matching Network",
    "slug": "biochain-organ-matching-network",
    "category": "Healthcare",
    "difficulty": "Hard",
    "sdgs": ["SDG 3", "SDG 10"],
    "tags": ["Organ Transplant", "AI", "Optimization", "Blockchain"],
    "cardDescription": "Organ donation networks face life-critical challenges in donor-recipient matching and cold-chain transport logistics. Build a zero-bias matching engine ensuring fair and ultra-fast allocation.",
    "readMore": {
      "background": "Thousands of end-stage organ failure patients die annually due to inefficient matching algorithms, regional logistical delays, and lack of transparent donor queues.",
      "challenge": "Design an intelligent organ matching platform that calculates multi-factor compatibility (HLA typing, ischemic time, distance, urgency index) and records allocation on an immutable ledger for 100% auditability.",
      "objectives": [
        "Maximize organ-recipient immunological compatibility",
        "Minimize organ ischemic transit time",
        "Ensure 100% transparent and ethical queue allocation",
        "Prevent organ waste due to supply chain failures"
      ],
      "constraints": [
        "Must comply with strict national organ transplant ethics policies",
        "Matching calculations must execute within seconds of donor availability",
        "Must prohibit manual queue tampering"
      ],
      "expectedOutcome": "A secure, AI-powered transplant allocation network ensuring equity and rapid delivery.",
      "innovationScope": ["Multi-Objective Optimization", "Blockchain Ledger Audit", "Transplant Bioinformatics"],
      "suggestedTechnologies": ["Python", "FastAPI", "Solidity / Smart Contracts", "React"]
    }
  },
  {
    "id": 14,
    "title": "WasteSmart Automated Recycler",
    "slug": "wastesmart-automated-recycler",
    "category": "Healthcare",
    "difficulty": "Easy",
    "sdgs": ["SDG 11", "SDG 12"],
    "tags": ["Recycling", "Computer Vision", "AI", "Sustainability"],
    "cardDescription": "Unsegregated municipal and hospital waste contaminates recycling streams. Build an automated computer vision assistant for instant waste material classification.",
    "readMore": {
      "background": "Over 70% of recyclable plastic, glass, and metal is landfilled because manual sorting at public collection points is slow and error-prone.",
      "challenge": "Create a lightweight computer vision app that classifies camera images into plastic, paper, glass, metal, and organic waste, offering disposal guidance.",
      "objectives": [
        "Increase public waste segregation accuracy",
        "Divert recyclable materials from urban landfills",
        "Educate citizens on localized recycling rules",
        "Support smart bin sorting mechanisms"
      ],
      "constraints": [
        "Must run with low latency on mobile or edge devices",
        "Should work under varied lighting and dirty object states",
        "Must maintain high classification accuracy across common packaging"
      ],
      "expectedOutcome": "An accessible AI sorting assistant promoting circular economy habits.",
      "innovationScope": ["Real-time Object Classification", "Mobile Edge Vision", "Circular Economy"],
      "suggestedTechnologies": ["YOLOv8", "TensorFlow.js", "React", "Firebase"]
    }
  },
  {
    "id": 15,
    "title": "AgriSense Crop Health Diagnostics",
    "slug": "agrisense-crop-health-diagnostics",
    "category": "Healthcare",
    "difficulty": "Easy",
    "sdgs": ["SDG 2", "SDG 15"],
    "tags": ["Agriculture", "AI", "Crop Monitoring", "Sustainability"],
    "cardDescription": "Smallholder farmers suffer severe harvest losses from undetected crop fungal infections and nutrient deficiencies. Build an offline-first leaf diagnostic mobile companion.",
    "readMore": {
      "background": "Fungal blights and pest infestations destroy millions of tons of crops before rural agricultural officers can visit remote farms.",
      "challenge": "Develop an AI-powered agricultural mobile app that diagnoses plant diseases from leaf photos and recommends eco-friendly organic remedies.",
      "objectives": [
        "Enable instant crop disease detection in remote fields",
        "Reduce chemical pesticide overuse through targeted organic care",
        "Improve smallholder farm crop yields and food security",
        "Provide localized vernacular language treatment advice"
      ],
      "constraints": [
        "Must function offline without active mobile internet",
        "Model size must remain lightweight (<15MB) for budget smartphones",
        "Must support low-resolution camera sensors"
      ],
      "expectedOutcome": "A mobile agricultural assistant empowering farmers with early plant care.",
      "innovationScope": ["Offline Mobile Vision", "Plant Pathology Classification", "Sustainable Farming"],
      "suggestedTechnologies": ["TensorFlow Lite", "Flutter", "Python", "OpenCV"]
    }
  },
  {
    "id": 16,
    "title": "AirGuard Urban Air Quality Intelligence",
    "slug": "airguard-urban-air-quality-intelligence",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": ["SDG 3", "SDG 11", "SDG 13"],
    "tags": ["Air Quality", "AI", "Smart City", "Pollution"],
    "cardDescription": "Toxic PM2.5 smog spikes threaten urban public health. Build a hyper-local air pollution forecasting platform that predicts AQI hotspots 24 hours in advance and suggests traffic rerouting.",
    "readMore": {
      "background": "Metropolitan cities rely on sparse weather stations that miss micro-climate smog accumulation caused by vehicular traffic and industrial corridors.",
      "challenge": "Build a spatial-temporal AI model combining low-cost AQI sensor feeds, traffic camera counts, and weather satellite data to map air pollution at street-level resolution.",
      "objectives": [
        "Forecast street-level PM2.5 and NO2 levels 24 hours in advance",
        "Provide sensitive citizens with personalized clean-route navigation",
        "Recommend automated municipal traffic signal adjustments during smog spikes",
        "Identify industrial emissions policy violations"
      ],
      "constraints": [
        "Must handle missing data from malfunctioning sensor nodes",
        "Should update spatial AQI maps hourly",
        "Must provide clear public risk communications"
      ],
      "expectedOutcome": "A predictive urban air intelligence platform protecting citizens from toxic smog.",
      "innovationScope": ["Spatial-Temporal AQI Kriging", "Urban Traffic Emission Modeling", "Public Health Alerts"],
      "suggestedTechnologies": ["Python", "XGBoost", "Mapbox GL", "PostGIS", "React"]
    }
  }
];

// ------------------------------------------------------------------------------
// ENVIRONMENTAL AI PROBLEM STATEMENTS (IDs 11 to 20)
// Breakdown: 3 Easy (IDs 11-13), 4 Medium (IDs 14-17), 3 Hard (IDs 18-20)
// ------------------------------------------------------------------------------
export const ENVIRONMENTAL_PROBLEM_STATEMENTS: ProblemStatement[] = [
  // EASY (IDs 11 to 13)
  {
    "id": 11,
    "title": "WasteSmart Automated Recycler",
    "slug": "wastesmart-automated-recycler",
    "category": "Environmental",
    "difficulty": "Easy",
    "sdgs": ["SDG 11", "SDG 12"],
    "tags": ["Recycling", "Computer Vision", "AI", "Sustainability"],
    "cardDescription": "Unsegregated municipal waste contaminates recycling streams and fills landfills. Build an automated computer vision assistant for instant waste material classification.",
    "readMore": {
      "background": "Over 70% of recyclable plastic, glass, and metal is landfilled because manual sorting at public collection points is slow and error-prone.",
      "challenge": "Create a lightweight computer vision vision app that classifies camera images into plastic, paper, glass, metal, and organic waste, offering disposal guidance.",
      "objectives": [
        "Increase public waste segregation accuracy",
        "Divert recyclable materials from urban landfills",
        "Educate citizens on localized recycling rules",
        "Support smart bin sorting mechanisms"
      ],
      "constraints": [
        "Must run with low latency on mobile or edge devices",
        "Should work under varied lighting and dirty object states",
        "Must maintain high classification accuracy across common packaging"
      ],
      "expectedOutcome": "An accessible AI sorting assistant promoting circular economy habits.",
      "innovationScope": ["Real-time Object Classification", "Mobile Edge Vision", "Circular Economy"],
      "suggestedTechnologies": ["YOLOv8", "TensorFlow.js", "React", "Firebase"]
    }
  },
  {
    "id": 12,
    "title": "AgriSense Crop Health Diagnostics",
    "slug": "agrisense-crop-health-diagnostics",
    "category": "Environmental",
    "difficulty": "Easy",
    "sdgs": ["SDG 2", "SDG 15"],
    "tags": ["Agriculture", "AI", "Crop Monitoring", "Sustainability"],
    "cardDescription": "Smallholder farmers suffer severe harvest losses from undetected crop fungal infections and nutrient deficiencies. Build an offline-first leaf diagnostic mobile companion.",
    "readMore": {
      "background": "Fungal blights and pest infestations destroy millions of tons of crops before rural agricultural officers can visit remote farms.",
      "challenge": "Develop an AI-powered agricultural mobile app that diagnoses plant diseases from leaf photos and recommends eco-friendly organic remedies.",
      "objectives": [
        "Enable instant crop disease detection in remote fields",
        "Reduce chemical pesticide overuse through targeted organic care",
        "Improve smallholder farm crop yields and food security",
        "Provide localized vernacular language treatment advice"
      ],
      "constraints": [
        "Must function offline without active mobile internet",
        "Model size must remain lightweight (<15MB) for budget smartphones",
        "Must support low-resolution camera sensors"
      ],
      "expectedOutcome": "A mobile agricultural assistant empowering farmers with early plant care.",
      "innovationScope": ["Offline Mobile Vision", "Plant Pathology Classification", "Sustainable Farming"],
      "suggestedTechnologies": ["TensorFlow Lite", "Flutter", "Python", "OpenCV"]
    }
  },
  {
    "id": 13,
    "title": "EcoDrop Smart Irrigation Optimizer",
    "slug": "ecodrop-smart-irrigation",
    "category": "Environmental",
    "difficulty": "Easy",
    "sdgs": ["SDG 6", "SDG 12"],
    "tags": ["Water Management", "IoT", "AI", "Agriculture"],
    "cardDescription": "Agricultural irrigation accounts for over 70% of global freshwater usage. Design an intelligent irrigation planner that schedules watering based on soil moisture and weather forecasts.",
    "readMore": {
      "background": "Over-watering wastes precious groundwater reserves and causes soil nutrient leaching, while under-watering stunts crop growth.",
      "challenge": "Build an intelligent irrigation advisory tool that ingests soil sensor readings and local rain forecasts to calculate exact daily crop water requirements.",
      "objectives": [
        "Reduce agricultural freshwater consumption by up to 30%",
        "Prevent crop root rot and soil salinization",
        "Automate smart solenoid valve schedules",
        "Provide farmers with clear daily watering notifications"
      ],
      "constraints": [
        "Must integrate with affordable soil moisture sensors",
        "Should account for regional rainfall probabilities",
        "Interface must remain simple and intuitive"
      ],
      "expectedOutcome": "An efficient water conservation system optimizing crop irrigation schedules.",
      "innovationScope": ["IoT Telemetry Analysis", "Weather API Fusion", "Precision Irrigation"],
      "suggestedTechnologies": ["Python", "OpenWeather API", "Firebase", "React"]
    }
  },

  // MEDIUM (IDs 14 to 17)
  {
    "id": 14,
    "title": "EcoGrid Urban Energy Optimizer",
    "slug": "ecogrid-urban-energy-optimizer",
    "category": "Environmental",
    "difficulty": "Medium",
    "sdgs": ["SDG 7", "SDG 11", "SDG 13"],
    "tags": ["Smart Grid", "AI", "Energy", "Sustainability"],
    "cardDescription": "Cities adopting solar and wind energy struggle with power grid instability due to generation fluctuations. Build a real-time microgrid balancing and peak-shaving engine.",
    "readMore": {
      "background": "Intermittent renewable energy output causes grid frequency instability and heavy reliance on dirty fossil-fuel peaker plants during evening demand spikes.",
      "challenge": "Develop an intelligent grid analytics platform capable of forecasting solar/wind generation, predicting neighborhood power demand, and optimizing battery storage dispatch.",
      "objectives": [
        "Minimize urban energy grid power outages and frequency dips",
        "Maximize renewable solar and wind energy absorption",
        "Reduce peak-hour fossil fuel generator usage",
        "Provide commercial building managers with automated load-shifting guidance"
      ],
      "constraints": [
        "Must process sub-minute smart meter data streams",
        "Should model battery state-of-charge degradation constraints",
        "Must provide transparent load balancing reasoning"
      ],
      "expectedOutcome": "A smart microgrid optimization engine stabilizing urban clean energy grids.",
      "innovationScope": ["Smart Grid Balancing", "Renewable Time-Series Forecasting", "Clean Energy Optimization"],
      "suggestedTechnologies": ["Python", "PyTorch", "FastAPI", "React", "InfluxDB"]
    }
  },
  {
    "id": 15,
    "title": "AquaPure River Basin Sentinel",
    "slug": "aquapure-river-basin-sentinel",
    "category": "Environmental",
    "difficulty": "Medium",
    "sdgs": ["SDG 6", "SDG 14"],
    "tags": ["Water Quality", "IoT", "AI", "Pollution"],
    "cardDescription": "Industrial discharge silently pollutes rivers and drinking water sources. Build a real-time water quality monitoring network detecting chemical contaminants and tracing pollution sources.",
    "readMore": {
      "background": "Illegal industrial chemical dumping in rivers causes aquatic ecosystem collapse and compromises public drinking water treatment plants.",
      "challenge": "Design an AI-powered water monitoring sentinel network that analyzes pH, turbidity, dissolved oxygen, and heavy metal sensor telemetry to pinpoint illegal discharge sources upstream.",
      "objectives": [
        "Detect chemical toxic spills within minutes of occurrence",
        "Trace effluent plume origin using hydro-dynamic flow modeling",
        "Alert environmental protection agencies automatically",
        "Protect municipal drinking water intake reservoirs"
      ],
      "constraints": [
        "Must filter out sensor drift and seasonal organic algae noise",
        "Must handle low-frequency wireless telemetry in remote river basins",
        "Should generate legally admissible discharge incident reports"
      ],
      "expectedOutcome": "An autonomous river surveillance platform safeguarding freshwater ecosystems.",
      "innovationScope": ["Hydro-dynamic Plume Tracking", "Water Anomaly Detection", "Environmental Protection"],
      "suggestedTechnologies": ["Python", "Leaflet GIS", "Scikit-Learn", "FastAPI"]
    }
  },
  {
    "id": 16,
    "title": "AirGuard Urban Air Quality Intelligence",
    "slug": "airguard-urban-air-quality-intelligence",
    "category": "Environmental",
    "difficulty": "Medium",
    "sdgs": ["SDG 3", "SDG 11", "SDG 13"],
    "tags": ["Air Quality", "AI", "Smart City", "Pollution"],
    "cardDescription": "Toxic PM2.5 smog spikes threaten urban public health. Build a hyper-local air pollution forecasting platform that predicts AQI hotspots 24 hours in advance and suggests traffic rerouting.",
    "readMore": {
      "background": "Metropolitan cities rely on sparse weather stations that miss micro-climate smog accumulation caused by vehicular traffic and industrial corridors.",
      "challenge": "Build a spatial-temporal AI model combining low-cost AQI sensor feeds, traffic camera counts, and weather satellite data to map air pollution at street-level resolution.",
      "objectives": [
        "Forecast street-level PM2.5 and NO2 levels 24 hours in advance",
        "Provide sensitive citizens with personalized clean-route navigation",
        "Recommend automated municipal traffic signal adjustments during smog spikes",
        "Identify industrial emissions policy violations"
      ],
      "constraints": [
        "Must handle missing data from malfunctioning sensor nodes",
        "Should update spatial AQI maps hourly",
        "Must provide clear public risk communications"
      ],
      "expectedOutcome": "A predictive urban air intelligence platform protecting citizens from toxic smog.",
      "innovationScope": ["Spatial-Temporal AQI Kriging", "Urban Traffic Emission Modeling", "Public Health Alerts"],
      "suggestedTechnologies": ["Python", "XGBoost", "Mapbox GL", "PostGIS", "React"]
    }
  },
  {
    "id": 17,
    "title": "EcoTrack Supply Chain Carbon Audit",
    "slug": "ecotrack-supply-chain-carbon-audit",
    "category": "Environmental",
    "difficulty": "Medium",
    "sdgs": ["SDG 12", "SDG 13"],
    "tags": ["Carbon Footprint", "AI", "Supply Chain", "Sustainability"],
    "cardDescription": "Enterprises struggle to track hidden Scope 3 carbon emissions across international supply chains. Build an AI-driven carbon audit platform calculating lifecycle footprints and suggesting green suppliers.",
    "readMore": {
      "background": "Over 80% of a company's total environmental impact lies in its tier-1 to tier-3 supply chain suppliers, where data is fragmented and opaque.",
      "challenge": "Build an intelligent carbon accounting engine that ingests logistics invoices, bill of materials (BOM), and energy receipts to compute product carbon footprints (PCF) and recommend eco-certified transport options.",
      "objectives": [
        "Automate Scope 1, 2, and 3 carbon emission calculations",
        "Identify supply chain emission hotspots and inefficiency bottlenecks",
        "Recommend lower-carbon freight transport modes and eco-certified suppliers",
        "Generate audit-ready CSRD and SEC ESG compliance reports"
      ],
      "constraints": [
        "Must comply with GHG Protocol standard emission factors",
        "Must handle multi-currency and international shipping logistics data",
        "Should maintain supplier privacy and data security"
      ],
      "expectedOutcome": "An enterprise carbon accounting intelligence platform accelerating corporate net-zero targets.",
      "innovationScope": ["Supply Chain Footprint Analytics", "ESG LLM Parsing", "Green Logistics Routing"],
      "suggestedTechnologies": ["Python", "FastAPI", "PostgreSQL", "React", "OpenAI / Gemini"]
    }
  },

  // HARD (IDs 18 to 20)
  {
    "id": 18,
    "title": "WildWatch Anti-Poaching AI Sentinel",
    "slug": "wildwatch-anti-poaching-sentinel",
    "category": "Environmental",
    "difficulty": "Hard",
    "sdgs": ["SDG 15"],
    "tags": ["Wildlife", "Computer Vision", "Edge AI", "Conservation"],
    "cardDescription": "Poaching and illegal encroachment push endangered wildlife toward extinction. Build an ultra-low-power edge camera trap network detecting armed poachers and alerting forest rangers instantly.",
    "readMore": {
      "background": "Forest rangers patrolling vast nature reserves cannot cover millions of hectares, allowing armed poaching syndicates to target endangered species undetected.",
      "challenge": "Create an edge AI camera trap system running on thermal vision sensors that detects human intruders, weapons, and snares in dense jungles, relaying satellite alerts to ranger stations in under 60 seconds.",
      "objectives": [
        "Detect illegal human entry and weapons in protected reserves instantly",
        "Classify endangered animal species for biodiversity census tracking",
        "Operate continuously on solar/battery power in harsh jungle environments",
        "Transmit lightweight compressed alert coordinates via satellite/LoRaWAN"
      ],
      "constraints": [
        "Must execute deep learning detection on ultra-low-power microcontrollers (<2W)",
        "False positive alerts from blowing foliage or non-target animals must be under 1%",
        "Must operate silently without visible infrared flash"
      ],
      "expectedOutcome": "An autonomous wildlife protection platform preventing poaching before animals are harmed.",
      "innovationScope": ["Edge Vision TinyML", "Low-Power Satellite Telemetry", "Anti-Poaching Defense"],
      "suggestedTechnologies": ["TinyML", "YOLOv8-nano", "Raspberry Pi / Jetson", "LoRaWAN", "Python"]
    }
  },
  {
    "id": 19,
    "title": "ClimateTwin Urban Flood Simulation",
    "slug": "climatetwin-urban-flood-simulation",
    "category": "Environmental",
    "difficulty": "Hard",
    "sdgs": ["SDG 11", "SDG 13"],
    "tags": ["Digital Twin", "Climate Modeling", "AI", "Urban Planning"],
    "cardDescription": "Extreme monsoon downpours cause catastrophic urban flash flooding. Build a 3D city digital twin simulating surface runoff, drainage overflow, and evacuation routes during storm surges.",
    "readMore": {
      "background": "Rapid urban concrete construction blocks natural drainage, causing sudden flash floods during extreme weather events that submerge roads and sub-stations.",
      "challenge": "Develop a 3D urban digital twin that integrates high-resolution elevation maps (DEM), storm rainfall radar feeds, and drainage network models to simulate real-time flood inundation vectors.",
      "objectives": [
        "Simulate street-by-street water depth propagation during 100-year storm events",
        "Identify critical power grid and hospital infrastructure at inundation risk",
        "Calculate dynamic safe emergency evacuation routes for stranded citizens",
        "Evaluate sustainable urban drainage (sponge city) interventions"
      ],
      "constraints": [
        "Hydro-dynamic water physics simulation must render in real time",
        "Must handle massive 3D elevation LiDAR spatial data",
        "Must support interactive scenario testing for disaster response teams"
      ],
      "expectedOutcome": "A 3D spatial climate digital twin empowering city disaster teams during flash floods.",
      "innovationScope": ["3D Hydrodynamic Simulation", "Urban Digital Twins", "Disaster Evacuation AI"],
      "suggestedTechnologies": ["Three.js", "Python", "PyTorch", "WebGL", "PostGIS"]
    }
  },
  {
    "id": 20,
    "title": "Global Geospatial Climate Risk Engine",
    "slug": "global-geospatial-climate-risk-engine",
    "category": "Environmental",
    "difficulty": "Hard",
    "sdgs": ["SDG 13", "SDG 15"],
    "tags": ["Satellite Data", "Geospatial AI", "Remote Sensing", "Climate"],
    "cardDescription": "Governments and climate funds lack unified planetary monitoring of Amazonian deforestation, ocean warming, and glacier melt. Build a multi-modal geospatial AI engine analyzing satellite feeds.",
    "readMore": {
      "background": "Disparate satellite constellations (Sentinel, Landsat, MODIS) generate petabytes of earth observation data daily, but extracting actionable environmental degradation insights remains slow.",
      "challenge": "Build a multi-modal geospatial AI platform ingesting multi-spectral satellite imagery to detect illegal logging, wildfire spreading, mangrove loss, and agricultural desertification at global scale.",
      "objectives": [
        "Detect illegal deforestation activities within 48 hours of canopy loss",
        "Track ocean surface thermal anomalies and coral bleaching events",
        "Measure carbon sequestration loss across tropical rainforest biomes",
        "Provide international climate funds with verifiable planetary health metrics"
      ],
      "constraints": [
        "Must process petabyte-scale multi-spectral satellite rasters efficiently",
        "Must correct for cloud cover and atmospheric distortion noise",
        "Insights must be backed by verifiable spatial coordinates"
      ],
      "expectedOutcome": "A planetary-scale climate intelligence engine monitoring Earth's vital ecosystems.",
      "innovationScope": ["Satellite Multi-Spectral AI", "Geospatial Remote Sensing", "Planetary Health Monitoring"],
      "suggestedTechnologies": ["Google Earth Engine", "Python", "TorchGeo", "PostGIS", "React"]
    }
  }
];

// ------------------------------------------------------------------------------
// HEALTHCARE STYLING ARRAY (IDs 1 to 16)
// ------------------------------------------------------------------------------
export const HEALTHCARE_STYLES: ProblemStatementStyle[] = [
  { "id": 1, "theme": "Preventive Red", "primary":"#EF4444","secondary":"#F87171","accent":"#FCA5A5","background":"rgba(239,68,68,0.08)","border":"rgba(239,68,68,0.35)","heading":"#FFECEC","content":"#FECACA","button":"#DC2626","buttonHover":"#B91C1C","glow":"rgba(239,68,68,0.45)" },
  { "id": 2, "theme": "Mind Violet", "primary":"#8B5CF6","secondary":"#A78BFA","accent":"#C4B5FD","background":"rgba(139,92,246,0.08)","border":"rgba(139,92,246,0.35)","heading":"#F5F3FF","content":"#DDD6FE","button":"#7C3AED","buttonHover":"#6D28D9","glow":"rgba(139,92,246,0.45)" },
  { "id": 3, "theme": "Pharma Teal", "primary":"#0D9488","secondary":"#14B8A6","accent":"#5EEAD4","background":"rgba(13,148,136,0.08)","border":"rgba(13,148,136,0.35)","heading":"#F0FDFA","content":"#CCFBF1","button":"#0F766E","buttonHover":"#115E59","glow":"rgba(13,148,136,0.45)" },
  { "id": 4, "theme": "Maternal Rose", "primary":"#F43F5E","secondary":"#FB7185","accent":"#FECDD3","background":"rgba(244,63,94,0.08)","border":"rgba(244,63,94,0.35)","heading":"#FFF1F2","content":"#FECDD3","button":"#E11D48","buttonHover":"#BE123C","glow":"rgba(244,63,94,0.45)" },
  { "id": 5, "theme": "Adherence Blue", "primary":"#3B82F6","secondary":"#60A5FA","accent":"#93C5FD","background":"rgba(59,130,246,0.08)","border":"rgba(59,130,246,0.35)","heading":"#EFF6FF","content":"#BFDBFE","button":"#2563EB","buttonHover":"#1D4ED8","glow":"rgba(59,130,246,0.45)" },
  { "id": 6, "theme": "Coach Indigo", "primary":"#6366F1","secondary":"#818CF8","accent":"#C7D2FE","background":"rgba(99,102,241,0.08)","border":"rgba(99,102,241,0.35)","heading":"#EEF2FF","content":"#C7D2FE","button":"#4F46E5","buttonHover":"#4338CA","glow":"rgba(99,102,241,0.45)" },
  { "id": 7, "theme": "Explainer Cyan", "primary":"#06B6D4","secondary":"#22D3EE","accent":"#67E8F9","background":"rgba(6,182,212,0.08)","border":"rgba(6,182,212,0.35)","heading":"#ECFEFF","content":"#A5F3FC","button":"#0891B2","buttonHover":"#0E7490","glow":"rgba(6,182,212,0.45)" },
  { "id": 8, "theme": "Digital Twin Emerald", "primary":"#10B981","secondary":"#34D399","accent":"#6EE7B7","background":"rgba(16,185,129,0.08)","border":"rgba(16,185,129,0.35)","heading":"#ECFDF5","content":"#A7F3D0","button":"#059669","buttonHover":"#047857","glow":"rgba(16,185,129,0.45)" },
  { "id": 9, "theme": "Medical Blue", "primary":"#2563EB","secondary":"#60A5FA","accent":"#93C5FD","background":"rgba(37,99,235,0.08)","border":"rgba(37,99,235,0.35)","heading":"#EFF6FF","content":"#BFDBFE","button":"#2563EB","buttonHover":"#1D4ED8","glow":"rgba(37,99,235,0.45)" },
  { "id": 10, "theme": "Emergency Red", "primary":"#DC2626","secondary":"#F87171","accent":"#FCA5A5","background":"rgba(220,38,38,0.08)","border":"rgba(220,38,38,0.35)","heading":"#FEF2F2","content":"#FECACA","button":"#B91C1C","buttonHover":"#991B1B","glow":"rgba(220,38,38,0.45)" },
  { "id": 11, "theme": "Mind Azure", "primary":"#3B82F6","secondary":"#60A5FA","accent":"#93C5FD","background":"rgba(59,130,246,0.08)","border":"rgba(59,130,246,0.35)","heading":"#EFF6FF","content":"#BFDBFE","button":"#1D4ED8","buttonHover":"#1E40AF","glow":"rgba(59,130,246,0.45)" },
  { "id": 12, "theme": "Hospital Sapphire", "primary":"#2563EB","secondary":"#3B82F6","accent":"#93C5FD","background":"rgba(37,99,235,0.08)","border":"rgba(37,99,235,0.35)","heading":"#EFF6FF","content":"#BFDBFE","button":"#1D4ED8","buttonHover":"#1E40AF","glow":"rgba(37,99,235,0.45)" },
  { "id": 13, "theme": "Royal Blue", "primary":"#2563EB","secondary":"#60A5FA","accent":"#93C5FD","background":"rgba(37,99,235,0.08)","border":"rgba(37,99,235,0.35)","heading":"#EFF6FF","content":"#BFDBFE","button":"#1D4ED8","buttonHover":"#1E40AF","glow":"rgba(37,99,235,0.45)" },
  { "id": 14, "theme": "Recycle Lime", "primary":"#65A30D","secondary":"#84CC16","accent":"#A3E635","background":"rgba(101,163,13,0.08)","border":"rgba(101,163,13,0.35)","heading":"#F7FEE7","content":"#D9F99D","button":"#4D7C0F","buttonHover":"#3F6212","glow":"rgba(101,163,13,0.45)" },
  { "id": 15, "theme": "Harvest Green", "primary":"#16A34A","secondary":"#22C55E","accent":"#86EFAC","background":"rgba(22,163,74,0.08)","border":"rgba(22,163,74,0.35)","heading":"#F0FDF4","content":"#BBF7D0","button":"#15803D","buttonHover":"#166534","glow":"rgba(22,163,74,0.45)" },
  { "id": 16, "theme": "Climate Sky", "primary":"#0284C7","secondary":"#38BDF8","accent":"#7DD3FC","background":"rgba(2,132,199,0.08)","border":"rgba(2,132,199,0.35)","heading":"#F0F9FF","content":"#BAE6FD","button":"#0369A1","buttonHover":"#075985","glow":"rgba(2,132,199,0.45)" }
];

// ------------------------------------------------------------------------------
// ENVIRONMENTAL STYLING ARRAY (IDs 11 to 20)
// ------------------------------------------------------------------------------
export const ENVIRONMENTAL_STYLES: ProblemStatementStyle[] = [
  { "id": 11, "theme": "Recycle Lime", "primary":"#65A30D","secondary":"#84CC16","accent":"#A3E635","background":"rgba(101,163,13,0.08)","border":"rgba(101,163,13,0.35)","heading":"#F7FEE7","content":"#D9F99D","button":"#4D7C0F","buttonHover":"#3F6212","glow":"rgba(101,163,13,0.45)" },
  { "id": 12, "theme": "Harvest Green", "primary":"#16A34A","secondary":"#22C55E","accent":"#86EFAC","background":"rgba(22,163,74,0.08)","border":"rgba(22,163,74,0.35)","heading":"#F0FDF4","content":"#BBF7D0","button":"#15803D","buttonHover":"#166534","glow":"rgba(22,163,74,0.45)" },
  { "id": 13, "theme": "Ocean Cyan", "primary":"#06B6D4","secondary":"#22D3EE","accent":"#67E8F9","background":"rgba(6,182,212,0.08)","border":"rgba(6,182,212,0.35)","heading":"#ECFEFF","content":"#A5F3FC","button":"#0891B2","buttonHover":"#0E7490","glow":"rgba(6,182,212,0.45)" },
  { "id": 14, "theme": "Energy Gold", "primary":"#EAB308","secondary":"#FACC15","accent":"#FDE047","background":"rgba(234,179,8,0.08)","border":"rgba(234,179,8,0.35)","heading":"#FEFCE8","content":"#FEF08A","button":"#CA8A04","buttonHover":"#A16207","glow":"rgba(234,179,8,0.45)" },
  { "id": 15, "theme": "Marine Aqua", "primary":"#0891B2","secondary":"#06B6D4","accent":"#67E8F9","background":"rgba(8,145,178,0.08)","border":"rgba(8,145,178,0.35)","heading":"#ECFEFF","content":"#A5F3FC","button":"#0E7490","buttonHover":"#155E75","glow":"rgba(8,145,178,0.45)" },
  { "id": 16, "theme": "Climate Sky", "primary":"#0284C7","secondary":"#38BDF8","accent":"#7DD3FC","background":"rgba(2,132,199,0.08)","border":"rgba(2,132,199,0.35)","heading":"#F0F9FF","content":"#BAE6FD","button":"#0369A1","buttonHover":"#075985","glow":"rgba(2,132,199,0.45)" },
  { "id": 17, "theme": "Carbon Slate", "primary":"#475569","secondary":"#64748B","accent":"#94A3B8","background":"rgba(71,85,105,0.08)","border":"rgba(71,85,105,0.35)","heading":"#F8FAFC","content":"#CBD5E1","button":"#334155","buttonHover":"#1E293B","glow":"rgba(71,85,105,0.45)" },
  { "id": 18, "theme": "Forest Emerald", "primary":"#059669","secondary":"#10B981","accent":"#6EE7B7","background":"rgba(5,150,105,0.08)","border":"rgba(5,150,105,0.35)","heading":"#ECFDF5","content":"#A7F3D0","button":"#047857","buttonHover":"#065F46","glow":"rgba(5,150,105,0.45)" },
  { "id": 19, "theme": "Flood Blue", "primary":"#2563EB","secondary":"#38BDF8","accent":"#7DD3FC","background":"rgba(37,99,235,0.08)","border":"rgba(37,99,235,0.35)","heading":"#EFF6FF","content":"#BFDBFE","button":"#1D4ED8","buttonHover":"#1E40AF","glow":"rgba(37,99,235,0.45)" },
  { "id": 20, "theme": "Gaia Aurora", "primary":"#0F766E","secondary":"#0891B2","accent":"#22D3EE","background":"rgba(15,118,110,0.08)","border":"rgba(15,118,110,0.35)","heading":"#F0FDFA","content":"#CCFBF1","button":"#115E59","buttonHover":"#134E4A","glow":"rgba(15,118,110,0.45)" }
];
