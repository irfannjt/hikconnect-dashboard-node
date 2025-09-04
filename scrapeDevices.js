const puppeteer = require("puppeteer");

async function scrapeDevices(username, password) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // 1. Buka login HiConnect
  await page.goto("https://www.hik-connect.com/views/main/index.html#/login", {
    waitUntil: "networkidle2",
  });

  // 2. Isi form login
  await page.type("input[name='username']", username, { delay: 100 });
  await page.type("input[name='password']", password, { delay: 100 });
  await page.click("button[type='submit']");

  // 3. Tunggu redirect ke dashboard
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  // 4. Buka halaman device management
  await page.goto(
    "https://www.hik-connect.com/views/main/index.html#/common/personal/deviceManagement",
    { waitUntil: "networkidle2" }
  );

  // 5. Extract data device
  const devices = await page.evaluate(() => {
    const rows = document.querySelectorAll(".device-item");
    return Array.from(rows).map((row) => ({
      name: row.querySelector(".device-name")?.innerText.trim(),
      status: row.querySelector(".device-status")?.innerText.trim(),
    }));
  });

  await browser.close();
  return devices;
}

// Jalankan langsung (untuk testing)
(async () => {
  const username = process.env.HICONNECT_USER || "your-email";
  const password = process.env.HICONNECT_PASS || "your-password";

  const devices = await scrapeDevices(username, password);
  console.log("Devices:", devices);
})();
