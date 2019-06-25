const favoriteBlog = (blogs) => {
  const blogLikes = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
  return {
    title: blogLikes.title,
    author: blogLikes.author,
    likes: blogLikes.likes
  }
}


module.exports = {
  favoriteBlog
}