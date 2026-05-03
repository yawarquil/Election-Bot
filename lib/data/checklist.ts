import type { ChecklistItem, ScenarioId } from "../types";

// One library of items, each tagged with the scenarios it belongs to.
// The checklist UI generates the right list per user.
export const checklistLibrary: ChecklistItem[] = [
  {
    id: "confirm-eligibility",
    scenarios: ["first-time", "learning"],
    title: "Confirm you are eligible to vote",
    detail:
      "Check the eligibility criteria for your country and constituency: citizenship, age, ordinary residence, and any disqualifications.",
    urgency: "now",
    documents: ["Proof of age", "Proof of citizenship"],
    estMinutes: 5,
    category: "checklist",
  },
  {
    id: "register-new",
    scenarios: ["first-time"],
    title: "Register on the electoral roll",
    detail:
      "Complete the new-voter registration form online or at your local election office. Submit before the cut-off for your area.",
    urgency: "now",
    documents: ["Address proof", "Photo ID", "Recent photo"],
    caution:
      "Late registration usually cannot be honoured for the upcoming election.",
    estMinutes: 15,
    category: "checklist",
  },
  {
    id: "verify-roll",
    scenarios: ["first-time", "registered", "moved", "correction", "polling-info"],
    title: "Verify your name on the electoral roll",
    detail:
      "Search the official electoral roll using your name, EPIC/voter ID, or details. Confirm the constituency and polling station match where you live now.",
    urgency: "now",
    estMinutes: 3,
    category: "checklist",
  },
  {
    id: "update-address",
    scenarios: ["moved"],
    title: "Update your address on the roll",
    detail:
      "File the appropriate form (often a transfer or address-change form) with proof of your new address. Keep the receipt or reference number.",
    urgency: "now",
    documents: ["New address proof", "Existing voter ID"],
    estMinutes: 10,
    category: "checklist",
  },
  {
    id: "file-correction",
    scenarios: ["correction"],
    title: "File a correction in your record",
    detail:
      "Submit the correction form for the specific field (name, photo, age, gender, or relation) along with supporting documents.",
    urgency: "soon",
    documents: ["Supporting document for the field being corrected"],
    estMinutes: 10,
    category: "checklist",
  },
  {
    id: "find-station",
    scenarios: ["first-time", "registered", "moved", "polling-info"],
    title: "Locate your polling station",
    detail:
      "Use the official lookup tool to find the exact address and any access notes for your station.",
    urgency: "soon",
    estMinutes: 3,
    category: "checklist",
  },
  {
    id: "id-list",
    scenarios: ["first-time", "registered", "moved", "polling-info"],
    title: "Confirm which IDs are accepted",
    detail:
      "Save the official list of accepted photo IDs. Carry an original — most authorities do not accept photocopies.",
    urgency: "soon",
    estMinutes: 2,
    category: "checklist",
  },
  {
    id: "candidates",
    scenarios: ["first-time", "registered", "learning"],
    title: "Read the candidate list for your constituency",
    detail:
      "Open the official candidate list, including affidavits where available. Note the symbols you'll see on the ballot.",
    urgency: "later",
    estMinutes: 10,
    category: "explainer",
  },
  {
    id: "plan-day",
    scenarios: ["first-time", "registered", "polling-info"],
    title: "Plan your polling day",
    detail:
      "Pick a time outside peak hours, plan transport, and check the weather. If you have access needs, note them ahead of time.",
    urgency: "later",
    estMinutes: 5,
    category: "checklist",
  },
  {
    id: "myth-check",
    scenarios: ["learning", "first-time"],
    title: "Read 5 myths vs facts",
    detail:
      "A short read so you don't get caught out by common misconceptions about voting day, ID, or registration.",
    urgency: "info",
    estMinutes: 6,
    category: "explainer",
  },
  {
    id: "post-vote",
    scenarios: ["first-time", "registered", "learning"],
    title: "Save your representative's details after results",
    detail:
      "Once results are declared, note who represents you. They are now your point of contact for civic concerns.",
    urgency: "info",
    estMinutes: 3,
    category: "checklist",
  },
];

const checklistByScenario = checklistLibrary.reduce<Record<ScenarioId, ChecklistItem[]>>(
  (acc, item) => {
    item.scenarios.forEach((scenario) => {
      acc[scenario].push(item);
    });
    return acc;
  },
  {
    "first-time": [],
    registered: [],
    moved: [],
    correction: [],
    "polling-info": [],
    learning: [],
  }
);

export const checklistFor = (scenarioId: ScenarioId) => checklistByScenario[scenarioId] ?? [];
