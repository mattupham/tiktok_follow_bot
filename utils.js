const fs = require("fs");
const puppeteer = require("puppeteer-extra");
const colors = require("colors/safe");
const cheerio = require("cheerio");
const player = require("play-sound")((opts = {}));
const {
  email,
  password,
  TOR_URL,
  FOLLOWER_COUNT_SELECTOR,
  TIKTOK_ANALYTICS_URL,
  SOUND_FILE_PATH,
  ANALYTICS_PAGE_SELECTOR,
} = require("./constants");

const createPageWithTor = async () =>
  new Promise(async (resolve, reject) => {
    const args = ["--proxy-server=socks5://127.0.0.1:9050"];
    const browser = await puppeteer.launch({ args, headless: false });
    const page = await browser.newPage();
    await page.goto(TOR_URL);
    const isUsingTor = await page.$eval("body", (el) =>
      el.innerHTML.includes(
        "Congratulations. This browser is configured to use Tor"
      )
    );

    if (!isUsingTor) {
      console.log(colors.red.bold("Not using Tor. Closing..."));
      reject(await browser.close());
    }

    console.log(colors.green.bold("Using Tor. Continuing... "));
    resolve({ page, browser });
  });

const fileExistSync =
  fs.existsSync ||
  function existsSync(filePath) {
    try {
      fs.statSync(filePath);
    } catch (err) {
      return false;
    }
    return true;
  };

const setCookie = async (page, cookiesFilePath) =>
  new Promise(async (resolve, reject) => {
    const previousSession = fileExistSync(cookiesFilePath);
    if (previousSession) {
      // If file exist load the cookies
      const cookiesArr = require(cookiesFilePath);
      if (cookiesArr.length !== 0) {
        for (let cookie of cookiesArr) {
          await page.setCookie(cookie);
        }
        console.log("Session has been loaded in the browser");
        resolve();
      } else {
        reject();
      }
    } else {
      reject();
    }
  });

const getFollowerCount = (pageContent) => {
  const $ = cheerio.load(pageContent);
  const followersCountText = $(FOLLOWER_COUNT_SELECTOR).text();
  const followersCountNumber = parseInt(
    followersCountText.replace(/\,/g, ""),
    10
  );
  return followersCountNumber;
};

const playSound = () =>
  player.play(SOUND_FILE_PATH, (err) =>
    err ? console.error(err) : console.log("Sound Played")
  );

const goToAnalyticsPage = (page) =>
  Promise.all([
    page.goto(TIKTOK_ANALYTICS_URL),
    page.waitForNavigation({ waitUntil: "networkidle0", timeout: 60000 }),
  ]);

const continuouslyCheckFollowersDiffAndPlaySound = async (page) => {
  let previousFollowerCount = 0;
  while (true) {
    let pageContent = await page.content();
    let currentFollowerCount = getFollowerCount(pageContent);
    if (currentFollowerCount !== previousFollowerCount) {
      playSound();
    }
    previousFollowerCount = currentFollowerCount;
    console.log(`followersCountNumber: ${previousFollowerCount}`);
    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
  }
  return new Promise((resolve, reject) => resolve());
};

module.exports = {
  createPageWithTor,
  setCookie,
  getFollowerCount,
  playSound,
  goToAnalyticsPage,
  continuouslyCheckFollowersDiffAndPlaySound,
};
