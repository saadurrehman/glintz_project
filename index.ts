import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import db from "./connection";

dotenv.config();

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error: Error) => {
    console.error("Unable to connect to the database:", error);
  });

const app: Application = express();

app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cors());

app.use("/v1/user", require("./routes/user"));
app.use("/v1/experience", require("./routes/experience"));
app.use("/v1/fileUpload", require("./routes/fileUpload"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
