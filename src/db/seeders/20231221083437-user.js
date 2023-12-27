("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Users", [
      {
        id: crypto.randomUUID(),
        username: "john",
        email: "john@gmail.com",
        password: await "admin1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        username: "Doe",
        email: "doe@gmail.com",
        password: "admin2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        username: "Ahmad",
        email: "ahmad@gmail.com",
        password: "admin3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
