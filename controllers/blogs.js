// kaikki blogeihin liittyvät reittien määrittelyt //
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => { 
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch(exception) {
    next(exception)
  }
})

/*blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })*/

blogsRouter.post('/', async (request, response, next) => { 
  const blog = new Blog(request.body)
  try {
    await blog.save()
    response.status(201).json(blog)
  } catch(exception) {
    next(exception)
  }
})

/*blogsRouter.post('/', (request, response) => {
const blog = new Blog(request.body)

blog
    .save()
    .then(result => {
    response.status(201).json(result)
    })
})*/


module.exports = blogsRouter
