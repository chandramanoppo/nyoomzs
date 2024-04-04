'use strict';

const {hashPassword} = require('../helpers/hashPassword')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const users = require('../data/users.json')

    const user = users.map( (el) => {
      el.password = hashPassword(el.password)
      el.createdAt = el.updatedAt = new Date()
      return el
    })

    await queryInterface.bulkInsert('Users', user, {})

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {})

  }
};
