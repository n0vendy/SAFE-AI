// Placeholder survey. Replace questions here; the report form renders from this file.

export type Option = { value: string; label: string };

type Base = {
  id: string;
  label: string;
  help?: string;
  // Only show this question when the predicate holds for the current answers.
  showIf?: (answers: Answers) => boolean;
};

export type SingleQuestion = Base & { type: "single"; options: string[]; other?: boolean };
export type MultiQuestion = Base & {
  type: "multi";
  options: string[];
  other?: boolean;
  max?: number;
  // An option that clears every other choice (e.g. "No incidents").
  exclusive?: string[];
};
export type MatrixQuestion = Base & { type: "matrix"; rows: string[]; scale: string[] };
export type TextQuestion = Base & { type: "text" };

export type Question = SingleQuestion | MultiQuestion | MatrixQuestion | TextQuestion;
export type Section = { id: string; title: string; intro?: string; questions: Question[] };

// single -> string, multi -> string[], matrix -> Record<row, scale value>, text -> string
export type Answers = Record<string, string | string[] | Record<string, string>>;

export const OTHER = "Other";

const AGREE = ["Strongly disagree", "Somewhat disagree", "Neither agree nor disagree", "Somewhat agree", "Strongly agree"];

export const sections: Section[] = [
  {
    id: "about",
    title: "About your work",
    intro: "We only ask what helps us spot patterns. Nothing here identifies you personally.",
    questions: [
      { id: "location", type: "single", label: "Where is your facility located?", options: ["United States", "Czech Republic"], other: true },
      {
        id: "facility",
        type: "single",
        label: "What kind of facility do you work in?",
        options: ["Hospital - City", "Hospital - Suburbs / Region", "Hospital - University", "Day Clinic", "Medical Center"],
        other: true,
      },
      { id: "role", type: "single", label: "What is your role?", options: ["Nurse", "Doctor", "Resident/Intern", "Receptionist/Administrative"], other: true },
      {
        id: "department",
        type: "single",
        label: "Which department or unit do you mainly work in?",
        options: [
          "Emergency",
          "Psychiatry / mental health",
          "Internal medicine",
          "Surgery",
          "Pediatrics",
          "Outpatient / clinic",
          "Intensive care",
          "Reception / administration",
        ],
        other: true,
      },
      {
        id: "shifts",
        type: "multi",
        label: "Which shifts do you usually work?",
        help: "Select all that apply.",
        options: ["Day shifts", "Evening shifts", "Night shifts", "Rotating shifts"],
        other: true,
      },
      { id: "alone", type: "single", label: "How often do you work alone, without a colleague nearby?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    ],
  },
  {
    id: "measures",
    title: "Safety measures",
    intro: "How available and effective are these measures at your facility?",
    questions: [
      {
        id: "measures",
        type: "matrix",
        label: "For each measure, choose the option that best describes your facility.",
        rows: [
          "Environmental controls (e.g., panic buttons, secured doors)",
          "Administrative controls (e.g., strict visitor policies, clear signage)",
          "Training (e.g., verbal de-escalation, physical self-defense)",
          "Security personnel presence",
          "Post-incident support/debriefing",
        ],
        scale: ["Not implemented", "Not effective at all", "Somewhat ineffective", "Somewhat effective", "Very effective", "Not sure or N/A"],
      },
      {
        id: "barriers",
        type: "multi",
        label: "What are the main barriers to implementing better security measures in your unit?",
        help: "Select up to three.",
        max: 3,
        options: [
          "Understaffing",
          "Lack of time for training",
          "Lack of budget or resources",
          "Lack of leadership support or follow-through",
          'A culture that normalizes workplace violence as "part of the job"',
        ],
        other: true,
      },
    ],
  },
  {
    id: "incidents",
    title: "Incidents",
    intro: "Think about the past 6 months. You can skip anything you don't want to answer.",
    questions: [
      {
        id: "frequency",
        type: "matrix",
        label: "In the past 6 months, how often have you experienced each of the following?",
        rows: [
          "Verbal abuse or threats from patients/visitors",
          "Physical aggression from patients/visitors",
          "Horizontal violence (bullying or intimidation from coworkers/management)",
          "Sexual harassment",
        ],
        scale: ["Never", "Once", "2-5 times", "More than 5 times"],
      },
      {
        id: "worstType",
        type: "single",
        label: "Which incident type has most negatively impacted your sense of security in the past 6 months?",
        options: [
          "Verbal abuse or threats from patients/visitors",
          "Physical aggression from patients/visitors",
          "Horizontal violence (bullying or intimidation from coworkers/management)",
          "Sexual harassment",
          "No incidents",
        ],
        other: true,
      },
      {
        id: "warningSigns",
        type: "multi",
        label: "Which of these behaviors have you observed before an incident escalated?",
        help: "Select all that apply.",
        options: [
          "Increased irritability or impulsivity",
          "Confusion or disorientation",
          "Unwillingness to follow directions or anger when requests are denied",
          "Attacking objects (e.g., slamming doors, throwing items)",
          "None observed",
        ],
        exclusive: ["None observed"],
        other: true,
      },
      {
        id: "factors",
        type: "multi",
        label: "Which factors contributed to the incidents you experienced or witnessed?",
        help: "Select all that apply.",
        options: [
          "Immediate trigger: Patient cognitive impairment, confusion, or substance withdrawal",
          "Operational: Long wait times or delayed care",
          "Operational: Severe staffing shortages",
          "Protective measures: Lack of physical barriers",
          "Protective measures: Poor security presence",
          "No incidents",
        ],
        exclusive: ["No incidents"],
        other: true,
      },
    ],
  },
  {
    id: "reporting",
    title: "Attitudes and reporting",
    questions: [
      {
        id: "attitudes",
        type: "matrix",
        label: "How much do you agree with each statement?",
        rows: [
          "I feel safe at work.",
          "I know how to respond when a situation escalates.",
          "I know whom to contact for help in a potentially unsafe situation.",
          "I know how to report a safety incident in my organization.",
        ],
        scale: [...AGREE, "Not sure"],
      },
      {
        id: "reported",
        type: "single",
        label: "In the past six months, have you reported a safety incident you experienced at work?",
        options: ["Yes, all incidents.", "Yes, some incidents.", "No, none of the incidents.", "I did not experience any incidents."],
      },
      {
        id: "whyNot",
        type: "multi",
        label: "If you did not report some or all incidents, why?",
        help: "Select all that apply.",
        showIf: (a) => a.reported === "Yes, some incidents." || a.reported === "No, none of the incidents.",
        options: [
          "I did not know how or where to report.",
          "No reporting process was available.",
          "Reporting was too time-consuming or difficult.",
          "I did not consider the incident serious enough.",
          "I considered it part of the job.",
          "I was concerned about negative consequences.",
          "I did not believe reporting would lead to action.",
        ],
        other: true,
      },
      {
        id: "afterReport",
        type: "matrix",
        label: "If you reported an incident, how much do you agree with each statement?",
        showIf: (a) => a.reported === "Yes, all incidents." || a.reported === "Yes, some incidents.",
        rows: ["I received the support I needed after reporting an incident.", "I received feedback on how my report was handled."],
        scale: [...AGREE, "Not sure or N/A"],
      },
    ],
  },
  {
    id: "open",
    title: "In your own words",
    intro: "Please don't include names, patient details, or anything that could identify a specific person.",
    questions: [
      {
        id: "missingInfo",
        type: "text",
        label: "What is the biggest piece of information not captured in standard reports that you think would make incident prevention easier?",
      },
      { id: "anythingElse", type: "text", label: "Anything else you'd like to add?" },
    ],
  },
];
