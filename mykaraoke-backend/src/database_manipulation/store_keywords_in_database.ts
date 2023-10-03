import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import prisma from "../config/database.js";

await prisma.keyword.deleteMany({});

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

    // Use the JSON data here
    for (let keywordTuple of jsonData) {
      const keyword: any = {
        name: keywordTuple[0],
        count: keywordTuple[1],
        category: keywordTuple[2] || undefined,
      };
      const newKeyword = await prisma.keyword.create({
        data: keyword,
      });
      // console.log("New keyword created:", newKeyword);
    }
  } catch (error) {
    console.error("JSON parsing error:", error);
  }
});
