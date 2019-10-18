'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const { ...data } = request.only(
      [
        'username',
        'email',
        'first_name',
        'last_name',
        'profession_id',
        'password'
      ])

    const user = await User.create(data)

    await user.load('profession', builder => {
      builder.select(['id', 'title', 'description'])
    })

    return user
  }

  async update ({ request, response, auth }) {
    const user = await User.findOrFail(auth.user.id)
    const { ...data } = request.only(
      [
        'username',
        'email',
        'first_name',
        'last_name',
        'profession_id',
        'password'
      ])

    if (data.email !== user.email) {
      const userExists = await User.findBy('email', data.email)

      if (userExists) {
        return response.status(400).json({ error: 'Esse e-mail já existe.' })
      }
    }

    if (data.username !== user.username) {
      const userExists = await User.findBy('username', data.username)

      if (userExists) {
        return response
          .status(400)
          .json({ error: 'Esse nome de usuário já existe.' })
      }
    }

    user.merge(data)

    await user.save()

    await user.load('profession', builder => {
      builder.select(['id', 'title', 'description'])
    })

    return user
  }
}

module.exports = UserController
