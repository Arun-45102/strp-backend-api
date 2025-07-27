import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

const FIVEM_SERVER_IP = process.env.FIVEMSERVERID;
const FIVEM_URL = process.env.FIVEMURL;

export async function getFivemData(req, res) {
  const url = `${FIVEM_URL}/${FIVEM_SERVER_IP}`;
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2", timeout: 3000 });
    const bodyText = await page.evaluate(() => document.body.innerText);
    const data = JSON.parse(bodyText);
    res.json({
      serverData: data,
    });
  } catch (error) {
    console.error("Error in /strp-api/fivem/getChannelName", error);
    res.status(500).json({ error: "Error fetching Fivem Data" });
  } finally {
    await browser.close();
  }
}

// export async function getFivemServerStatus() {
//   const page = await browser.newPage();
//   await page.goto(url, { waitUntil: "networkidle2", timeout: 3000 });
//   const bodyText = await page.evaluate(() => document.body.innerText);
//   const data = JSON.parse(bodyText);
//   return data;
// }

export default {
  getFivemData
};
