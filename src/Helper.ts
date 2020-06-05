import * as chromium from "chrome-aws-lambda";

import { GetPDFBuffer } from "./types/HelperTypes";

export class Helper {
  static getPDFBuffer: GetPDFBuffer = async (html: string, options: any) => {
    let browser = null;
    try {
      const executablePath = process.env.IS_OFFLINE
        ? null
        : await chromium.executablePath;
      browser = await chromium.puppeteer.launch({
        args: chromium.args,
        executablePath,
      });

      const page = await browser.newPage();
      const loaded = page.waitForNavigation({
        waitUntil: "load",
      });

      await page.setContent(html);
      await loaded;

      return await page.pdf(options);
    } catch (error) {
      return error;
    } finally {
      if (browser !== null) {
        await browser.close();
      }
    }
  };
}
