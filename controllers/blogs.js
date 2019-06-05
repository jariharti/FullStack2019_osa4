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

blogsRouter.post('/', async (request, response, next) => { 
  const blog = new Blog(request.body)
  try {
    await blog.save()
    response.status(201).json(blog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const deleteBlog = await Blog.findByIdAndRemove(request.params.id)
    if (deleteBlog==null) {
      response.status(400).json({ error: 'Data already removed' }).end()
    }
    else {
      response.status(204).end()
    }
  }
  catch(exception) {
    next(exception)
  }
})


blogsRouter.put('/:id', async (request, response, next) => {
  const updatedLikes = {
    likes: request.body.likes,
  }
  try {
    const changeBlog = await Blog.findByIdAndUpdate(request.params.id, updatedLikes, {new: true})
    response.status(201).json(changeBlog)
  }
  catch(exception) {
    next(exception)
  }
})


module.exports = blogsRouter
