const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Meta API",
    description: "Description",
  },
  host: "localhost:3000",
  schemes: ["http", "https"],
};

//outputFile : 設定輸出後的Json檔檔名
const outputFile = "./swagger-output.json";
const endpointsFile = ["./app.js"];

swaggerAutogen(outputFile, endpointsFile, doc);
