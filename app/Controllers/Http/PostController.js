'use strict'

const Post = use('App/Models/Post')

class PostController {
  async index ({ request }) {
    const { page } = request.get()
    const posts = Post.query().with('category', builder => {
      builder.select(['id', 'title', 'description'])
    }).with('file', builder => {
      builder.select(['id', 'path', 'name'])
    }).with('user', builder => {
      builder.setVisible(['first_name', 'last_name'])
    })
      .paginate(page, 20)

    return posts
  }

  async store ({ request, auth }) {
    const user = await auth.getUser()
    const { ...data } = request.only([
      'title',
      'subtitle',
      'description',
      'file_id',
      'category_id'
    ])

    data.user_id = user.id

    const post = await Post.create(data)

    await post.loadMany({
      category: builder => {
        builder.select(['id', 'title', 'description'])
      },
      file: builder => {
        builder.select(['id', 'path', 'name'])
      },
      user: builder => {
        builder.setVisible(['first_name', 'last_name'])
      }
    })

    return post
  }

  async show ({ params }) {
    const post = await Post.findOrFail(params.id)

    await post.loadMany({
      category: builder => {
        builder.select(['id', 'title', 'description'])
      },
      file: builder => {
        builder.select(['id', 'path', 'name'])
      },
      user: builder => {
        builder.setVisible(['first_name', 'last_name'])
      }
    })

    return post
  }

  async update ({ params, request, auth }) {
    const user = await auth.getUser()
    const post = await Post.findOrFail(params.id)
    const { ...data } = request.only([
      'title',
      'subtitle',
      'description',
      'file_id',
      'category_id'
    ])

    data.user_id = user.id

    post.merge(data)

    await post.save()

    await post.loadMany({
      category: builder => {
        builder.select(['id', 'title', 'description'])
      },
      file: builder => {
        builder.select(['id', 'path', 'name'])
      },
      user: builder => {
        builder.setVisible(['first_name', 'last_name'])
      }
    })

    return post
  }

  async destroy ({ params }) {
    const post = await Post.findOrFail(params.id)

    await post.delete()
  }
}

module.exports = PostController
