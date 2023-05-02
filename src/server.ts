import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./utils/errorHandler";
import { router } from "./router/router";

dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server has been started on port ${process.env.PORT || 5000}...`);
});
