module.exports = {
  email: process.env["EMAIL"],
  password: process.env["PASSWORD"],
  TOR_URL: "https://check.torproject.org/",
  TIKTOK_ANALYTICS_URL: "https://www.tiktok.com/analytics",
  FOLLOWER_COUNT_SELECTOR: ".tab-links li:nth-child(2) a h5",
  SOUND_FILE_PATH: "./sound/sound.mp3",
  ANALYTICS_PAGE_SELECTOR: ".article-title",
  EMAIL_SELECTOR: "input[name=email]",
  PASSWORD_SELECTOR: "input[name=password]",
  LOGIN_SELECTOR: "button[type=submit]",
};
