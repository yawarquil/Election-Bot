import type { Faq, MythFact } from "../types";

export const faqs: Faq[] = [
  {
    id: "moved-vote",
    question: "Can I vote if I moved recently?",
    answer:
      "Usually you must be registered at your current address before the cut-off date. If you moved before the cut-off, file a transfer or address-change form. If your name still appears at the old address, you typically have to vote there for that election.",
    followups: ["What documents do I need?", "How do I update my address?"],
    category: "common-question",
  },
  {
    id: "name-missing",
    question: "What if my name is missing from the electoral roll?",
    answer:
      "Check supplementary rolls and the official lookup tool first. If you recently registered, carry your reference receipt. At the polling station, ask the presiding officer to verify additions. If still unresolved, you may have a right to a tendered or challenged ballot — ask explicitly.",
    followups: ["Where do I check the official roll?"],
    category: "common-question",
  },
  {
    id: "id-required",
    question: "Do I need a photo ID to vote?",
    answer:
      "Most authorities require an original photo ID from an accepted list. Save the official list ahead of time and carry an original — photocopies are usually not accepted.",
    followups: ["Which IDs are accepted?"],
    category: "common-question",
  },
  {
    id: "no-knowledge",
    question: "Can I vote without knowing the candidates well?",
    answer:
      "Yes. The vote is yours regardless. If you'd prefer not to choose any candidate, many systems allow a 'none of the above' option. Reading the official candidate list a day ahead is a useful baseline.",
    followups: ["How do I read candidate affidavits?"],
    category: "common-question",
  },
  {
    id: "auto-register",
    question: "Is registration automatic when I turn 18?",
    answer:
      "Not in most systems. Even where eligibility is automatic at 18, your name must still be enrolled on the roll for your address. Check, and register if needed.",
    category: "common-question",
  },
  {
    id: "wrong-details",
    question: "What if I made a mistake in my registration?",
    answer:
      "File the correction form for that specific field with supporting documents. Corrections after the roll is finalised may not reflect for the upcoming election but can be carried into the next.",
    category: "common-question",
  },
  {
    id: "secret-ballot",
    question: "Is my vote secret?",
    answer:
      "Yes. The booth is designed for secrecy and your individual vote is not linked to your identity in the count. Photographing inside the booth is usually prohibited to protect this.",
    category: "common-question",
  },
  {
    id: "queue-cutoff",
    question: "What if the queue is long when polls close?",
    answer:
      "If you joined the queue before closing time, you are typically allowed to vote even if the queue extends past it. Stay in line and the officers will guide you.",
    category: "common-question",
  },
];

export const mythsAndFacts: MythFact[] = [
  {
    id: "myth-photo-allowed",
    myth: "You can take a selfie inside the booth.",
    fact:
      "Most jurisdictions prohibit photography inside the polling booth. Selfies are usually allowed only outside, after voting.",
    why:
      "Booth secrecy protects voters from coercion. Sharing a photo of your marked ballot can break that protection.",
  },
  {
    id: "myth-id-photocopy",
    myth: "A photocopy of your ID is fine.",
    fact: "Originals are typically required. Photocopies are commonly rejected.",
    why: "Original documents help officers verify identity reliably and prevent impersonation.",
  },
  {
    id: "myth-vote-anywhere",
    myth: "You can vote at any nearby polling station.",
    fact:
      "You must vote at the polling station tied to your registered address.",
    why:
      "Each station holds the roll for a specific area. Cross-station voting would break the audit trail.",
  },
  {
    id: "myth-auto-after-18",
    myth: "Your name appears automatically when you turn 18.",
    fact: "In most systems, you still have to register and confirm your details.",
    why: "The roll is a record of who has applied — turning 18 makes you eligible, not enrolled.",
  },
  {
    id: "myth-results-instant",
    myth: "Whoever leads early has won.",
    fact:
      "Trends are not declarations. Results are official only when the returning officer announces them.",
    why: "Early counts can swing as more centres report; treat trends as provisional.",
  },
];
