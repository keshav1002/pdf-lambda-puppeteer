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
    <h1>Tree CERT for {{name}}</h1>
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam consequatur
      voluptate, aut libero natus aliquid dignissimos! Voluptatem repellat
      quibusdam doloribus impedit quisquam labore molestias, saepe illum,
      assumenda eum voluptate praesentium.
    </div>
  </body>
</html>
`;

console.log('html');
console.log(html);

export const getTreeCertificateTemplate: any = (context: any) => {
  return handlebars.compile(html)(context);
};
