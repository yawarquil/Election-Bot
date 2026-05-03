import type { Scenario } from "../types";

export const scenarios: Scenario[] = [
  {
    id: "first-time",
    title: "First-time voter",
    blurb: "Eligible to vote for the first time. Wants the full picture, simply.",
  },
  {
    id: "registered",
    title: "Already registered",
    blurb: "Wants to confirm details and prepare for polling day.",
  },
  {
    id: "moved",
    title: "Moved address",
    blurb: "Needs to update address or transfer to a new constituency.",
  },
  {
    id: "correction",
    title: "Need a correction",
    blurb: "Name, photo, age, or other details on the roll need fixing.",
  },
  {
    id: "polling-info",
    title: "Need polling info",
    blurb: "Wants to find polling station, hours, and accepted ID.",
  },
  {
    id: "learning",
    title: "Just learning",
    blurb: "Curious about how elections work, no immediate action needed.",
  },
];
