/* Jari Hartikainen, 5.6.2019 */
/* Aalto University, Course: Full Stack Web Development, Part 4: Blogilistan testit 4.8 ... 4.14*/

const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const config = require('../utils/config')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[3])
  await blogObject.save()
})


console.log ('Test 1........')
test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length)
})

console.log ('Test 2........')
test('identification field is name id, not _id', async () => {
  const response = await api.get('/api/blogs')
  expect((response.body.map(elements => elements.id))[0]).toBeDefined()
})

console.log ('Test 3........')
test('new blog to the database (Prerequisite: Edsger W. Dijkstra has got proper token === access right for the operation)', async () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }

  var headers = {
    'Authorization': 'Bearer '+ config.TEST_TOKEN_Edsger
  }


  await api
    .post('/api/blogs')
    .send(newBlog)
    .set(headers)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const newBlogs = blogsAtEnd.map(n => n.title)

  expect(newBlogs).toContain(
    'Go To Statement Considered Harmful'
  )
})

console.log ('Test 4........')
test('likes without content is set to zero', async () => {
  const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
  }

  var headers = {
    'Authorization': 'Bearer '+ config.TEST_TOKEN_Edsger
  }


  await api
    .post('/api/blogs')
    .send(newBlog)
    .set(headers)

  const blogsAtEnd = await helper.blogsInDb()
  const returnedNewBlog = blogsAtEnd.filter(data => data.title === 'Go To Statement Considered Harmful')
  expect(returnedNewBlog[0].likes).toBe(0)
})

console.log ('Test 5........')
test('if new blog is missing title and url, then response with status code 400 Bad request', async () => {
  const newBlog = {
    author: 'Edsger W. Dijkstra',
    likes: 999
  }

  var headers = {
    'Authorization': 'Bearer '+ config.TEST_TOKEN_Edsger
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set(headers)
    .expect(400)


})

console.log ('Test 6.1........')
test('Edsger can not delete document that Robert has created ', async () => {
  // This is unique ID that specifies Robert C. Martin's document, named First class tests
  const deleteId = '/api/blogs/5cf96010a863f304228d3e7c'

  // Edsger is trying to delete Robert's document -> Can't done
  var headers = {
    'Authorization': 'Bearer '+ config.TEST_TOKEN_Edsger
  }

  console.log('HEADERS -------------',headers)

  await api
    .delete(deleteId)
    .set(headers)
    .expect(401)
})

console.log ('Test 6.2........')
test('Robert can delete document that he has created ', async () => {
  // This is unique ID that specifies Robert C. Martin's document, named First class tests
  const deleteId = '/api/blogs/5cf96010a863f304228d3e7c'

  // Robert is trying to delete his own document -> This is OK
  var headers = {
    'Authorization': 'Bearer '+ config.TEST_TOKEN_Robert
  }

  console.log('HEADERS -------------',headers)

  await api
    .delete(deleteId)
    .set(headers)
    .expect(204)
})

console.log ('Test 7........')
test('When you update number of likes, you should receive status code 204, and likes to be new likes', async () => {
  // This is unique ID that specifies Robert C. Martin's document
  const updateIdElement = '/api/blogs/5cf96010a863f304228d3e7d'

  const newLikes = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 67
  }

  await api
    .put(updateIdElement)
    .send(newLikes)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  const returnedNewBlog = blogsAtEnd.filter(data => data.id === '5cf96010a863f304228d3e7d')
  expect(returnedNewBlog[0].likes).toBe(newLikes.likes)
})

afterAll(() => {
  mongoose.connection.close()
})