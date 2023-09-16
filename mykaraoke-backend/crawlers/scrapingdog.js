import axios from "axios";
import pkg from "pg";
const { Client } = pkg;
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  ssl: {
    rejectUnauthorized: false,
  },
});

await client.connect();
const payload = {
  api_key: process.env.SCRAPING_DOG_API_KEY,
  field: "Frontend Developer",
  geoid: 102095887,
  page: "1",
};

const jobList = await axios
  .get("https://api.scrapingdog.com/linkedinjobs", { params: payload })
  .then((res) => res.data);
console.log(jobList);

for (const job of jobList) {
  // Define a regular expression pattern to match the jobId in the URL
  const jobIdPattern = /\/jobs\/view\/[^\/]+-(\d+)\?/;

  // Use the regular expression to extract the jobId from the URL
  const match = job.job_link.match(jobIdPattern);

  if (match) {
    const jobId = match[1];
    console.log(jobId);
    const jobInfo = await axios
      .get("https://api.scrapingdog.com/linkedinjobs", {
        params: {
          api_key: process.env.SCRAPING_DOG_API_KEY,
          job_id: jobId,
        },
      })
      .then((res) => res.data?.[0]);

    const jobDetails = [
      jobId,
      jobInfo.job_position,
      job.job_link,
      jobInfo.company_name,
      jobInfo.company_linkedin_id,
      jobInfo.job_location,
      job.job_posting_date,
      jobInfo.Seniority_level,
      jobInfo.Employment_type,
      jobInfo.Job_function,
      jobInfo.Industries,
      jobInfo.job_description,
      jobInfo.recruiter_details?.[0]?.recruiter_name,
      jobInfo.recruiter_details?.[0]?.recruiter_title,
    ];
    console.log(jobDetails);
    console.log(
      await client.query(
        "INSERT INTO linkedin_jobs (job_id, job_position, job_link, company_name, company_link, job_location, job_posting_date, seniority_level, employment_type, job_function, industries, job_description, recruiter_name, recruiter_title) VALUES ($1, $2, $3, $4, $5, $6, TO_DATE($7, 'YYYY-MM-DD'), $8, $9, $10, $11, $12, $13, $14) RETURNING *;",
        jobDetails
      )
    );
  } else {
    console.log("Job ID not found in the URL");
  }
}

client.on("error", (err) => console.log(err));
await client.end();
