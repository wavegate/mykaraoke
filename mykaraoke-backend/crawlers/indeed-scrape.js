import pkg from "pg";
const { Client } = pkg;
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";

const client = new Client({
  ssl: {
    rejectUnauthorized: false,
  },
});

await client.connect();

// await client.query(
//     "INSERT INTO linkedin_jobs (job_id, job_position, job_link, company_name, company_link, job_location, job_posting_date, seniority_level, employment_type, job_function, industries, job_description, recruiter_name, recruiter_title) VALUES ($1, $2, $3, $4, $5, $6, TO_DATE($7, 'YYYY-MM-DD'), $8, $9, $10, $11, $12, $13, $14) RETURNING *;",
//     jobDetails
//   )

const file = "./crawlers/dataset_indeed-scraper_2023-09-16_01-10-37-409.json";

fs.readFile(file, "utf8", async (err, data) => {
  if (err) {
    console.error("Error:", err);
    return;
  }

  try {
    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Use the JSON data here
    for (const job of jsonData) {
      const jobDetails = [
        job.id,
        job.positionName,
        job.salary,
        job.company,
        job.location,
        job.url,
        job.postedAt,
        job.postingDateParsed,
        job.description,
        job.externalApplyLink,
      ];
      await client.query(
        "INSERT INTO indeed_jobs (id, position_name, salary, company, location, url, posted_at, posting_date_parsed, description, external_apply_link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT (id) DO NOTHING;",
        jobDetails
      );
    }
  } catch (error) {
    console.error("JSON parsing error:", error);
  }
});
