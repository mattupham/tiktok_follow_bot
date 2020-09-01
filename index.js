require("dotenv").config({ path: __dirname + "/.env" });
const puppeteer = require("puppeteer-extra");
const jsonfile = require("jsonfile");
const StealthPlugin = require("puppeteer-extra-plugin-stealth"); // add stealth plugin and use defaults (all evasion techniques)
const cookiesFilePath = "./cookies/cookie.json";
const {
  createPageWithTor,
  setCookie,
  goToAnalyticsPage,
  continuouslyCheckFollowersDiffAndPlaySound,
} = require("./utils");
const { email, password } = require("./constants");
const {
  ANALYTICS_PAGE_SELECTOR,
  EMAIL_SELECTOR,
  PASSWORD_SELECTOR,
  LOGIN_SELECTOR,
} = require("./constants");
puppeteer.use(StealthPlugin());

(async () => {
  const { page, browser } = await createPageWithTor();
  // pull logged in cookie from json file
  await setCookie(page, cookiesFilePath);
  await goToAnalyticsPage(page);
  await continuouslyCheckFollowersDiffAndPlaySound(page);
  await browser.close();
})();
