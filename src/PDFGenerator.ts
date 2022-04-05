import { Helper } from "./Helper";
import { GeneratorFunction } from "./types/GeneratorTypes";
import { getTreeCertificateTemplate } from "./templates/tree-certificate-template";
var qs = require('querystring');

var config = require('../config.json');
var aws = require("aws-sdk");
aws.config.update({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region
});
var s3 = new aws.S3();
var bucket = "floristone-product-images";

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

      console.log(event);
      console.log(event.body);

      var partnerName, partnerLogo, treeImage;

      // GET
      // Standard JSON payload in base64 and stored url._p
      if (!event.body){
        console.log(event.queryStringParameters);
        var data = event.queryStringParameters._p;
        var buff = new Buffer.from(data, 'base64');
        data = buff.toString('utf8');
        data = JSON.parse(data);
      }

      // POST
      else {
        var data = event.body;
        var buff = new Buffer.from(data, 'base64');
        data = buff.toString('utf8');
        try {
          data = JSON.parse(data);
          console.log('IS OBJ');
        } catch (e) {
          console.log('NOT OBJ');
          console.log(data);
          data = qs.parse(data);
          console.log(data);
        }
      }

      // todo
      if ("_x" in event.queryStringParameters){
        var params = { Bucket: bucket, Key: "/tree-certificate/pdf/" + event.queryStringParameters._p };
        s3.getObject(params, function(err, data) {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
            return {
              headers: {
                "Content-type": "application/pdf"
              },
              statusCode: 200,
              body: data.Body,
              isBase64Encoded: true,
            };
          }
        });

      }

      console.log(data);
      data.recipientName = data.recipientName.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '');
      data.senderName = data.senderName.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '');

      // format date
      if (data.dateOfCertificate != null && data.dateOfCertificate.length > 0){
        var dateOfCertificate = new Date(data.dateOfCertificate);
      }
      else {
        var dateOfCertificate = new Date();
      }
      dateOfCertificate = dateOfCertificate.toLocaleString('en-US', {
        day: 'numeric',
        year: 'numeric',
        month: 'long',
      });

      // partner
      switch(data.partner){
        case "AMERICAN_FORESTS":
          partnerName = 'American Forests';
          partnerLogo = 'https://cdn.floristone.com/tree-certificate/american-forests-logo.png';
          break;
        case "CANADIAN_INSTITUTE":
          partnerName = 'Canadian Institute of Forestry';
          partnerLogo = 'https://cdn.floristone.com/tree-certificate/canadian-institute.png';
          break;
        case "ONE_TREE_PLANTED":
          partnerName = 'One Tree Planted';
          partnerLogo = 'https://cdn.floristone.com/tree-certificate/one-tree-planted-logo.png';
          break;
      }

      // tree image
      switch(data.treeImage){
        case "PINE":
          treeImage = 'https://cdn.floristone.com/tree-certificate/banner_1.png';
          break;
        case "PALM":
          treeImage = 'https://cdn.floristone.com/tree-certificate/banner_2.png';
          break;
        case "WOODLAND":
          treeImage = 'https://cdn.floristone.com/tree-certificate/banner_3.png';
          break;
      }

      const html = getTreeCertificateTemplate({
        recipientName: data.recipientName,
        senderName: data.senderName,
        dateOfCertificate: dateOfCertificate,
        numberOfTrees: data.numberOfTrees,
        partnerName: partnerName,
        partnerLogo: partnerLogo,
        treeImage: treeImage,
        title: data.title,
        recipientHeading: data.recipientHeading,
        senderHeading: data.senderHeading,
        dateHeading: data.dateHeading,
        partnerHeading: data.partnerHeading,
        footer: data.footer
      });

      const options = {
        format: "Letter",
        landscape: true,
        printBackground: true,
        margin: { top: "0in", right: "0in", bottom: "0in", left: "0in" },
      };

      const pdf = await Helper.getPdfBuffer(null, html, options);

      function formatBytes(bytes: number, decimals = 2) {
          if (bytes === 0) return '0 Bytes'

          const k = 1024
          const dm = decimals < 0 ? 0 : decimals
          const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

          const i = Math.floor(Math.log(bytes) / Math.log(k))

          return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
      }

      const responseSize = Buffer.byteLength(JSON.stringify(pdf.toString("base64")), 'utf-8');
      console.log('FINAL Response' + responseSize);
      console.log(formatBytes(responseSize));


      if ("_x" in event.queryStringParameters){
        console.log('start s3 shit');
        s3.putObject({
          Bucket: bucket,
          Key: "/tree-certificate/pdf/" + event.queryStringParameters._p,
          ContentType: 'application/pdf',
          Body: pdf.toString("base64")
        }, function(err, data) {
          console.log('s3 shit done');
          if (err) {
            console.log(err);
          } else {
            console.log(data);
            return {
              headers: {
                "Content-type": "application/pdf"
              },
              statusCode: 200,
              body: pdf.toString("base64"),
              isBase64Encoded: true,
            };
          }
        });
        console.log('after s3 shit');
      }

      else {
        return {
          headers: {
            "Content-type": "application/pdf"
            // , "Content-Disposition": "attachment; filename=restfile.pdf"
          },
          statusCode: 200,
          body: pdf.toString("base64"),
          isBase64Encoded: true,
        };
      }

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
