import { APIGatewayProxyHandler } from "aws-lambda";
import { PDFGenerator } from "./src/PDFGenerator";

export const getPdf: APIGatewayProxyHandler = async (event, _context) => {
  const response = await PDFGenerator.getPdf(event);
  return response;
};

export const renderTreeCertificate: APIGatewayProxyHandler = async (event, _context) => {
  const response = await PDFGenerator.renderTreeCertificate(event);
  return response;
};
