import type { AssistantAnswer, AssistantSuggestion, Term } from "../types";
import { glossary } from "./glossary";

// Pre-authored, deterministic responses keyed by intent.
// Each answer carries 4 depths so the user can reframe at the same place.

export const assistantSuggestions: AssistantSuggestion[] = [
  { id: "elig", prompt: "Am I eligible?", anchor: "eligibility" },
  { id: "register", prompt: "How do I register?", anchor: "checklist" },
  { id: "day", prompt: "What happens on election day?", anchor: "voting-day" },
  { id: "timeline", prompt: "Show the full election timeline", anchor: "timeline" },
  { id: "docs", prompt: "What documents do I need?", anchor: "checklist" },
  { id: "first", prompt: "Explain this like I'm a first-time voter", anchor: "process" },
  { id: "compare", prompt: "Compare national and local elections", anchor: "process" },
  { id: "term", prompt: "What does constituency mean?", anchor: "glossary" },
];

const a = (
  quick: string,
  beginner: string,
  student: string,
  detailed: string,
  next?: string[]
): AssistantAnswer => ({ quick, beginner, student, detailed, next, source: "explainer" });

const normalize = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const hasAllWords = (query: string, phrase: string) =>
  normalize(phrase)
    .split(" ")
    .every((word) => query.includes(word));

const glossaryAliases: Record<string, string[]> = {
  constituency: ["constituency", "electoral area"],
  "electoral-roll": ["electoral roll", "voter roll", "voter list", "roll"],
  "polling-booth": ["polling booth", "polling station", "voting booth", "booth"],
  nomination: ["nomination", "candidate nomination"],
  ballot: ["ballot", "ballot paper"],
  evm: ["evm", "electronic voting machine", "voting machine"],
  counting: ["counting", "vote count"],
  majority: ["majority"],
  turnout: ["turnout", "voter turnout"],
  "code-of-conduct": ["model code", "code of conduct", "election rules"],
  epic: ["epic", "voter id", "voter card"],
  "returning-officer": ["returning officer"],
  candidate: ["candidate"],
  manifesto: ["manifesto"],
  "tendered-ballot": ["tendered ballot", "challenged ballot"],
};

function answerFromTerm(term: Term): AssistantAnswer {
  return {
    quick: term.short,
    beginner: term.plain,
    student: `${term.short} ${term.matters}`,
    detailed: `${term.short} ${term.plain} ${term.matters}`,
    next: term.related
      .map((id) => glossary.find((entry) => entry.id === id)?.term)
      .filter(Boolean)
      .slice(0, 3)
      .map((label) => `What does ${label} mean?`),
    source: "definition",
  };
}

function glossaryAnswerFor(query: string): AssistantAnswer | null {
  const q = normalize(query);
  const found = glossary.find((term) => {
    const termName = normalize(term.term);
    const aliases = (glossaryAliases[term.id] ?? []).map(normalize);
    return (
      q === termName ||
      q.includes(termName) ||
      aliases.some((alias) => q === alias || q.includes(alias)) ||
      (q.includes("mean") && (hasAllWords(q, term.term) || aliases.some((alias) => hasAllWords(q, alias))))
    );
  });

  return found ? answerFromTerm(found) : null;
}

export const assistantAnswers: Record<string, AssistantAnswer> = {
  "am i eligible": a(
    "Usually: a citizen, 18 or older, ordinarily resident at your address, and not legally disqualified.",
    "Three quick checks: are you a citizen, are you old enough (often 18+), and is this address where you actually live? If yes, you're typically eligible.",
    "Eligibility is set by your jurisdiction's electoral law. Common criteria include citizenship, an age threshold (commonly 18), ordinary residence in the constituency, and absence of statutory disqualifications (e.g., declared of unsound mind by a competent court, or specific convictions where the law applies).",
    "Eligibility is a statutory test under your country's representation-of-people legislation. The shared elements across most democracies are: (1) citizenship, (2) reaching the prescribed age on the qualifying date, (3) ordinary residence in the relevant constituency on the qualifying date, and (4) not being subject to listed disqualifications. Note that eligibility to be registered is distinct from being on the roll — you must enrol.",
    ["How do I register?", "What documents do I need?"]
  ),
  "how do i register": a(
    "Fill the new-voter form online (or at your local office) with proof of age and address before the cut-off.",
    "Find your authority's online registration portal, fill the new-voter form, attach a recent photo and proof of age + address, and submit. Save the receipt.",
    "Registration adds you to the electoral roll for a specific constituency. Most authorities provide an online portal and offline option through booth-level officers; supporting documents typically include proof of age, citizenship (where required), residence, and a recent photo. After submission, your application is field-verified before inclusion in the published roll.",
    "Registration is the act of being included on the electoral roll for a constituency. Submission can be online via the authority's official portal or offline through a booth-level officer. Required documentation generally covers age, residence, and (where applicable) citizenship status. Following submission, a field verification visit is normally conducted before your name is included in the next published version of the roll. Late registrations, even where accepted, may not reflect for the immediate election.",
    ["What documents do I need?", "How do I check I'm on the roll?"]
  ),
  "what happens on election day": a(
    "Show ID, get verified, vote in the booth's secrecy. A few minutes once you reach the front.",
    "You go to your assigned polling station, show an accepted photo ID, an officer marks you on the roll, your finger is inked, and you cast your vote in private. Quick once you're at the front of the queue.",
    "Polling day follows a standard officer-by-officer flow: identity check against the roll, indelible ink and slip issuance, and a secret ballot in the polling compartment. Polling agents from candidates observe to ensure procedural fairness.",
    "Polling day is the operational climax of the cycle. The polling station opens at the prescribed hour with a mock poll attended by polling agents. Voters are checked against the marked copy of the roll, identified by a prescribed list of photo documents, marked with indelible ink to prevent duplicate voting, and routed to the polling compartment. The vote is cast under secrecy. The presiding officer maintains the formal record and addresses any disputes through tendered ballots and challenged-vote provisions.",
    ["What documents do I need?", "What if my name is missing?"]
  ),
  "show the full election timeline": a(
    "Seven phases: announcement, registration, nomination, campaign, polling, counting, post-election.",
    "Think of it as seven stages: setup is announced, voters register, candidates file, parties campaign, you vote, votes are counted, and the new government takes shape.",
    "Phases: (1) announcement & code of conduct, (2) voter registration & roll updates, (3) candidate nomination & scrutiny, (4) campaign period including silence, (5) polling, (6) counting & declaration, (7) post-election formalities. Each has its own deadlines and rules.",
    "An election cycle is a sequence of legally bounded phases. The schedule is gazetted by the authority, triggering the model code of conduct. Roll updates, including additions, deletions, and corrections, conclude before nominations. Candidates file affidavits and nominations, undergo scrutiny, and may withdraw within a window. The campaign period runs to a statutory silence period, after which polling occurs in one or more phases. Counting follows polling under candidate-agent observation, and the returning officer formally declares results. Post-election processes include notifications, oaths, and statutorily-permitted petitions.",
    ["Explain polling day in simple terms"]
  ),
  "what documents do i need": a(
    "An original accepted photo ID; address proof for registration; a recent photo for new applications.",
    "For voting day: an accepted original photo ID. For first-time registration: proof of age, address, and a recent photograph. Always carry originals.",
    "Acceptable identity documents are listed by the authority and typically include national ID cards, passports, driver's licences, and similar. For registration, the supporting documents establish age, residence, and (where applicable) citizenship status. Photocopies are usually not accepted at the polling station.",
    "Documentary requirements separate registration from voting. Registration documentation establishes statutory eligibility — age, residence, citizenship — through prescribed instruments published by the authority. Voting-day identification establishes the voter as the same person on the roll; the prescribed list of acceptable documents is normally restricted to government-issued photo identifiers in their original form, with explicit exclusions on photocopies and some classes of expired documents.",
    ["How do I register?"]
  ),
  "explain this like i'm a first-time voter": a(
    "Get on the roll, find your polling station, carry an accepted ID, and vote on the day.",
    "Three things matter: (1) make sure your name is on the electoral roll for your address, (2) know exactly which polling station to go to, and (3) carry an accepted photo ID on the day. The actual vote takes a few minutes.",
    "First-time voters benefit from doing the prep early. Verify your name on the published roll using the official lookup. Save your polling station address and accepted-ID list. Read the candidate list a day ahead so you recognise names and symbols. On the day, arrive within polling hours; the staff will guide you.",
    "For first-time voters, the cycle's logistics matter as much as the principle. Confirm enrolment by searching the published roll. Note the polling station and accepted identification ahead of time. Consider reading candidate affidavits where available so the choice is informed. On polling day, the procedure is standardised — identity check, ink, secret ballot — and accessibility provisions exist for elderly, disabled, and pregnant voters.",
    ["What happens on election day?", "What if my name is missing?"]
  ),
  "compare national and local elections": a(
    "National elections fill the country's legislature; local elections fill town/city councils. Cycles, ballots, and stakes differ.",
    "Same booth, often a different ballot. National elections elect representatives to the country's legislature on big-issue mandates; local elections elect councillors who decide everyday things like roads, water, and parks.",
    "National elections decide the legislature and (often, indirectly) the executive. Local elections decide municipal or panchayat-level offices. Eligibility on the roll is shared, but ballots, candidates, and constituencies differ. Local elections often have lower turnout but the most direct service delivery impact.",
    "Federal/national contests determine the composition of the central legislature, with downstream consequences for the executive in parliamentary systems. Local contests fill municipal councils, mayoral offices, and panchayats, with statutory remits over service delivery. While the underlying electoral roll is shared, constituency boundaries, ballots, and rules differ. Comparative civic engagement is uneven — local elections deliver the most direct everyday impact yet often see lower turnout than national contests.",
    ["Show the full election timeline"]
  ),
  "what does constituency mean": a(
    "A defined area whose voters elect one (or more) representative.",
    "It's your electoral neighbourhood. Everyone who lives there votes for the same set of candidates.",
    "A constituency is a delimited geographical unit defined by the delimitation authority. Voters within it choose between the candidates contesting that seat. Boundaries are revised periodically to balance population.",
    "A constituency is a unit of representation, demarcated by the delimitation commission to balance population, geography, and statutory considerations. Each constituency returns a defined number of representatives — usually one — and the contesting candidate set is constituency-specific. Your registration ties you to exactly one constituency for a given election type.",
    ["Where do I vote?"]
  ),
  "how do i check im on the roll": a(
    "Use the official roll lookup with your name or voter ID and confirm your polling station matches your address.",
    "Open the official electoral roll search, type your name or voter ID, and check three things: your name appears, the constituency is correct, and the polling station matches where you live now.",
    "Checking the roll is the most important pre-voting verification step. Use the authority's search tool or published PDF roll to confirm inclusion, constituency, serial number, and polling station. If anything is wrong, file a correction or transfer before the deadline.",
    "Verification against the published electoral roll is the authoritative test for whether you can cast a regular vote in that constituency. A valid search should confirm your inclusion, constituency assignment, serial number, part number, and polling station. If you recently registered or changed address, re-check after publication of the final roll and keep your submission receipt in case supplementary additions are relevant.",
    ["What if my name is missing?", "Where do I vote?"]
  ),
  "what if my name is missing": a(
    "Ask staff to check supplementary rolls and carry any registration receipt you have.",
    "First check the official roll again. If your name is still missing on polling day, ask the presiding officer to check supplementary lists. Bring your registration receipt or reference number if you registered recently.",
    "A missing name normally prevents a regular vote, but it does not end the inquiry. Officers should check supplementary additions, recent corrections, and your reference documents. If someone has already voted in your name, ask about a tendered or challenged ballot.",
    "If your name is absent from the marked copy of the roll, the presiding officer should verify whether it appears in supplementary additions or recently published corrections. Carrying your registration acknowledgement improves the chance of a quick resolution. Where impersonation is suspected, you may have a statutory right to a tendered or challenged ballot; request that process explicitly and note the officer's response.",
    ["How do I check I'm on the roll?", "Where do I vote?"]
  ),
  "where do i vote": a(
    "At the polling station assigned to the address where you're registered.",
    "You vote only at the polling station linked to your registered address. Check the official lookup before you leave home.",
    "Polling stations are allocated by constituency and address, not by convenience. The official roll or polling-station finder will show the exact location and part number you should use on election day.",
    "A voter may cast a regular ballot only at the polling station corresponding to the electoral part in which their name appears. This is why address changes must be processed before the cut-off. Consult the official station finder or published roll to confirm your exact booth, building, and part number before polling day.",
    ["What documents do I need?", "What does polling booth mean?"]
  ),
};

// Lightweight matcher: exact key, then substring intent
export function answerFor(query: string): AssistantAnswer | null {
  const q = normalize(query);
  if (!q) return null;
  if (assistantAnswers[q]) return assistantAnswers[q];
  const glossaryAnswer = glossaryAnswerFor(q);
  if (glossaryAnswer) return glossaryAnswer;
  // intent fallback
  const intents: [string, string][] = [
    ["eligib", "am i eligible"],
    ["minimum age", "am i eligible"],
    ["age requirement", "am i eligible"],
    ["old enough", "am i eligible"],
    ["register", "how do i register"],
    ["registration", "how do i register"],
    ["on the roll", "how do i check im on the roll"],
    ["electoral roll", "how do i check im on the roll"],
    ["voter roll", "how do i check im on the roll"],
    ["name is missing", "what if my name is missing"],
    ["name missing", "what if my name is missing"],
    ["election day", "what happens on election day"],
    ["polling day", "what happens on election day"],
    ["timeline", "show the full election timeline"],
    ["phases", "show the full election timeline"],
    ["stages", "show the full election timeline"],
    ["document", "what documents do i need"],
    ["first-time", "explain this like i'm a first-time voter"],
    ["first time", "explain this like i'm a first-time voter"],
    ["compare", "compare national and local elections"],
    ["constituency", "what does constituency mean"],
    ["where do i vote", "where do i vote"],
  ];
  for (const [needle, key] of intents) {
    if (q.includes(needle)) return assistantAnswers[key];
  }
  if (q.includes("age") && (q.includes("vote") || q.includes("eligible") || q.includes("requirement"))) {
    return assistantAnswers["am i eligible"];
  }
  return null;
}
