import type { Phase } from "../types";

// A neutral, regionally-shaped timeline. The labels and durations are
// generic enough to read accurately for most parliamentary or presidential
// systems. Region-specific deadline math should layer on top of this.

export const timelinePhases: Phase[] = [
  {
    key: "announcement",
    index: 0,
    label: "Announcement & Setup",
    shortLabel: "Announcement",
    durationLabel: "1–2 weeks",
    summary:
      "The election authority confirms the schedule and begins administrative setup.",
    meaning:
      "An official date is set. Election rules become enforceable, polling areas are notified, and the public timeline for registration, nomination, and voting becomes visible.",
    whoIsInvolved: [
      "Election authority",
      "Local administrative officers",
      "Political parties (notified)",
      "The press",
    ],
    citizenActions: [
      "Note the election date and key deadlines",
      "Confirm which constituency or district you fall under",
      "Begin gathering the documents you'll need",
    ],
    checkpoints: [
      { label: "Schedule announced", tone: "info" },
      { label: "Code of conduct in effect", tone: "warn" },
    ],
    commonMistakes: [
      "Assuming the date applies the same way to every region",
      "Waiting until the end of registration to verify your details",
    ],
    tips: [
      "Save the official authority's website and helpline number now",
      "Confirm your region's specific dates — they often differ from the national headline",
    ],
  },
  {
    key: "registration",
    index: 1,
    label: "Voter Registration & Roll Updates",
    shortLabel: "Registration",
    durationLabel: "3–6 weeks",
    summary:
      "Eligible citizens are added to the electoral roll, or update their existing record.",
    meaning:
      "Only citizens whose names appear on the electoral roll for a constituency may vote there. New voters register; existing voters check, correct, or update their record.",
    whoIsInvolved: [
      "Eligible citizens",
      "Booth-level officers",
      "Election authority verification staff",
    ],
    citizenActions: [
      "If you're 18+ and not yet registered, register now",
      "If you've moved, update your address",
      "If your name, photo, or details are incorrect, file a correction",
      "Verify your name appears in the electoral roll for the right polling station",
    ],
    checkpoints: [
      { label: "Registration window opens", tone: "info" },
      { label: "Last date to register or correct", tone: "warn" },
      { label: "Final electoral roll published", tone: "ok" },
    ],
    commonMistakes: [
      "Registering at an old address",
      "Submitting forms without supporting documents",
      "Assuming registration is automatic",
    ],
    tips: [
      "Take a screenshot or photo of your submitted form receipt",
      "Re-verify your record on the official roll a few days later",
    ],
  },
  {
    key: "nomination",
    index: 2,
    label: "Candidate Nomination",
    shortLabel: "Nomination",
    durationLabel: "1–2 weeks",
    summary:
      "Candidates formally file to contest. Eligibility and paperwork are scrutinised.",
    meaning:
      "Nominations are filed, scrutinised, and finalised. After the withdrawal deadline, the final list of contesting candidates and their symbols is published.",
    whoIsInvolved: [
      "Candidates and proposers",
      "Returning officers",
      "Political parties",
    ],
    citizenActions: [
      "Read the final list of candidates for your constituency",
      "Look up candidates' affidavits and disclosures (where available)",
    ],
    checkpoints: [
      { label: "Nomination opens", tone: "info" },
      { label: "Scrutiny", tone: "info" },
      { label: "Final candidate list", tone: "ok" },
    ],
    commonMistakes: [
      "Confusing party symbols across constituencies",
      "Relying on social-media-only information about candidates",
    ],
    tips: [
      "Cross-check candidate details with the official authority's published list",
    ],
  },
  {
    key: "campaign",
    index: 3,
    label: "Campaign Period",
    shortLabel: "Campaign",
    durationLabel: "2–6 weeks",
    summary:
      "Candidates and parties present their case. Public discourse intensifies.",
    meaning:
      "Rallies, debates, manifestos, and media coverage. Campaign rules govern spending, conduct, and messaging.",
    whoIsInvolved: ["Candidates", "Parties", "Voters", "Media"],
    citizenActions: [
      "Read manifestos and key positions",
      "Attend or watch debates if available",
      "Verify claims against neutral sources",
      "Locate your polling station ahead of time",
    ],
    checkpoints: [
      { label: "Active campaigning", tone: "info" },
      { label: "Silence period begins", tone: "warn" },
    ],
    commonMistakes: [
      "Trusting forwarded messages without verifying",
      "Skipping the silence-period rules in public posts",
    ],
    tips: [
      "Compare candidates on issues you care about — not just personality",
      "Bookmark your polling station map link",
    ],
  },
  {
    key: "polling",
    index: 4,
    label: "Polling Day",
    shortLabel: "Polling",
    durationLabel: "1 day (per phase)",
    summary:
      "Eligible voters cast their ballots at assigned polling stations.",
    meaning:
      "Voters present accepted ID, are verified against the roll, and cast a secret ballot. Stations are staffed by officers and observed by polling agents.",
    whoIsInvolved: [
      "Voters",
      "Polling officers",
      "Candidates' polling agents",
      "Security personnel",
    ],
    citizenActions: [
      "Carry an accepted photo ID",
      "Arrive within polling hours",
      "Verify your name and serial number before queueing",
      "Cast your vote in the secrecy of the booth",
      "Check the inked finger / receipt as confirmation",
    ],
    checkpoints: [
      { label: "Polls open", tone: "info" },
      { label: "Mid-day turnout reported", tone: "info" },
      { label: "Polls close", tone: "ok" },
    ],
    commonMistakes: [
      "Forgetting to bring a valid photo ID",
      "Going to the wrong polling station",
      "Photographing the ballot or booth (often prohibited)",
    ],
    tips: [
      "Avoid the lunchtime queue surge if you can",
      "If you have accessibility needs, ask the presiding officer for assistance",
    ],
  },
  {
    key: "counting",
    index: 5,
    label: "Counting & Results",
    shortLabel: "Counting",
    durationLabel: "1–3 days",
    summary:
      "Votes are counted under observation. Trends and final results are announced.",
    meaning:
      "Counting happens at designated centres with candidates' agents present. Trends emerge over hours; final results are formally declared by the returning officer.",
    whoIsInvolved: [
      "Counting staff",
      "Returning officers",
      "Candidates' agents",
      "Observers",
    ],
    citizenActions: [
      "Follow updates from the official authority's results portal",
      "Be patient — early trends are not the final outcome",
      "Watch for source verification before resharing",
    ],
    checkpoints: [
      { label: "Counting begins", tone: "info" },
      { label: "Trends visible", tone: "info" },
      { label: "Final declaration", tone: "ok" },
    ],
    commonMistakes: [
      "Confusing leads with declared winners",
      "Resharing unverified projections",
    ],
    tips: [
      "Treat the official portal as the source of truth",
    ],
  },
  {
    key: "post-election",
    index: 6,
    label: "Post-Election & Government Formation",
    shortLabel: "Post-Election",
    durationLabel: "Days to weeks",
    summary:
      "Winners are notified, formalities are completed, and the next government takes shape.",
    meaning:
      "Elected representatives are sworn in. In parliamentary systems, governments are formed and confidence is established. Petitions and audits, if any, follow due process.",
    whoIsInvolved: [
      "Elected representatives",
      "Election authority",
      "Constitutional offices",
    ],
    citizenActions: [
      "Note your representative's contact details",
      "Stay engaged through official channels and constituency events",
    ],
    checkpoints: [
      { label: "Notification of returns", tone: "info" },
      { label: "Oath / swearing-in", tone: "ok" },
    ],
    commonMistakes: [
      "Disengaging entirely after results",
    ],
    tips: [
      "Civic life continues after the vote — your representative now has a public mailbox",
    ],
  },
];

export const getPhase = (key: Phase["key"]) =>
  timelinePhases.find((p) => p.key === key)!;
