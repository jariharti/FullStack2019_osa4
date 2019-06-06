/* Jari Hartikainen, 6.6.2019 */
/* Aalto University, Course: Full Stack Web Development, Part 4: Blogilistan teehtäviä  4.15 ... 4.21*/

const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

// List all blogs when you enter to api/blogs www.page, ang give "GET" comamnd
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    //populate is mongoose function -> show all -users- data + user specif data, including username, name and id
    .find({}).populate('user', { username: 1, name: 1, id: 1 })
 
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
  try{
    const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1, id: 1 })
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

// We don't use this anymore, token is now in the middleware
/*const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}*/

// Publish new document, when you are in api/blogs web-page, and give "PUT" comamnd with new document details. Before you can publish a document, you must have login to the system.
// After you log to the system, you shall get secret token which identifies you from the other users
blogsRouter.post('/', async (request, response, next) => {

  const body = request.body

  // Token is defined from request header in middleware function, and merged back to request
  var token = middleware.getTokenFrom(request)
  request.token = token


  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)


    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)


    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    // New blog object, that was saved to databse
    const savedBlog = await blog.save()

    // Add blog ID to the array, that includes user specific information from all the document, user has updated"
    user.blogs = user.blogs.concat(savedBlog._id)

    // Save array to user documents database
    await user.save()
    response.json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

// You can delete document in the webpage api/blogs/id (id=is the document id you wants to delete). However, only person ho has created document, can delete document
// We have to first check who wants to delete the document, and who creted the original document. Later on we decide is you are authorized to delete the document
blogsRouter.delete('/:id', async (request, response, next) => {

  // Find out who is trying to delete document

   var token = middleware.getTokenFrom(request)
   request.token = token

   try {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)


    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    // This is person who wants to delete a document
    const userWhoDeletes = await User.findById(decodedToken.id)

    // Find out who created the document. Every document has user property, which includes username, name and id (user id)
    // You can find out information from user by seraching document its id
    const blog = await Blog.findById(request.params.id)
  
    // Find out author details based on user id
    const UserWhoCreated = await User.findById(blog.user)

    // Only person who created the document, can delete the document. Compare usernames, because they are unique in this system
    console.log("userWhoDeletes.username -----------------------------xxxxxxxxxxx",userWhoDeletes.username)
    if (userWhoDeletes.username === UserWhoCreated.username) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }
    else {
      return response.status(401).json({ error: 'You are not authorized to delete this document' })
     }
    }
  catch (exception) {
    next(exception)
  }
})

// Yopu can update existing document details when you enter to web-page api/blogs and give "PUT" command
blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.author,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      console.log
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})

module.exports = blogsRouter