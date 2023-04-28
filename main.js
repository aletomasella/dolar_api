"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const fast_xml_parser_1 = require("fast-xml-parser");
const axios_1 = __importDefault(require("axios"));
const API_URL = "https://www.dolarsi.com/api/dolarSiInfo.xml";
function main() {
    (0, dotenv_1.config)();
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)());
    const PORT = process.env.PORT || 3001;
    app.get("/", (_, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const xmlParser = new fast_xml_parser_1.XMLParser();
            const response = yield axios_1.default.get(API_URL);
            if (response.data) {
                const parsedData = xmlParser.parse(response.data);
                delete parsedData["?xml"];
                return res.json(parsedData);
            }
            else {
                return res.status(200).json({ message: "No Data Available" });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went Wrong", error });
        }
    }));
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
main();
