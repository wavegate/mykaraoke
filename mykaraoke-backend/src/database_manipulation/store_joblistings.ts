import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import prisma from "../config/database.js";

await prisma.jobListing.deleteMany({});

const file =
  "./src/database_manipulation/dataset_indeed-scraper_2023-09-16_01-10-37-409.json";

function chunkArray(arr: any[], chunkSize: number) {
  const chunkedArr = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    chunkedArr.push(chunk);
  }
  return chunkedArr;
}

fs.readFile(file, "utf8", async (err, data) => {
  if (err) {
    console.error("Error:", err);
    return;
  }

  try {
    // Parse the JSON data
    const jsonData = JSON.parse(data);
    const chunkedData = chunkArray(jsonData, 20);
    for (const chunk of chunkedData) {
      await Promise.allSettled(
        chunk.map((chunk) => {
          return prisma.jobListing.create({
            data: {
              title: chunk.positionName,
              company: chunk.company,
              description: chunk.descriptionHTML,
              applyLink: chunk.externalApplyLink,
              listingLink: chunk.url,
              postingDate: chunk.postingDateParsed,
              crawlDate: chunk.scrapedAt,
              location: chunk.location,
              source: "Indeed",
              salary: chunk.salary,
              sourceId: chunk.id,
              keywords: {
                connectOrCreate: chunk.keywords.map((keyword: string) => {
                  return {
                    where: { name: keyword },
                    create: { name: keyword },
                  };
                }),
              },
            },
          });
        })
      );
      console.log("finished chunk");
    }
    // for (const jobListing of jsonData) {
    //   prisma.jobListing
    //     .create({
    //       data: {
    //         title: jobListing.positionName,
    //         company: jobListing.company,
    //         description: jobListing.descriptionHTML,
    //         applyLink: jobListing.externalApplyLink,
    //         postingDate: jobListing.postingDateParsed,
    //         crawlDate: jobListing.scrapedAt,
    //         location: jobListing.location,
    //         source: "Indeed",
    //         salary: jobListing.salary,
    //         sourceId: jobListing.id,
    //         keywords: {
    //           connectOrCreate: jobListing.keywords.map((keyword: string) => {
    //             return {
    //               where: { name: keyword },
    //               create: { name: keyword },
    //             };
    //           }),
    //         },
    //       },
    //     })
    // }
  } catch (error) {
    console.error("JSON parsing error:", error);
  }
});
