import { APIGatewayProxyHandler } from "aws-lambda";
import { PDFGenerator } from "./src/PDFGenerator";

export const getPDF: APIGatewayProxyHandler = async (event, _context) => {
  const response = await PDFGenerator.getPDF(event);
  return response;
};
