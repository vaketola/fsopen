const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const blogsWithLikes = blogs.filter((blog) => blog.likes > 0)
  const total = blogsWithLikes.reduce((total, blog) => total + blog.likes, 0)
  return total
}

const favoriteBlog = (blogs) => {
  if (!blogs[0]) return null

  const compareLikes = (oldBlog, newBlog) => {
    if (!oldBlog.likes) return newBlog
    if (newBlog.likes > oldBlog.likes) {
      return newBlog
    } else {
      return oldBlog
    }
  }

  const favorite = blogs.reduce((currentFavorite, blog) => compareLikes(currentFavorite, blog), blogs[0])
  
  return favorite
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog
}
