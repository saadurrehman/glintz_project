import { INTEGER, Sequelize, STRING } from "sequelize";

import db from "../connection";
import Experience from "./Experience";

const User = db.define(
  "users",
  {
    name: {
      type: STRING,
    },
    profilePicture: {
      type: STRING,
    },
    age: {
      type: INTEGER,
    },
    experience: {
      type: INTEGER,
    },
  },
  {
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
  }
);

User.hasMany(Experience, {
  foreignKey: "user_id",
});

export default User;
