"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Guests", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: crypto.randomUUID(),
      },
      user_id: {
        type: Sequelize.STRING,
        references: {
          model: "Users",
          key: "id",
        },
      },
      name: {
        type: Sequelize.STRING,
      },
      born: {
        type: Sequelize.DATE,
      },
      age: {
        type: Sequelize.SMALLINT,
      },
      ktp: {
        type: Sequelize.BIGINT,
      },
      phone: {
        type: Sequelize.BIGINT,
      },
      educate: {
        type: Sequelize.STRING,
      },
      prov: {
        type: Sequelize.STRING,
      },
      kab: {
        type: Sequelize.STRING,
      },
      kec: {
        type: Sequelize.STRING,
      },
      kel: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.TEXT,
      },
      data: {
        type: Sequelize.STRING,
      },
      file: {
        type: Sequelize.STRING,
      },
      photo2: {
        type: Sequelize.STRING,
      },
      photo3: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Guests");
  },
};
