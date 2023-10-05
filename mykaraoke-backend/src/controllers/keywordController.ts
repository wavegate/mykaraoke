import prisma from "../config/database.js";
import { Request, Response } from "express";

function extractNumbers(s: string): number[] {
  const regex = /(\d{1,3}(?:,\d{3})*(\.\d+)?)/g;
  const matches = s.match(regex);

  if (matches) {
    return matches.map((match) => parseFloat(match.replace(/,/g, "")));
  }

  return [];
}

function monthlyToHourly(
  monthlySalary: number,
  daysPerMonth: number = 21,
  hoursPerDay: number = 8
): number {
  return monthlySalary / (daysPerMonth * hoursPerDay);
}

function yearlyToHourly(
  yearlySalary: number,
  weeksPerYear: number = 50,
  daysPerWeek: number = 5,
  hoursPerDay: number = 8
): number {
  return yearlySalary / (weeksPerYear * daysPerWeek * hoursPerDay);
}

function extractAndAverage(s: string): number {
  // Check if the string contains "hour" or "year"
  const isHourly = s.includes("hour");
  const isYearly = s.includes("year");
  const isMonthly = s.includes("month");

  // Use regex to extract numbers. For yearly rates, we have to consider commas.
  const numbers = extractNumbers(s);
  let average = -1;
  if (numbers.length === 2) {
    average = numbers.reduce((prev, curr) => prev + curr, 0) / numbers.length;
  } else if (numbers.length === 1) {
    average = numbers[0];
  }
  if (isHourly) {
    return average;
  }
  if (isMonthly) {
    return monthlyToHourly(average);
  }
  if (isYearly) {
    return yearlyToHourly(average);
  }

  return NaN;
}

const getKeywords = async (req: Request, res: Response) => {
  try {
    const keywords = await prisma.keyword.findMany({
      include: {
        _count: {
          select: {
            jobListings: true,
          },
        },
        jobListings: {
          select: {
            salary: true,
          },
        },
        categories: true,
      },
      orderBy: [
        {
          jobListings: {
            _count: "desc",
          },
        },
      ],
    });
    if (keywords) {
      const averageSalary = keywords.map((keyword) => {
        const jobListings = keyword.jobListings;
        const convertedSalaries = jobListings
          .filter((jobListing) => {
            return jobListing.salary;
          })
          .map((jobListing) => {
            return extractAndAverage(jobListing.salary!);
          });
        const average =
          convertedSalaries.reduce((prev, curr) => prev + curr, 0) /
          convertedSalaries.length;
        return average;
      });

      const newKeywords = keywords.map((keyword, index) => {
        return {
          name: keyword.name,
          count: keyword._count.jobListings,
          categories: keyword.categories.map((category) => category.name),
          averageSalary: averageSalary[index],
        };
      });
      res.json(newKeywords);
    } else {
      return res.status(404).json({ message: "Keywords not found." });
    }
  } catch (error) {
    console.error("Error querying keywords:", error);
  }
};

export { getKeywords };
