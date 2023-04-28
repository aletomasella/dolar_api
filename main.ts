import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { XMLParser } from "fast-xml-parser";
import axios from "axios";

const API_URL = "https://www.dolarsi.com/api/dolarSiInfo.xml";

function main() {
  config();
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  const PORT = process.env.PORT || 3001;

  app.get("/", async (_, res) => {
    try {
      const xmlParser = new XMLParser();
      const response = await axios.get(API_URL);
      if (response.data) {
        const parsedData = xmlParser.parse(response.data);
        delete parsedData["?xml"];
        return res.json(parsedData);
      } else {
        return res.status(200).json({ message: "No Data Available" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went Wrong", error });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
