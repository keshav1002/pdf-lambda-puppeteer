import * as _ from "lodash";
import { Helper } from "./Helper";
import { GeneratorFunction } from "./types/GeneratorTypes";

export class PDFGenerator {
  /**
   * This function returns the buffer for a generated PDF of manual
   * @param {any} event - The object that comes for lambda which includes the http's attributes
   * @returns {Array<any>} array of Structure Instructions
   */
  static getPDF: GeneratorFunction = async (event) => {
    try {
      const html: string =
        '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body><h1>Hello World</h1><div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam consequatur voluptate, aut libero natus aliquid dignissimos! Voluptatem repellat quibusdam doloribus impedit quisquam labore molestias, saepe illum, assumenda eum voluptate praesentium.</div></body></html>';
      const options = {
        format: "A4",
        printBackground: true,
        margin: { top: "1in", right: "1in", bottom: "1in", left: "1in" },
      };

      const pdf = await Helper.getPDFBuffer(html, options);

      return {
        headers: {
          "Content-type": "application/pdf",
        },
        statusCode: 200,
        body: pdf.toString("base64"),
        isBase64Encoded: true,
      };
    } catch (error) {
      console.error("Error : ", error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error,
          message: "Something went wrong",
        }),
      };
    }
  };
}
