import * as chromium from "chrome-aws-lambda";

import { GetPDFBuffer } from "./types/HelperTypes";

var config = require('../config.json');
var aws = require("aws-sdk");
aws.config.update({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region
});
var s3 = new aws.S3();
var bucket = "floristone-product-images";

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
          waitUntil: "networkidle2",
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

  static checkExistsInS3 = async (d) => {
    var params = {
      Bucket: bucket,
      Key: "tree-certificate/pdf/" + d + ".pdf"
    };
    console.log(params);
    try {
      const data = await s3.getObject(params).promise();
      return data;
    } catch(e) {
      return e;
    }
  }

  static uploadToS3 = async (n, d) => {
    var params = {
      Bucket: bucket,
      Key: "tree-certificate/pdf/" + n + ".pdf",
      ContentType: 'application/pdf',
      Body: d
    };
    try {
      const data = await s3.putObject(params).promise();
      return data;
    } catch(e) {
      return e;
    }
  }

}
