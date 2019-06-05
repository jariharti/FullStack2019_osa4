/* Jari Hartikainen, 5.6.2019 */
/* Aalto University, Course: Full Stack Web Development, Part 4: Blogilistan testit 4.8 ... 4.12*/

const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

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

console.log ("Test 1........")
test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
})

console.log ("Test 2........")
test('identification field is name id, not _id', async () => {
    const response = await api.get('/api/blogs')
    expect((response.body.map(elements => elements.id))[0]).toBeDefined()
})

console.log ("Test 3........")
test('a valid blog by title Type wars can be added', async () => {
    const newBlog = {
            title: 'Type wars',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
            likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const newBlogs = blogsAtEnd.map(n => n.title)

    expect(newBlogs).toContain(
      'Type wars'
    )
})

console.log ("Test 4........")
test('likes without content is set to zero', async () => {
    const newBlog = {
        title: 'A blog without likes',
        author: 'Jari Hartikainen',
        url: 'https://www.linkedin.com/in/jari-hartikainen/'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
  
    const blogsAtEnd = await helper.blogsInDb()
    const returnedNewBlog = blogsAtEnd.filter(data => data.title === 'A blog without likes')
    expect(returnedNewBlog[0].likes).toBe(0)
})

console.log ("Test 5........")
test('if new blog is missing title and url, then response with status code 400 Bad request', async () => {
    const newBlog = {
        author: 'Tapani Tuominen',
        likes: 100
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
})

afterAll(() => {
  mongoose.connection.close()
})