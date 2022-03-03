import { Helper } from "./Helper";
import { GeneratorFunction } from "./types/GeneratorTypes";
import { getTemplate } from "./templates/pdf-template";
import { getTemplate2 } from "./templates/pdf-template-new";

export class PDFGenerator {
  /**
   * This function returns the buffer for a generated PDF of manual
   * @param {any} event - The object that comes for lambda which includes the http's attributes
   * @returns {Array<any>} array of Structure Instructions
   */
  static getPDF: GeneratorFunction = async (event) => {
    try {

      var url = '';

      console.log('event.event.queryStringParameters.url');
      console.log(event.queryStringParameters.url);

      console.log('event.body');
      console.log(event.body);

      console.log('typeof event.body');
      console.log(typeof event.body);

      console.log('event.body == null');
      console.log(event.body == null);

      console.log('event.body != null');
      console.log(event.body != null);

      if ('body' in event && event.body != null){
        var content = event.body;
        var buff = new Buffer.from(content, 'base64');
        content = buff.toString('ascii');
        content = JSON.parse(content);
        if ('html' in content){
          content = content.html;
          var html = getTemplate2({ html: content });
        }
        console.log('or this??');
      }
      else {
        console.log('this happen?');
        if ('url' in event.queryStringParameters){
          url = event.queryStringParameters.url;
          console.log('url');
          console.log(url);
        }
        else {
          var html = getTemplate({ name: "Keshav" });
        }
      }

      console.log('content');
      console.log(content);

      console.log('html');
      console.log(html);

      const options = {
        format: "A4",
        printBackground: true,
        margin: { top: "1in", right: "1in", bottom: "1in", left: "1in" },
      };

      const pdf = await Helper.getPDFBuffer(html, options, url);

      console.log(pdf);

      return {
        headers: {
          "Content-type": "application/pdf",
          "Content-Disposition": "attachment; filename=restfile.pdf"
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
