// code I used to log in the first time

// try {
//   // await page.waitForSelector(ANALYTICS_PAGE_SELECTOR, { timeout: 60000 });
//   // store cookie
//   jsonfile.writeFile(cookiesFilePath, cookiesObject, { spaces: 2 }, function (
//     err
//   ) {
//     if (err) {
//       console.log("The file could not be written.", err);
//     }
//     console.log("COOKIE: Session has been successfully saved");
//   });
//   // scrape number
//   await page.evaluate(() => {
//     const followerCount = document.querySelector("h5").innerText();
//     console.log("FOLLOWER COUNT NOT LOGGED IN: ", followerCount);
//   });
//   console.log("FOLLOWER COUNT LOGGED IN: ", followerCount);
// } catch (error) {
//   console.log("The element didn't appear.");
// log in
// await Promise.all([
//   page.goto("https://www.tiktok.com/login/phone-or-email/email?lang=en"),
//   page.waitForNavigation({ waitUntil: "networkidle0" }),
// ]);

// await page.click(EMAIL_SELECTOR);
// await page.keyboard.type(email);

// await page.click(PASSWORD_SELECTOR);
// await page.keyboard.type(password);

// await page.click(LOGIN_SELECTOR);

// console.log("--------- LOGGED IN-----------");
// await page.waitForSelector(ANALYTICS_PAGE_SELECTOR, { timeout: 60000 });
// page.waitForNavigation({ waitUntil: "networkidle0" });

// const cookiesObject = await page.cookies();
// // Write cookies to temp file to be used in other profile pages
// jsonfile.writeFile(
//   "./cookies/cookie.json",
//   cookiesObject,
//   { spaces: 2 },
//   function (err) {
//     if (err) {
//       console.log("The file could not be written.", err);
//     }
//     console.log("COOKIE: Session has been successfully saved");
//   }
// );

// await Promise.all([
//   page.goto("https://www.tiktok.com/analytics"),
//   page.waitForNavigation({ waitUntil: "networkidle0" }),
// ]);
// console.log("BEFORE EVALUATION");
// let followers = "";
// await page.evaluate(() => {
//   console.log("BEFORE QUERYSELECT");
//   const followerCount = document.querySelector("h5");
//   followers = followerCount;
//   // const followerCount = document.querySelector("h5").innerText();
//   // console.log("FOLLOWER COUNT NOT LOGGED IN: ", followerCount);
// });
// console.log("FOLLOWERS: ", followers);
// console.log("AFTER EVALUATION");
// }

// Save Session Cookies

// const previousSession = fileExistSync(cookiesFilePath);
// if (previousSession) {
//   // If file exist load the cookies
//   const cookiesArr = require(`.${cookiesFilePath}`);
//   if (cookiesArr.length !== 0) {
//     for (let cookie of cookiesArr) {
//       await page.setCookie(cookie);
//     }
//     console.log("Session has been loaded in the browser");
//     return true;
//   }
// }
