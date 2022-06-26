import { BOOLEAN, DATEONLY, INTEGER, STRING, TEXT } from "sequelize";

import db from "../connection";

const Experience = db.define(
  "experience",
  {
    companyName: {
      type: STRING,
    },
    companyLogo: {
      // URL
      type: STRING,
    },
    user_id: {
      type: INTEGER,
    },
    description: {
      type: TEXT,
    },
    jobTitle: {
      type: STRING,
    },
    isCurrentlyWorkingHere: {
      type: BOOLEAN,
    },
    startDate: {
      type: DATEONLY,
    },
    endDate: {
      type: DATEONLY,
    },
  },
  {
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
  }
);

export default Experience;
