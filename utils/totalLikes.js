const totalLikes = (blogs) => {
  const blogLikes = blogs.reduce((sum, order) => sum + order.likes, 0)
  return blogs.length === 0
    ? 0 
    : blogLikes
}

module.exports = {
  totalLikes
}