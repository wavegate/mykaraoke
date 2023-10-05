import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import prisma from "../config/database.js";

const file =
  "./src/database_manipulation/dataset_indeed-scraper_2023-09-16_01-10-37-409categories.json";

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
          if (chunk.length === 3) {
            return prisma.keyword.update({
              where: { name: chunk[0] },
              data: {
                categories: {
                  connectOrCreate: {
                    where: { name: chunk[2] },
                    create: { name: chunk[2] },
                  },
                },
              },
            });
          } else {
            return Promise.resolve();
          }
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
