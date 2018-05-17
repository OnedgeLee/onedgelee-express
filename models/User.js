"use strict";
import bcrypt from "bcrypt";
import Sequelize from "sequelize";
import uuidv1 from "uuid/v1";

export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userEmail: {
      field: 'user_email',
      type: Sequelize.STRING,
      primaryKey: true,
      validate: {
        isEmail: true
      }
    },
    userPassword: {
      field: "user_password",
      type: Sequelize.STRING,
      allowNull: false
    },
    userName: {
      field: "user_name",
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    userConfirmed: {
      field: "user_confirmed",
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    userRefreshToken: {
      field: "user_refresh_token",
      type: Sequelize.UUID,
      unique: true,
      allowNull: false,
      defaultValue: uuidv1()
    },
    userRole: {
      field: "user_role",
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "commonUser"
    }
  });
  // User.associate = models => {};

  User.beforeCreate(user => {
    const hash = bcrypt.hashSync(user.userPassword, 10);
    user.userPassword = hash;
    // user.userRefreshToken = uuidv1();
    // user.userConfirmed = false;
    // user.userRole = "commonUser"
  });
  User.prototype.comparePassword = function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.userPassword);
  };

  return User;
};
