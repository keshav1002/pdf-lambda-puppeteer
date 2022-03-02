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
    <h1>Hello World</h1>
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam consequatur
      voluptate, aut libero natus aliquid dignissimos! Voluptatem repellat
      quibusdam doloribus impedit quisquam labore molestias, saepe illum,
      assumenda eum voluptate praesentium.
    </div>
    <br /><br />
    <div>
      Hi, My Name is {{name}}, Welcome to PDF generation :)
    </div>
    <div class="page-break">
      This content is in another page thanks to the page-break-before css
      attribute.
    </div>
    <br /><br />
    <div class="custom-font">
      This content has a custom font loaded thanks to the google fonts CDN.
    </div>
    <br /><br />
    <img
      src="https://via.placeholder.com/500x500.png?text=Placeholder+Image"
      alt="Placeholder image"
    />
  </body>
</html>
`;

console.log('html');
console.log(html);

export const getTemplate: any = (context: any) => {
  return handlebars.compile(html)(context);
};
