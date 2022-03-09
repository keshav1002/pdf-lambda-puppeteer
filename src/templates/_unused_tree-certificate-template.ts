import * as handlebars from "handlebars";

const html: string = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
  </head>
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

    .page-break {
      page-break-before: always;
    }
    .custom-font {
      font-family: Roboto, "Helvetica Neue", Arial, sans-serif;
    }
  </style>
  <body>
    <h1>Memorial Tree Certificate</h1>
    <h3>In loving memory of</h3>
    <h2>{{recipientName}}</h2>
    <div style="background-color: green; height: 32px; width: 80%;">
      {{numberOfTrees}}
    </div>
    <p>&nbsp;</p>
    <div>
      <h3>Courtesy of:</h3>
      <h2>{{senderName}}</h2>
    </div>
    <p>{{dateOfCertificate}}</p>
  </body>
</html>
`;

export const getTreeCertificateTemplate: any = (context: any) => {
  return handlebars.compile(html)(context);
};
