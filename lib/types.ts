// ─── Core data models ──────────────────────────────────────────────────────
// Modular by region + electionType so the same components can render any
// jurisdiction. Designed to be source-aware: each item declares its category
// (official | explainer | checklist | faq | deadline | definition).

export type SourceCategory =
  | "official-guidance"
  | "explainer"
  | "checklist"
  | "common-question"
  | "deadline"
  | "definition";

export type ElectionType =
  | "national"
  | "state"
  | "local"
  | "presidential"
  | "parliamentary"
  | "assembly"
  | "municipal";

export interface Region {
  id: string;
  country: string;
  countryCode: string; // ISO-3166 alpha-2
  flagEmoji: string;
  electionAuthority: string;
  authorityShort: string;
  electionTypes: ElectionType[];
  notes?: string;
}

// ─── Timeline ──────────────────────────────────────────────────────────────
export type PhaseKey =
  | "announcement"
  | "registration"
  | "nomination"
  | "campaign"
  | "polling"
  | "counting"
  | "post-election";

export interface Phase {
  key: PhaseKey;
  index: number;        // 0..n for scrubber position
  label: string;        // editorial heading
  shortLabel: string;   // chip / mobile
  durationLabel: string; // e.g. "4–6 weeks"
  summary: string;      // single-sentence editorial line
  meaning: string;      // "what this stage means"
  whoIsInvolved: string[];
  citizenActions: string[];
  checkpoints: { label: string; tone: "info" | "warn" | "ok" }[];
  commonMistakes: string[];
  tips: string[];
}

// ─── Process flow steps (visual explainer) ─────────────────────────────────
export interface ProcessStep {
  id: string;
  label: string;
  caption: string;
  detail: string;
  who: string;
  glyph: "before" | "register" | "verify" | "vote" | "count" | "outcome";
}

// ─── Personalized checklist ────────────────────────────────────────────────
export type ScenarioId =
  | "first-time"
  | "registered"
  | "moved"
  | "correction"
  | "polling-info"
  | "learning";

export interface Scenario {
  id: ScenarioId;
  title: string;
  blurb: string;
}

export type Urgency = "now" | "soon" | "later" | "info";

export interface ChecklistItem {
  id: string;
  scenarios: ScenarioId[];
  title: string;
  detail: string;
  urgency: Urgency;
  documents?: string[];
  caution?: string;
  estMinutes?: number;
  category: SourceCategory;
}

// ─── Voting day guide ──────────────────────────────────────────────────────
export interface VotingDayItem {
  id: string;
  title: string;
  body: string;
  group: "carry" | "verify" | "where" | "inside" | "if-issue" | "accessibility";
}

// ─── FAQ + myth/fact ───────────────────────────────────────────────────────
export interface Faq {
  id: string;
  question: string;
  answer: string;
  followups?: string[];
  category: SourceCategory;
}

export interface MythFact {
  id: string;
  myth: string;
  fact: string;
  why: string;
}

// ─── Glossary ──────────────────────────────────────────────────────────────
export interface Term {
  id: string;
  term: string;
  short: string;     // dictionary-style
  plain: string;     // plain-language
  matters: string;   // "why it matters"
  related: string[]; // term ids
}

// ─── Assistant ─────────────────────────────────────────────────────────────
export type Depth = "quick" | "beginner" | "student" | "detailed";

export interface AssistantSuggestion {
  id: string;
  prompt: string;
  // optional anchor section to scroll to
  anchor?: string;
}

export interface AssistantAnswer {
  // each depth gives a different framing of the same answer
  quick: string;
  beginner: string;
  student: string;
  detailed: string;
  next?: string[]; // recommended next prompts
  source?: SourceCategory;
}

// ─── User scenario state (in-session) ──────────────────────────────────────
export interface UserState {
  regionId: string;
  electionType: ElectionType;
  scenario: ScenarioId;
  depth: Depth;
  completedChecklist: string[];
  largeText: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  theme: "light" | "dark" | "system";
}
