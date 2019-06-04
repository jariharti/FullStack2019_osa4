const mostBlogs = (blogs) => {
    const allBlogAuthors = blogs.map(blog => blog.author)
    let cntBlogs = 0
    let mostActiveBlogger
    let m = 0
    for (let i=0; i<allBlogAuthors.length; i++)
    {
            for (let j=i; j<allBlogAuthors.length; j++)
            {
                    if (allBlogAuthors[i] === allBlogAuthors[j]) {
                        m++
                        if (m > cntBlogs) {
                            cntBlogs = m
                            mostActiveBlogger = allBlogAuthors[i];
                        }
                       
                    }
            }
            m=0;
    }
    return {
        author: mostActiveBlogger,
        blogs: cntBlogs
      }
    
}
  
  
  
module.exports = {
mostBlogs
}