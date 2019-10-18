'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfessionSchema extends Schema {
  up () {
    this.create('professions', (table) => {
      table.increments()
      table.string('title', 500).notNullable()
      table.text('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('professions')
  }
}

module.exports = ProfessionSchema
