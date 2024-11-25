const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const blogsWithLikes = blogs.filter((blog) => blog.likes > 0)
  const total = blogsWithLikes.reduce((total, blog) => total + blog.likes, 0)
  return total
}

const favoriteBlog = (blogs) => {
  const maxLikes = 0
}

module.exports = {
  dummy, 
  totalLikes
}
