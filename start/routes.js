'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.put('users', 'UserController.update').middleware('auth')
Route.post('sessions', 'SessionController.store')

Route.resource('appointments', 'AppointmentController')
  .apiOnly()
  .middleware('auth')

Route.resource('categories', 'CategoryController')
  .apiOnly()
  .middleware('auth')

Route.resource('posts', 'PostController')
  .apiOnly()
  .middleware('auth')

Route.resource('professions', 'ProfessionController')
  .apiOnly()
  .middleware('auth')

Route.get('/files/:id', 'FileController.show')
Route.post('/files', 'FileController.store').middleware('auth')
