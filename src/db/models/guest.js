"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Guest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Guest.init(
    {
      user_id: DataTypes.STRING,
      name: DataTypes.STRING,
      born: DataTypes.STRING,
      age: DataTypes.SMALLINT,
      ktp: DataTypes.BIGINT,
      phone: DataTypes.BIGINT,
      prov: DataTypes.STRING,
      kab: DataTypes.STRING,
      kec: DataTypes.STRING,
      kel: DataTypes.STRING,
      educate: DataTypes.STRING,
      address: DataTypes.TEXT,
      data: DataTypes.STRING,
      file: DataTypes.STRING,
      photo2: DataTypes.STRING,
      photo3: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Guest",
    }
  );
  return Guest;
};
