'use strict'

const Category = use('App/Models/Category')

class CategoryController {
  async index ({ request }) {
    const { page } = request.get()
    const categories = Category.query()
      .paginate(page, 20)

    return categories
  }

  async store ({ request }) {
    const { ...data } = request.only([
      'title',
      'description'
    ])

    const category = await Category.create(data)

    return category
  }

  async show ({ params }) {
    const category = await Category.findOrFail(params.id)

    return category
  }

  async update ({ params, request }) {
    const category = await Category.findOrFail(params.id)

    const data = request.only([
      'title',
      'description'
    ])

    category.merge(data)

    await category.save()

    return category
  }

  async destroy ({ params }) {
    const category = await Category.findOrFail(params.id)

    await category.delete()
  }
}

module.exports = CategoryController
