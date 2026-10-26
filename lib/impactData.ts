// ILLUSTRATIVE PLACEHOLDER DATA — not real results. Replace with real figures before sharing publicly.

export const SAMPLE_DATA = true;

export const headline = [
  { label: "Reports submitted", value: "1,248", note: "across 6 pilot facilities" },
  { label: "Fewer incidents per 100 staff", value: "−32%", note: "vs. baseline quarter" },
  { label: "Staff who feel safe at work", value: "71%", note: "up from 48% at baseline" },
  { label: "Median time to report", value: "4 min", note: "down from 38 min on paper forms" },
];

// Share of staff answering "Somewhat" or "Strongly agree" to "I feel safe at work."
export const feelSafe = [
  { period: "Q1 '25", value: 48 },
  { period: "Q2 '25", value: 51 },
  { period: "Q3 '25", value: 57 },
  { period: "Q4 '25", value: 62 },
  { period: "Q1 '26", value: 66 },
  { period: "Q2 '26", value: 69 },
  { period: "Q3 '26", value: 71 },
];

// Incidents per 100 staff per quarter, baseline vs. latest quarter.
export const exposure = [
  { type: "Verbal abuse", baseline: 41, latest: 29 },
  { type: "Physical aggression", baseline: 14, latest: 8 },
  { type: "Horizontal violence", baseline: 11, latest: 8 },
  { type: "Sexual harassment", baseline: 6, latest: 4 },
];

// Median minutes to file a report.
export const timeToReport = [
  { method: "Paper form", minutes: 38 },
  { method: "Hospital intranet", minutes: 21 },
  { method: "SAFE.AI", minutes: 4 },
];

// Share of experienced incidents that were reported.
export const reportingRate = [
  { period: "Q1 '25", value: 19 },
  { period: "Q2 '25", value: 24 },
  { period: "Q3 '25", value: 33 },
  { period: "Q4 '25", value: 41 },
  { period: "Q1 '26", value: 47 },
  { period: "Q2 '26", value: 52 },
  { period: "Q3 '26", value: 58 },
];

export const outcomes = [
  "Panic buttons added to 3 emergency triage rooms after repeated late-evening reports.",
  "Second staff member scheduled on night reception in 2 facilities.",
  "De-escalation refresher training rolled out to 210 nurses.",
  "Post-incident debrief now offered within 48 hours in all pilot units.",
];
