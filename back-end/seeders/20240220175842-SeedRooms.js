'use strict';

const { hashPassword } = require('../helpers/hashPassword');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {


    const rooms = require('../data/rooms.json')

    const room = rooms.map( (el) => {
      el.password = hashPassword(el.password)
      el.createdAt = el.updatedAt = new Date()
      return el
    })

    await queryInterface.bulkInsert('Rooms', room, {})

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Rooms', null, {})

  }
};
