import type { Term } from "../types";

export const glossary: Term[] = [
  {
    id: "constituency",
    term: "Constituency",
    short:
      "A defined geographical area whose voters elect one (or more) representative.",
    plain:
      "It's your electoral neighbourhood. Everyone who lives here votes for the same set of candidates.",
    matters:
      "Your vote counts inside your constituency. Where you're registered decides which candidates you can choose.",
    related: ["polling-booth", "electoral-roll"],
  },
  {
    id: "electoral-roll",
    term: "Electoral roll",
    short:
      "The official list of citizens registered to vote in a constituency.",
    plain:
      "A big list of names. If your name is on it, you can vote here. If not, you can't — even with ID.",
    matters:
      "Without your name on the roll, you can't cast a regular vote. This is the most important thing to verify.",
    related: ["constituency", "epic"],
  },
  {
    id: "polling-booth",
    term: "Polling booth (station)",
    short:
      "The physical location, assigned to your address, where you cast your ballot.",
    plain:
      "The school, hall, or office where you go to vote. You can't pick a different one.",
    matters:
      "Going to the wrong booth wastes time. Check the official lookup before you leave.",
    related: ["constituency"],
  },
  {
    id: "nomination",
    term: "Nomination",
    short:
      "The formal filing by which a candidate enters the contest.",
    plain:
      "It's how a candidate officially puts their name on the ballot.",
    matters:
      "Only after nominations are scrutinised and finalised is the candidate list locked.",
    related: ["candidate", "returning-officer"],
  },
  {
    id: "ballot",
    term: "Ballot",
    short:
      "The instrument used to record your vote — paper, electronic, or hybrid.",
    plain:
      "The thing you mark or press to vote.",
    matters:
      "Knowing which method your polling station uses tells you what to expect inside.",
    related: ["evm"],
  },
  {
    id: "evm",
    term: "EVM (Electronic Voting Machine)",
    short:
      "A device that records votes electronically. May be paired with a paper trail (e.g., VVPAT).",
    plain:
      "A press-button machine. You press the button next to your candidate and a light or beep confirms the vote.",
    matters:
      "It is designed for speed and secrecy. The paper trail (where used) lets results be verified.",
    related: ["ballot"],
  },
  {
    id: "counting",
    term: "Counting",
    short:
      "The official tally of votes after polling closes, conducted under observation.",
    plain:
      "Adding up everyone's vote, with watchers from each candidate present.",
    matters:
      "It is where the result is determined. Trends can shift — wait for declarations.",
    related: ["returning-officer"],
  },
  {
    id: "majority",
    term: "Majority",
    short:
      "The threshold required for a candidate or coalition to win.",
    plain:
      "Enough votes (or seats) to be ahead by the rules of the contest.",
    matters:
      "In some systems, the highest single number wins; in others, you need a coalition past 50%.",
    related: [],
  },
  {
    id: "turnout",
    term: "Turnout",
    short:
      "The percentage of registered voters who actually cast a ballot.",
    plain:
      "How many people on the roll showed up.",
    matters:
      "Higher turnout broadens the legitimacy of the result.",
    related: [],
  },
  {
    id: "code-of-conduct",
    term: "Model code / rules",
    short:
      "A set of campaign and conduct rules enforced from announcement to results.",
    plain:
      "Rules that everyone — parties, candidates, even officials — has to follow during the election.",
    matters:
      "It is what keeps the playing field fair: no government freebies right before voting, for example.",
    related: [],
  },
  {
    id: "epic",
    term: "Voter ID (EPIC)",
    short:
      "An identification card issued to enrolled voters by the election authority.",
    plain:
      "An ID card with your photo that proves you're on the roll.",
    matters:
      "Useful but not the only accepted ID. Carry an accepted original to vote.",
    related: ["electoral-roll"],
  },
  {
    id: "returning-officer",
    term: "Returning officer",
    short:
      "The official responsible for conducting the election in a constituency, including the count and declaration.",
    plain:
      "The person legally in charge of running the election in your area.",
    matters:
      "If something is wrong on polling day, escalation reaches the returning officer.",
    related: ["counting", "nomination"],
  },
  {
    id: "candidate",
    term: "Candidate",
    short:
      "A person formally nominated to contest the election.",
    plain:
      "Someone running for office, whose name appears on the ballot.",
    matters:
      "Reading the official candidate list (with affidavits) is more reliable than social media chatter.",
    related: ["nomination"],
  },
  {
    id: "manifesto",
    term: "Manifesto",
    short:
      "A published document by a party or candidate setting out their proposed agenda.",
    plain:
      "What they say they'll do if elected.",
    matters:
      "Compare claims with track records. Manifestos are promises, not guarantees.",
    related: ["candidate"],
  },
  {
    id: "tendered-ballot",
    term: "Tendered (challenged) ballot",
    short:
      "A ballot offered to a voter when their identity or status is contested.",
    plain:
      "If someone has voted in your name, you can ask for this special vote so your right is recorded.",
    matters:
      "It is your safety net at the booth. Ask the presiding officer.",
    related: [],
  },
];

export const findTerm = (id: string) => glossary.find((t) => t.id === id);
