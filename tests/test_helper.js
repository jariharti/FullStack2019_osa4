const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    likes: 10,
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    user: "5cf93aa4c49892070fc7f729",
    _id: "5cf96010a863f304228d3e7c",
    __v: 0
  },
  {
    likes: 0,
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    user: "5cf93aa4c49892070fc7f729",
    _id: "5cf96010a863f304228d3e7d",
    __v: 0
  },
  {
    likes: 7,
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    user: "5cf95d8b2ed5ec038d9ec0a9",
    _id: "5cf96010a863f304228d3e7e",
    __v: 0
  },
  {
    likes: 12,
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    user: "5cf93bdec49892070fc7f72a",
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    __v: 0
  },
  
]

const initialUsers = [
      {
        username: 'EdWDi',
        name: 'Edsger W. Dijkstra',
        _id: '5cf93bdec49892070fc7f72a',
        passwordHash:'$2b$10$ZKhtBfWSnrMRIYOIxSnWHOaAfb3u6EvhCOjpD.AvCWQ3XbetM4jkW'
      },
      {
        username: 'RoCMa',
        name: 'Robert C. Martin',
        _id: '5cf93aa4c49892070fc7f729',
        passwordHash: '$2b$10$sOaQEDbti1cHb/6wbysKkeUNphFVGj1oqA47KTRDqKLTduX5KQJCK'
      },
      {
        username: 'MiCh',
        name: 'Michael Chan',
        _id: '5cf7c1d024eef4c2ec034c8b',
        passwordHash: '$2b$10$rG40d4CelkZlvLkGrq2YxeWI3h26I98QrafNMZ08aQVuXNdIBT8IS'
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