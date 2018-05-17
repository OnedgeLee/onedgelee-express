"use strict";
import bcrypt from "bcrypt";
import Sequelize from "sequelize";
import uuidv1 from "uuid/v1";

export default (sequelize, DataTypes) => {
  const GUser = sequelize.define("GUser", {
    gUserId: {
      field: "g_user_id",
      type: Sequelize.STRING,
      primaryKey: true
    },
    gUserName: {
      field: "g_user_name",
      type: Sequelize.STRING,
      allowNull: false
    },
    gUserRole: {
      field: "g_user_role",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "commonUser"
    },
    gUserGmail: {
      field: "g_user_gmail",
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    gUserEmail: {
      field: "g_user_email",
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    }
  });
  // GUser.beforeCreate(gUser => {
  //   gUser.gUserRole = "commonUser";
  // });
  return GUser;
};
