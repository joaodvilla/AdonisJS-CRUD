'use strict'

const Profession = use('App/Models/Profession')

class ProfessionController {
  async index ({ request }) {
    const { page } = request.get()
    const professions = Profession.query()
      .paginate(page, 20)

    return professions
  }

  async store ({ request }) {
    const { ...data } = request.only([
      'title',
      'description'
    ])

    const profession = await Profession.create(data)

    return profession
  }

  async show ({ params }) {
    const profession = await Profession.findOrFail(params.id)

    return profession
  }

  async update ({ params, request }) {
    const profession = await Profession.findOrFail(params.id)

    const data = request.only([
      'title',
      'description'
    ])

    profession.merge(data)

    await profession.save()

    return profession
  }

  async destroy ({ params }) {
    const profession = await Profession.findOrFail(params.id)

    await profession.delete()
  }
}

module.exports = ProfessionController
