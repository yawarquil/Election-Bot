import type { VotingDayItem } from "../types";

export const votingDayItems: VotingDayItem[] = [
  // What to carry
  {
    id: "vd-id",
    group: "carry",
    title: "An accepted photo ID (original)",
    body:
      "Most authorities require the original. Photocopies are usually not accepted. Carry one of the accepted documents from the official list.",
  },
  {
    id: "vd-card",
    group: "carry",
    title: "Your voter slip or voter card, if you have one",
    body:
      "Helpful for finding your serial number quickly, but it is the photo ID — not the slip — that establishes identity.",
  },
  // Verify before going
  {
    id: "vd-verify-name",
    group: "verify",
    title: "Verify your name on the roll",
    body:
      "Quickly check the official roll the night before. If your name is missing, you can still ask at the polling station — see the issue section below.",
  },
  {
    id: "vd-verify-station",
    group: "verify",
    title: "Confirm your assigned polling station",
    body:
      "It is tied to your registered address, not your current location. Check the official lookup before leaving.",
  },
  // Where to go
  {
    id: "vd-arrival",
    group: "where",
    title: "Arrive within polling hours",
    body:
      "If you join the queue before closing time, you will normally be allowed to vote even if the queue extends past it.",
  },
  {
    id: "vd-station-layout",
    group: "where",
    title: "Look for the entry queue and the women's queue (if applicable)",
    body:
      "Some stations have separate queues. Officers will direct you. If you have any access need, mention it at the entrance.",
  },
  // Inside the booth
  {
    id: "vd-officer",
    group: "inside",
    title: "First officer: identity check",
    body:
      "Your name and ID are matched against the roll. They mark you off and direct you forward.",
  },
  {
    id: "vd-officer-2",
    group: "inside",
    title: "Second officer: indelible ink and slip",
    body:
      "Your finger is inked and you may receive a slip. Keep moving forward to the booth.",
  },
  {
    id: "vd-cast",
    group: "inside",
    title: "Cast your vote in secrecy",
    body:
      "Inside the booth, your vote is private. Take your time. Don't photograph the booth or the ballot — it is usually prohibited.",
  },
  {
    id: "vd-confirm",
    group: "inside",
    title: "Confirm and exit calmly",
    body:
      "A short confirmation indicator (e.g., a printed slip behind glass for a few seconds) tells you the vote was recorded.",
  },
  // Issues
  {
    id: "vd-name-missing",
    group: "if-issue",
    title: "If your name is missing",
    body:
      "Ask the presiding officer to check supplementary lists. Carry your reference number or receipt if you registered recently. You may also escalate to the booth-level officer or returning officer.",
  },
  {
    id: "vd-details-wrong",
    group: "if-issue",
    title: "If your details are wrong",
    body:
      "Minor mismatches (initials, photo) often do not block your vote if your identity is established by ID. Officers will note the discrepancy.",
  },
  {
    id: "vd-conflict",
    group: "if-issue",
    title: "If someone has already voted in your name",
    body:
      "You may be allowed to cast a tendered (challenged) ballot. Ask the presiding officer — this is your right.",
  },
  // Accessibility
  {
    id: "vd-access-help",
    group: "accessibility",
    title: "Assistance for elderly or disabled voters",
    body:
      "Officers can provide priority entry, a companion, ramps, or assistance inside the booth. Ask without hesitation — it is a recognised right.",
  },
  {
    id: "vd-access-braille",
    group: "accessibility",
    title: "Braille and other accessible features",
    body:
      "Many machines and ballots include Braille markers or audio cues. Ask the presiding officer for the available options.",
  },
];

export const votingDayGroups: { id: VotingDayItem["group"]; label: string; tag: string }[] =
  [
    { id: "carry", label: "What to carry", tag: "Bring" },
    { id: "verify", label: "Verify before you leave", tag: "Confirm" },
    { id: "where", label: "When you arrive", tag: "Arrival" },
    { id: "inside", label: "Inside the polling station", tag: "Inside" },
    { id: "if-issue", label: "If something is wrong", tag: "Issue" },
    { id: "accessibility", label: "Accessibility & assistance", tag: "Access" },
  ];
