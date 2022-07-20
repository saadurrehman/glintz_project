import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;

export default new Sequelize(DB_NAME!, DB_USERNAME!, DB_PASSWORD!, {
  host: DB_HOST,
  dialect: "mysql",
});
