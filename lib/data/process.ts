import type { ProcessStep } from "../types";

export const processSteps: ProcessStep[] = [
  {
    id: "before",
    label: "Before Election",
    caption: "Setup & schedule",
    detail:
      "The election authority confirms dates, notifies regions, and the public timeline becomes binding.",
    who: "Authority + officers",
    glyph: "before",
  },
  {
    id: "register",
    label: "Registration",
    caption: "You enter the roll",
    detail:
      "Eligible citizens register or update details so they appear on the electoral roll for their constituency.",
    who: "You + booth officers",
    glyph: "register",
  },
  {
    id: "verify",
    label: "Verification",
    caption: "Confirm before you vote",
    detail:
      "Check your name on the roll, your polling station, and the documents you'll need on the day.",
    who: "You",
    glyph: "verify",
  },
  {
    id: "vote",
    label: "Voting Day",
    caption: "Cast your ballot",
    detail:
      "Show ID, get verified, vote in the booth's secrecy. The process takes a few minutes once you reach the front of the queue.",
    who: "You + polling staff",
    glyph: "vote",
  },
  {
    id: "count",
    label: "Counting",
    caption: "Tally under observation",
    detail:
      "Ballots are counted at designated centres with candidate agents and observers present. Trends become results.",
    who: "Counting staff",
    glyph: "count",
  },
  {
    id: "outcome",
    label: "Outcome",
    caption: "Representatives take office",
    detail:
      "Winners are notified, sworn in, and the next government or council takes shape.",
    who: "Elected representatives",
    glyph: "outcome",
  },
];
