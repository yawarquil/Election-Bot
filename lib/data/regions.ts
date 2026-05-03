import type { Region } from "../types";

export const regions: Region[] = [
  {
    id: "in",
    country: "India",
    countryCode: "IN",
    flagEmoji: "🇮🇳",
    electionAuthority: "Election Commission of India",
    authorityShort: "ECI",
    electionTypes: ["national", "state", "local", "parliamentary", "assembly", "municipal"],
    notes:
      "General elections (Lok Sabha) are held every five years. State assemblies and local bodies follow separate cycles.",
  },
  {
    id: "us",
    country: "United States",
    countryCode: "US",
    flagEmoji: "🇺🇸",
    electionAuthority: "U.S. Election Assistance Commission & state offices",
    authorityShort: "EAC + State",
    electionTypes: ["national", "state", "local", "presidential", "municipal"],
    notes:
      "Federal elections occur every two years; presidential elections every four. Registration and rules vary by state.",
  },
  {
    id: "uk",
    country: "United Kingdom",
    countryCode: "GB",
    flagEmoji: "🇬🇧",
    electionAuthority: "Electoral Commission",
    authorityShort: "EC",
    electionTypes: ["national", "local", "parliamentary", "municipal"],
    notes:
      "General elections must be held at least every five years. Local elections are typically held in May.",
  },
  {
    id: "global",
    country: "Generic / Learning",
    countryCode: "XX",
    flagEmoji: "🌐",
    electionAuthority: "Your national or regional election authority",
    authorityShort: "Authority",
    electionTypes: ["national", "state", "local", "presidential", "parliamentary"],
    notes:
      "A neutral, region-agnostic walkthrough for learning the universal phases of an election.",
  },
];

export const getRegion = (id: string) =>
  regions.find((r) => r.id === id) ?? regions[regions.length - 1];
