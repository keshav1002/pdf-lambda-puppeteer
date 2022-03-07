import { Helper } from "./Helper";
import { GeneratorFunction } from "./types/GeneratorTypes";
import { getTreeCertificateTemplate } from "./templates/tree-certificate-template";

export class PDFGenerator {
  /**
   * This function returns the buffer for a generated PDF of manual
   * @param {any} event - The object that comes for lambda which includes the http's attributes
   * @returns {Array<any>} array of Structure Instructions
   */

  static getPdf: GeneratorFunction = async (event) => {
    try {

      var url = event.queryStringParameters.url;

      const options = {
        width: 1920,
        height: 1080,
        landscape: true,
        printBackground: true,
        margin: { top: "0in", right: "0in", bottom: "0in", left: "0in" },
      };

      const pdf = await Helper.getPdfBuffer(url, null, options);

      return {
        headers: {
          "Content-type": "application/pdf"
          // , "Content-Disposition": "attachment; filename=restfile.pdf"
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

  static renderTreeCertificate: GeneratorFunction = async (event) => {
    try {

      const html = getTreeCertificateTemplate({ name: "Bob" });

      const options = {
        format: "A4",
        landscape: true,
        printBackground: true,
        margin: { top: "0in", right: "0in", bottom: "0in", left: "0in" },
      };

      const pdf = await Helper.getPdfBuffer(null, html, options);

      return {
        headers: {
          "Content-type": "application/pdf"
          // , "Content-Disposition": "attachment; filename=restfile.pdf"
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
