const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
      //populate is mongoose function -> show all - blogs-  data + user specif data, including username, name and id
    .find({}).populate('blogs', { title: 1, author: 1, url: 1, id: 1})

  response.json(users.map(u => u.toJSON()))
})

// Create new user
usersRouter.post('/', async (request, response, next) => {
  try {

    const body = request.body

    // password must be longer than three characteritics //
    if (body.password.length < 3) {
      return response.status(400).json({ error: 'Password validation failed: password is shorter than the minimum allowed length (3)'}).end()
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter