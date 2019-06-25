const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    likes: 10,
    title: 'First class tests',
    author: 'Mikki Hiiri',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    user: '5d10e9ff8a95ec05dbfb4e66',
    _id: '5cf96010a863f304228d3e7c',
    __v: 0
  },
  {
    likes: 0,
    title: 'TDD harms architecture',
    author: 'Mikki Hiiri',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    user: '5d10e9ff8a95ec05dbfb4e66',
    _id: '5cf96010a863f304228d3e7d',
    __v: 0
  },
  {
    likes: 7,
    title: 'React patterns',
    author: 'Hessu Hopo',
    url: 'https://reactpatterns.com/',
    user: '5d10ea108a95ec05dbfb4e67',
    _id: '5cf96010a863f304228d3e7e',
    __v: 0
  },
  {
    likes: 12,
    title: 'Canonical string reduction',
    author: 'Aku Ankka',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    user: '5d10ea1b8a95ec05dbfb4e68',
    _id: '5a422b3a1b54a676234d17f9',
    __v: 0
  },

]

const initialUsers = [
  {
    username: 'Mikki',
    name: 'Mikki Hiiri',
    _id: '5d10e9ff8a95ec05dbfb4e66',
    passwordHash:'$2b$10$T0lOUEvss9RQC/c/c0CL3OnWqxmfD1ZCdFEK2QlA8OAJaTw8EjI1e'
  },
  {
    username: 'Hessu',
    name: 'Hessu Hopo',
    _id: '5d10ea108a95ec05dbfb4e67',
    passwordHash: '$2b$10$qbQWX3dBAwLGZtk7MSUSmeQs4VYC4fYZ7Pd90Z6PW4E50CD6C9xey'
  },
  {
    username: 'Aku',
    name: 'Aku Ankka',
    _id: '5d10ea1b8a95ec05dbfb4e68',
    passwordHash: '$2b$10$LbzRzQz2kU1ypNmvCsrVauaoeuY3BW6VJGMmXuqeki3AXRd/VHUOi'
  }
]



const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  usersInDb,
  initialBlogs,
  blogsInDb,
  initialUsers
}