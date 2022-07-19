import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export default new Sequelize(
  "heroku_254bee4a05f9d78",
  "b3fad8e0bff819",
  "22d1ddee",
  {
    host: "us-cdbr-east-06.cleardb.net",
    dialect: "mysql",
  }
);
