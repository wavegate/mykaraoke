import puppeteer from "puppeteer";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate the page to a URL
  // await page.goto("https://www.linkedin.com/");
  await page.goto(
    "https://www.linkedin.com/feed/?trk=homepage-basic_sign-in-submit"
  );

  //   // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  //   // Type into search box
  await page.waitForSelector("#session_key");

  await page.type("#session_key", "frankjobapptracker@gmail.com"); // Replace 'Your Text Here' with the desired text
  await page.type("#session_password", "testTest2@2"); // Replace 'Your Text Here' with the desired text

  await page.click(".sign-in-form__submit-btn--full-width");

  await page.waitForSelector(
    'span.t-12.block.t-black--light.t-normal.global-nav__primary-link-text[title="Jobs"]'
  );

  await page.click(
    'span.t-12.block.t-black--light.t-normal.global-nav__primary-link-text[title="Jobs"]'
  );

  await page.waitForSelector(
    "input.jobs-search-box__text-input.jobs-search-box__keyboard-text-input",
    "Web Developer"
  );

  // Perform any interactions with the input element, for example, typing text
  await page.type(
    "input.jobs-search-box__text-input.jobs-search-box__keyboard-text-input",
    "Web Developer"
  );

  await page.waitForTimeout(1000);

  await page.keyboard.press("Enter");

  // while (true) {
  await page.waitForTimeout(2000); // 2000 milliseconds (2 seconds)

  const listItems = await page.$$("li.jobs-search-results__list-item");
  // // Iterate and click each list item
  // for (const listItem of listItems) {
  //   await listItem.click();

  // Wait for a moment (optional)
  // You can use this to observe the changes on the page if necessary
  await page.waitForTimeout(1000); // 2000 milliseconds (2 seconds)
  await page.waitForSelector("h2.t-24.t-bold.jobs-unified-top-card__job-title");

  const title = await page.$eval(
    "h2.t-24.t-bold.jobs-unified-top-card__job-title",
    (element) => element.textContent.trim()
  );

  const description = await page.$eval(
    ".jobs-unified-top-card__primary-description",
    (element) => element.textContent.trim()
  );

  const parts = description.split(/·|\n/).map((part) => {
    return part.trim();
  });

  const parentElement = await page.$(
    ".jobs-unified-top-card__primary-description"
  );

  if (parentElement) {
    // Scrape the company name from the <a> tag
    const companyNameElement = await parentElement.$("a.app-aware-link");
    const companyName = await page.evaluate(
      (element) => element.textContent.trim(),
      companyNameElement
    );

    // Scrape the location, time, and applicants from <span> elements
    const spanElements = await parentElement.$$("span.tvm__text");

    const location = await parentElement.$eval(
      "span.white-space-pre:nth-child(3)",
      (spanElement) => spanElement.previousSibling.textContent.trim()
    );

    const time = await page.$eval(".tvm__text--neutral", (element) =>
      element.textContent.trim()
    );

    const applicants = await page.evaluate(
      (element) => element.textContent.trim(),
      spanElements[2]
    );
    // Log the scraped information
    console.log("Company Name:", companyName);
    console.log("Location:", location);
    console.log("Time:", time);
    console.log("Number of Applicants:", applicants);
  } else {
    console.error("Element not found.");
  }

  const buttonSelector = "//div[@class='jobs-apply-button--top-card']//button";
  const button = await page.waitForXPath(buttonSelector);

  // Click the button
  await button.click();

  // Wait for a new page to open (assuming the button click leads to a new page)
  await page.waitForTimeout(2000);
  const pages = await browser.pages();
  const newPage = pages[pages.length - 1];

  // Get the URL of the new tab
  const newPageUrl = newPage.url();
  await newPage.close();
  console.log("Application URL:" + newPageUrl);

  const insight = await page.$eval(
    ".jobs-unified-top-card__job-insight",
    (element) => element.textContent.trim()
  );

  const jobDescription = await page.$eval(
    ".jobs-description-content__text",
    (element) => element.textContent.trim()
  );

  //   const currentJobUrl = page.url();

  //   console.log("Job Title:", title);
  //   console.log("Description:", description);
  //   console.log("Insight:", insight);
  //   // console.log("Job Description:", jobDescription);
  //   console.log("Job Url:" + currentJobUrl);

  //   // Go back to the search results page
  // }

  // const url = new URL(page.url());
  // const currentParamValue = parseInt(url.searchParams.get("start") || 0);
  // url.searchParams.set("start", currentParamValue + 25);
  // const newUrl = url.toString();
  // await page.goto(newUrl);
  // }
})();
