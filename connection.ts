import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export default new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USERNAME!,
  process.env.DB_PASSWORD!,
  {
    host: "localhost",
    dialect: "postgres",
    port: +process.env.DB_PORT!,
  }
);

//server connection
// const sequelize = new Sequelize(
//   "heroku_f0106001a89edd5",
//   "bfeaafb8a11fa5",
//   "e90c830c",
//   {
//     host: "us-cdbr-east-05.cleardb.net",
//     dialect: "mysql",
//   }
// );
