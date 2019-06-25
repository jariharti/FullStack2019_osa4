const mostLikes = (blogs) => {
  const allBlogAuthors = blogs.map(blog => blog.author)
  const uniqueBlogAuthors = [...new Set(allBlogAuthors)]

  let mostPopularBlogger
  let previousMax = 0

  for (let i=0; i<uniqueBlogAuthors.length; i++)
  {
    let totalLikes = (blogs.filter(data => data.author === uniqueBlogAuthors[i])).reduce((sum,value) => sum + value.likes,0)
    if (totalLikes > previousMax) {
      mostPopularBlogger = uniqueBlogAuthors[i]
      previousMax = totalLikes
    }

  }
  return {
    author: mostPopularBlogger,
    likes: previousMax
  }

}



module.exports = {
  mostLikes
}