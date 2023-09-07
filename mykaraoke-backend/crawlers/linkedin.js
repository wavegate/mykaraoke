import puppeteer from "puppeteer";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://www.linkedin.com/");

  //   // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  //   // Type into search box
  await page.waitForSelector("#session_key");

  await page.type("#session_key", "frankjobapptracker@gmail.com"); // Replace 'Your Text Here' with the desired text
  await page.type("#session_password", ""); // Replace 'Your Text Here' with the desired text

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

  await page.waitForTimeout(2000); // 2000 milliseconds (2 seconds)

  const listItems = await page.$$("li.jobs-search-results__list-item");

  // Iterate and click each list item
  for (const listItem of listItems) {
    await listItem.click();

    // Wait for a moment (optional)
    // You can use this to observe the changes on the page if necessary
    await page.waitForTimeout(1000); // 2000 milliseconds (2 seconds)
    await page.waitForSelector(
      "h2.t-24.t-bold.jobs-unified-top-card__job-title"
    );

    const textContent = await page.$eval(
      "h2.t-24.t-bold.jobs-unified-top-card__job-title",
      (element) => element.textContent.trim()
    );

    console.log("Job Title:", textContent);

    // Go back to the search results page
  }
})();
