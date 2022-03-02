import * as handlebars from "handlebars";

const html: string = `{{html}}`;

console.log('html');
console.log(html);

export const getTemplate2: any = (context: any) => {
  return handlebars.compile(html)(context);
};
