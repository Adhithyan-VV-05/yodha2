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
// HEALTHCARE AI PROBLEM STATEMENTS (IDs 1 to 10)
// Breakdown: 3 Easy (IDs 1-3), 4 Medium (IDs 4-7), 3 Hard (IDs 8-10)
// ------------------------------------------------------------------------------
export const HEALTHCARE_PROBLEM_STATEMENTS: ProblemStatement[] = [
  // EASY (IDs 1 to 3)
  {
    "id": 1,
    "title": "Silent Health Guardian",
    "slug": "silent-health-guardian",
    "category": "Healthcare",
    "difficulty": "Easy",
    "sdgs": ["SDG 3"],
    "tags": ["AI", "Healthcare", "Remote Monitoring", "IoT"],
    "cardDescription": "Many patients fail to recognize early warning signs of deteriorating health. Design an intelligent assistant that continuously monitors routine health indicators and alerts users before conditions become critical.",
    "readMore": {
      "background": "Chronic illnesses often worsen because patients miss subtle changes in their daily health. Continuous monitoring and timely intervention can significantly improve outcomes.",
      "challenge": "Develop a smart monitoring platform capable of collecting routine health information from wearable devices or manual inputs, detecting abnormal patterns, and notifying both patients and caregivers.",
      "objectives": [
        "Enable early detection of health risks",
        "Improve patient awareness",
        "Reduce avoidable hospital visits",
        "Provide personalized health insights"
      ],
      "constraints": [
        "Must preserve patient privacy",
        "Should function with minimal hardware",
        "Must provide explainable alerts"
      ],
      "expectedOutcome": "An intelligent healthcare companion capable of detecting health anomalies before they become emergencies.",
      "innovationScope": ["Predictive Analytics", "Wearable Integration", "Edge AI"],
      "suggestedTechnologies": ["Python", "TensorFlow", "Firebase", "IoT Sensors"]
    }
  },
  {
    "id": 2,
    "title": "CareBridge AI Assistant",
    "slug": "carebridge-ai-assistant",
    "category": "Healthcare",
    "difficulty": "Easy",
    "sdgs": ["SDG 3", "SDG 10"],
    "tags": ["Accessibility", "Healthcare", "AI", "Voice"],
    "cardDescription": "Healthcare remains inaccessible for many elderly and differently-abled individuals. Build an inclusive digital assistant that simplifies access to medical guidance and appointment booking.",
    "readMore": {
      "background": "Many patients face challenges in booking appointments, understanding prescriptions, or accessing medical guidance due to language, literacy, or physical limitations.",
      "challenge": "Design an accessible healthcare assistant that supports multilingual communication, voice interaction, appointment scheduling, and simplified medical guidance.",
      "objectives": [
        "Improve healthcare accessibility",
        "Support multilingual voice interaction",
        "Assist elderly users with appointment routing",
        "Reduce dependence on manual clinic check-in"
      ],
      "constraints": [
        "Must be simple to use for non-tech-savvy users",
        "Should support low-bandwidth devices",
        "Must prioritize web accessibility (WCAG)"
      ],
      "expectedOutcome": "An inclusive healthcare platform capable of improving patient engagement across diverse populations.",
      "innovationScope": ["Speech Recognition", "NLP", "Accessibility"],
      "suggestedTechnologies": ["Whisper", "Gemini AI", "React", "Firebase"]
    }
  },
  {
    "id": 3,
    "title": "SafeDose Medication Companion",
    "slug": "safedose-medication-companion",
    "category": "Healthcare",
    "difficulty": "Easy",
    "sdgs": ["SDG 3"],
    "tags": ["Medication", "AI", "Healthcare", "Patient Safety"],
    "cardDescription": "Medication errors and missed dosages remain leading causes of preventable healthcare complications. Build an intelligent assistant that improves medication adherence and checks interaction risks.",
    "readMore": {
      "background": "Patients often forget dosage schedules or unintentionally combine medicines that produce harmful side effects or allergic reactions.",
      "challenge": "Create an AI-powered medication companion capable of reminding patients, identifying potential drug-drug interactions, and keeping caregivers updated.",
      "objectives": [
        "Improve medication compliance",
        "Reduce dangerous prescription interaction risks",
        "Increase patient treatment awareness",
        "Support family caregiver tracking"
      ],
      "constraints": [
        "Must explicitly disclaim professional doctor substitution",
        "Should remain simple for elderly users",
        "Must provide instant interaction warnings"
      ],
      "expectedOutcome": "A personalized medication safety companion improving treatment adherence.",
      "innovationScope": ["Recommendation Systems", "Drug Interaction Graphs", "Patient Safety"],
      "suggestedTechnologies": ["Firebase", "React", "Gemini AI", "RxNorm API"]
    }
  },

  // MEDIUM (IDs 4 to 7)
  {
    "id": 4,
    "title": "MedSync Clinical Navigator",
    "slug": "medsync-clinical-navigator",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": ["SDG 3", "SDG 9"],
    "tags": ["Healthcare", "AI", "Hospital", "Workflow"],
    "cardDescription": "Hospitals struggle with fragmented patient records across labs, pharmacies, and radiology. Create an intelligent system that connects clinical workflows and accelerates treatment decision-making.",
    "readMore": {
      "background": "Patient information is frequently distributed across laboratories, imaging centers, pharmacies, and clinical departments, resulting in delays and diagnostic bottlenecks.",
      "challenge": "Build a unified healthcare intelligence platform capable of consolidating patient records from multiple sources while assisting clinicians through contextual insights.",
      "objectives": [
        "Reduce clinical treatment delays",
        "Improve EHR information accessibility",
        "Support faster diagnostic decisions",
        "Enhance inter-departmental hospital workflow"
      ],
      "constraints": [
        "Must maintain strict HIPAA / GDPR patient confidentiality",
        "Should integrate with standard hospital EHR protocols",
        "Must serve as clinician decision support, not replacement"
      ],
      "expectedOutcome": "A connected healthcare ecosystem streamlining clinical workflows and patient care.",
      "innovationScope": ["Healthcare Informatics", "Explainable AI", "EHR Data Fusion"],
      "suggestedTechnologies": ["FHIR", "FastAPI", "PostgreSQL", "React"]
    }
  },
  {
    "id": 5,
    "title": "PulseShield Emergency Triage Intelligence",
    "slug": "pulseshield-emergency-intelligence",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": ["SDG 3", "SDG 11"],
    "tags": ["Emergency", "AI", "IoT", "Triage"],
    "cardDescription": "Emergency response teams often receive incomplete patient data during critical transit. Develop an intelligent platform that speeds up trauma triage and ambulance-to-ER coordination.",
    "readMore": {
      "background": "Delays in retrieving patient history and vital trends during ambulance transit directly impact emergency trauma survival rates.",
      "challenge": "Design an emergency triage intelligence platform capable of collecting real-time patient vitals during transport, predicting trauma severity, and alerting ER staff before arrival.",
      "objectives": [
        "Reduce emergency room admission delays",
        "Improve pre-hospital triage accuracy",
        "Support rapid trauma team preparation",
        "Enhance ambulance-hospital telemetry coordination"
      ],
      "constraints": [
        "Must operate reliably over cellular/unstable mobile networks",
        "Should prioritize vital alarm telemetry",
        "Must ensure encrypted data transmission"
      ],
      "expectedOutcome": "An AI-assisted emergency triage network reducing critical care latency.",
      "innovationScope": ["Telemetry Edge AI", "Triage Decision Support", "Emergency Healthcare"],
      "suggestedTechnologies": ["Firebase", "React", "TensorFlow Lite", "WebSockets"]
    }
  },
  {
    "id": 6,
    "title": "MindMirror Wellness Network",
    "slug": "mindmirror-wellness-network",
    "category": "Healthcare",
    "difficulty": "Medium",
    "sdgs": ["SDG 3"],
    "tags": ["Mental Health", "AI", "NLP", "Wellness"],
    "cardDescription": "Mental health conditions often go unnoticed until severe crisis occurs. Design an intelligent platform capable of detecting behavioral stress signals and offering early wellness interventions.",
    "readMore": {
      "background": "Stress, anxiety, and burnout frequently remain unaddressed due to lack of regular mood tracking and social stigma around seeking mental health support.",
      "challenge": "Develop an AI-powered wellness network that analyzes voluntary user logs, voice sentiment, and behavioral sleep patterns to provide personalized wellness coping strategies while protecting privacy.",
      "objectives": [
        "Promote early mental wellness awareness",
        "Deliver personalized coping strategies",
        "Support therapists with anonymized longitudinal mood trends",
        "Encourage proactive preventive care"
      ],
      "constraints": [
        "Must preserve complete user anonymity and privacy",
        "Should explicitly avoid clinical psychiatric diagnosis",
        "Must provide safe, crisis helpline escalation paths"
      ],
      "expectedOutcome": "A compassionate digital mental health assistant promoting early wellness care.",
      "innovationScope": ["Natural Language Sentiment Analysis", "Behavioral Analytics", "Privacy-Preserving AI"],
      "suggestedTechnologies": ["Gemini AI", "Whisper", "Firebase", "React"]
    }
  },
  {
    "id": 7,
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

  // HARD (IDs 8 to 10)
  {
    "id": 8,
    "title": "Digital Recovery Twin Engine",
    "slug": "digital-recovery-twin-engine",
    "category": "Healthcare",
    "difficulty": "Hard",
    "sdgs": ["SDG 3", "SDG 9"],
    "tags": ["Digital Twin", "AI", "Predictive Analytics", "Post-Op"],
    "cardDescription": "Post-surgical recovery varies greatly between individuals. Create a biophysical digital twin that simulates patient recovery trajectories and alerts surgeons to readmission risks.",
    "readMore": {
      "background": "Post-operative recovery depends on complex interactions between age, comorbidities, surgical trauma, biometrics, and physical therapy compliance.",
      "challenge": "Develop a digital twin engine capable of modeling individual recovery progress, forecasting wound healing timelines, and alerting surgical teams to early infection or organ distress indicators.",
      "objectives": [
        "Enable continuous post-surgical simulation",
        "Predict post-op complications and readmissions early",
        "Optimize personalized physical rehabilitation schedules",
        "Reduce 30-day post-surgery hospital readmission rates"
      ],
      "constraints": [
        "Must handle missing or irregular home sensor data",
        "Must ensure complete patient biometric privacy",
        "Predictions must be backed by clinical feature importance"
      ],
      "expectedOutcome": "A dynamic patient digital twin platform optimizing long-term post-operative recovery.",
      "innovationScope": ["Biophysical Digital Twins", "Time-Series Deep Learning", "Explainable Medical AI"],
      "suggestedTechnologies": ["PyTorch", "Python", "Three.js", "FastAPI"]
    }
  },
  {
    "id": 9,
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
    "id": 10,
    "title": "Genome Insight Precision Engine",
    "slug": "genome-insight-precision-engine",
    "category": "Healthcare",
    "difficulty": "Hard",
    "sdgs": ["SDG 3", "SDG 9"],
    "tags": ["Genomics", "AI", "Precision Medicine", "Bioinformatics"],
    "cardDescription": "Genomic sequencing data is massive and complex, hindering personalized cancer and rare disease therapies. Build an explainable AI pipeline translating variant profiles into tailored treatment plans.",
    "readMore": {
      "background": "Precision medicine requires matching patient genomic single-nucleotide variants (SNVs) against millions of biomedical research papers and clinical drug trials.",
      "challenge": "Build an AI bioinformatics engine capable of ingesting VCF genomic sequence files, predicting variant pathogenicity, and matching actionable mutations to targeted oncological therapies.",
      "objectives": [
        "Accelerate genomic variant interpretation from days to minutes",
        "Predict drug efficacy and adverse reaction profiles based on genetics",
        "Identify eligible clinical trials for rare genetic mutations",
        "Empower oncologists with evidence-backed treatment pathways"
      ],
      "constraints": [
        "Must process large VCF files efficiently",
        "Must maintain genomic data privacy and encryption",
        "Must cite peer-reviewed literature for clinical recommendations"
      ],
      "expectedOutcome": "An end-to-end clinical decision-support engine for precision genomic medicine.",
      "innovationScope": ["Bioinformatics Pipelines", "Genomic Variant Pathogenicity AI", "RAG Literature Search"],
      "suggestedTechnologies": ["Python", "BioPython", "PyTorch", "Qdrant / Vector DB", "React"]
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
// HEALTHCARE STYLING ARRAY (IDs 1 to 10)
// ------------------------------------------------------------------------------
export const HEALTHCARE_STYLES: ProblemStatementStyle[] = [
  { "id": 1, "theme": "Healthcare Crimson", "primary":"#EF4444","secondary":"#F87171","accent":"#FCA5A5","background":"rgba(239,68,68,0.08)","border":"rgba(239,68,68,0.35)","heading":"#FFECEC","content":"#FECACA","button":"#DC2626","buttonHover":"#B91C1C","glow":"rgba(239,68,68,0.45)" },
  { "id": 2, "theme": "Care Purple", "primary":"#8B5CF6","secondary":"#A78BFA","accent":"#C4B5FD","background":"rgba(139,92,246,0.08)","border":"rgba(139,92,246,0.35)","heading":"#F5F3FF","content":"#DDD6FE","button":"#7C3AED","buttonHover":"#6D28D9","glow":"rgba(139,92,246,0.45)" },
  { "id": 3, "theme": "Safety Coral", "primary":"#FB7185","secondary":"#FDA4AF","accent":"#FECDD3","background":"rgba(251,113,133,0.08)","border":"rgba(251,113,133,0.35)","heading":"#FFF1F2","content":"#FECDD3","button":"#E11D48","buttonHover":"#BE123C","glow":"rgba(251,113,133,0.45)" },
  { "id": 4, "theme": "Medical Blue", "primary":"#2563EB","secondary":"#60A5FA","accent":"#93C5FD","background":"rgba(37,99,235,0.08)","border":"rgba(37,99,235,0.35)","heading":"#EFF6FF","content":"#BFDBFE","button":"#2563EB","buttonHover":"#1D4ED8","glow":"rgba(37,99,235,0.45)" },
  { "id": 5, "theme": "Emergency Red", "primary":"#DC2626","secondary":"#F87171","accent":"#FCA5A5","background":"rgba(220,38,38,0.08)","border":"rgba(220,38,38,0.35)","heading":"#FEF2F2","content":"#FECACA","button":"#B91C1C","buttonHover":"#991B1B","glow":"rgba(220,38,38,0.45)" },
  { "id": 6, "theme": "Mind Violet", "primary":"#7C3AED","secondary":"#A78BFA","accent":"#C4B5FD","background":"rgba(124,58,237,0.08)","border":"rgba(124,58,237,0.35)","heading":"#F5F3FF","content":"#DDD6FE","button":"#6D28D9","buttonHover":"#5B21B6","glow":"rgba(124,58,237,0.45)" },
  { "id": 7, "theme": "Hospital Sapphire", "primary":"#2563EB","secondary":"#3B82F6","accent":"#93C5FD","background":"rgba(37,99,235,0.08)","border":"rgba(37,99,235,0.35)","heading":"#EFF6FF","content":"#BFDBFE","button":"#1D4ED8","buttonHover":"#1E40AF","glow":"rgba(37,99,235,0.45)" },
  { "id": 8, "theme": "Digital Cyan", "primary":"#06B6D4","secondary":"#22D3EE","accent":"#67E8F9","background":"rgba(6,182,212,0.08)","border":"rgba(6,182,212,0.35)","heading":"#ECFEFF","content":"#A5F3FC","button":"#0891B2","buttonHover":"#0E7490","glow":"rgba(6,182,212,0.45)" },
  { "id": 9, "theme": "Royal Indigo", "primary":"#4338CA","secondary":"#818CF8","accent":"#A5B4FC","background":"rgba(67,56,202,0.08)","border":"rgba(67,56,202,0.35)","heading":"#EEF2FF","content":"#C7D2FE","button":"#3730A3","buttonHover":"#312E81","glow":"rgba(67,56,202,0.45)" },
  { "id": 10, "theme": "Genome Emerald", "primary":"#10B981","secondary":"#34D399","accent":"#6EE7B7","background":"rgba(16,185,129,0.08)","border":"rgba(16,185,129,0.35)","heading":"#ECFDF5","content":"#A7F3D0","button":"#059669","buttonHover":"#047857","glow":"rgba(16,185,129,0.45)" }
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
