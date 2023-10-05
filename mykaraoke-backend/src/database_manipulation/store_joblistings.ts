import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import prisma from "../config/database.js";

await prisma.jobListing.deleteMany({});

const file =
  "./src/database_manipulation/dataset_indeed-scraper_2023-09-16_01-10-37-409.json";

fs.readFile(file, "utf8", async (err, data) => {
  if (err) {
    console.error("Error:", err);
    return;
  }

  try {
    // Parse the JSON data
    const jsonData = JSON.parse(data);

    for (const jobListing of jsonData) {
      prisma.jobListing
        .create({
          data: {
            title: jobListing.positionName,
            company: jobListing.company,
            description: jobListing.descriptionHTML,
            applyLink: jobListing.externalApplyLink,
            postingDate: jobListing.postingDateParsed,
            crawlDate: jobListing.scrapedAt,
            location: jobListing.location,
            source: "Indeed",
            salary: jobListing.salary,
            sourceId: jobListing.id,
            keywords: {
              connectOrCreate: jobListing.keywords.map((keyword: string) => {
                return {
                  where: { name: keyword },
                  create: { name: keyword },
                };
              }),
            },
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (error) {
    console.error("JSON parsing error:", error);
  }
});
