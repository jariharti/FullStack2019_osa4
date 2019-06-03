// Hakemistossa models oleva tiedosto blog.js sisältää ainoastaan blogi skeeman määrittelyn //
const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

module.exports = mongoose.model('blogs', blogSchema)