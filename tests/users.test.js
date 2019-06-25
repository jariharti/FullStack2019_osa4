/* Jari Hartikainen, 6.6.2019 */
/* Aalto University, Course: Full Stack Web Development, Part 4: Blogilistan testit 4.15 ... 4.16*/

const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  let userObject1 = new User(helper.initialUsers[0])
  await userObject1.save()

  userObject2 = new User(helper.initialUsers[1])
  await userObject2.save()

  userObject3 = new User(helper.initialUsers[2])
  await userObject3.save()
})

// Test 4.15: blogilistan laajennus, step4
test('test that new users is stored to the database', async () => {
  const newUser = {
    username: 'RobinMa',
    name: 'Robin C Mayor',
    password:'password3',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd.length).toBe(helper.initialUsers.length + 1)

  const newUsers = usersAtEnd.map(n => n.username)
  expect(newUsers).toContain(
    'RobinMa'
  )
})

// Test 4.16: blogilistan laajennus, step4
// Käyttäjätunnuksen on oltava järjestelmässä uniikki.
test('if user name is not unique, reply with status code 400 Bad request', async () => {
  const newUser = {
    username: 'Mikki',
    name: 'Robin C Mayor',
    password:'password3',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
})

// Test 4.16: blogilistan laajennus, step4
// Käyttäjätunnuksen tulee olla vähintään 3 merkkiä pitkä
test('if user name or password is shoter than three chracteristics, reply with status code 400 Bad request', async () => {
  const newUser = {
    username: 'Ro',
    name: 'Robin C Mayor',
    password:'password',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
})

// Test 4.16: blogilistan laajennus, step4
// Salasanan tulee olla vähintään 3 merkkiä pitkä
test('if user name or password is shoter than three chracteristics, reply with status code 400 Bad request', async () => {
  const newUser = {
    username: 'RobMa',
    name: 'Robin C Mayor',
    password:'pw',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})