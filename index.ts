import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { Sequelize, Model, ModelCtor } from "sequelize/types";
import User from "./models/User";

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
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use("/v1/user", require("./routes/user"));
app.use("/v1/experience", require("./routes/experience"));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
