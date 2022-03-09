import * as chromium from "chrome-aws-lambda";

import { GetPDFBuffer } from "./types/HelperTypes";

export class Helper {
  static getPdfBuffer: GetPDFBuffer = async (url: string, html: string, options: any) => {
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

      if (url != null){
        url = 'https://' + url;
        await page.goto(url);
      }
      else if (html != null){
        const loaded = page.waitForNavigation({
          waitUntil: "load",
        });
        await page.setContent(html);
        await loaded;
      }

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
