import dotenv from "dotenv";
import { getNumber } from "./utils";
dotenv.config();

const config = {
    port: getNumber(process.env.PORT) || 3000,
    API_ACCESS_TOKEN: process.env.API_ACCESS_TOKEN?.split(" ") || [],
};
export default config;
