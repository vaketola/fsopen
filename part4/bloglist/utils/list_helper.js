const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const blogsWithLikes = blogs.filter((blog) => blog.likes)
  const total = blogsWithLikes.reduce((total, blog) => total + blog.likes, 0)
  return total
}
  
module.exports = {
  dummy, 
  totalLikes
}
