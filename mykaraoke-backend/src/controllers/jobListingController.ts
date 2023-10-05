import prisma from "../config/database.js";
import { Request, Response } from "express";

type StateMap = {
  [key: string]: string;
};

const stateMapping: StateMap = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

function getStateFullName(address: string): string | null {
  // Extract state abbreviation
  const match = address.match(/\b[A-Z]{2}\b/);

  if (match) {
    return stateMapping[match[0]];
  } else {
    return null;
  }
}

const getJobListings = async (req: Request, res: Response) => {
  try {
    const queryResult = await prisma.jobListing.findMany({
      orderBy: {
        postingDate: "desc",
      },
      // include: {
      //   keywords: true,
      // },
    });
    if (queryResult) {
      res.json(queryResult);
    } else {
      return res.status(404).json({ message: "Job listings not found." });
    }
  } catch (error) {
    console.error("Error querying Job listings:", error);
  }
};

const getJobListingsByState = async (req: Request, res: Response) => {
  try {
    const queryResult = await prisma.jobListing.findMany({
      select: {
        location: true,
      },
    });
    if (queryResult) {
      const stateNames = queryResult.map((result) => {
        return getStateFullName(result.location!);
      });
      const stateNamesMap: Record<string, number> = {};
      stateNames.forEach((stateName) => {
        if (stateName) {
          stateNamesMap[stateName] = (stateNamesMap[stateName] || 0) + 1;
        }
      });
      res.json(stateNamesMap);
    } else {
      return res.status(404).json({ message: "Job listings not found." });
    }
  } catch (error) {
    console.error("Error querying Job listings:", error);
  }
};

export { getJobListings, getJobListingsByState };
