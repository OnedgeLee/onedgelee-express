"use strict";

import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import config from "../config";
const basename = path.basename(__filename);
const models = {};

const sequelize = new Sequelize(
  config.mariadb.database,
  config.mariadb.username,
  config.mariadb.password,
  config.mariadb
);

fs
  .readdirSync(__dirname)
  .filter(file => {
    // (.으로 시작하는 파일과, 자기자신을) 제외한 js파일명만 배열에 남김 > ES6 모듈로 쉽게 고칠 수 있지 않을까 import * as 이용
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    //파일을 sequelize.import하여 db에 model.name 키로 저장
    var model = sequelize.import(path.join(__dirname, file));
    models[model.name] = model;
  });

//키로 모델을 불러내 associate되어있다면 해당 정보 db에 저장
// Object.keys(models).forEach(modelName => {
//   console.log(models);
//   if (models.modelName.associate) {
//     models.modelName.associate(models);
//   }
// });

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
