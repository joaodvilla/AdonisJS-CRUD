'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AppointmentSchema extends Schema {
  up () {
    this.create('appointments', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('first_name', 500).notNullable()
      table.string('last_name', 500).notNullable()
      table.string('phone', 11)
      table.string('cell', 11).notNullable()
      table.text('description').notNullable()
      table.datetime('date')
      table.datetime('canceled_at')
      table.timestamps()
    })
  }

  down () {
    this.drop('appointments')
  }
}

module.exports = AppointmentSchema
