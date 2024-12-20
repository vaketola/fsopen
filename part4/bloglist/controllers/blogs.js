const blogsRouter = require('express').Router()
const Blog        = require('../models/blog')
const User        = require('../models/user')
require('express-async-errors')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{ username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const user = request.user
  
  if (!user) response.status(401).json({ error: 'token invalid' })
  if (!blog.likes) blog.likes = 0
  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'title and URL are required' })
  }
  if (!user) {
    return response.status(400).json({ error: 'user not found' })
  }
  blog.user = user._id
  
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  if (!user) response.status(401).json({ error: 'token invalid' })
  const blog = await Blog.findById(request.params.id)
  if (!blog) response.status(404).json({ error: 'blog not found' })

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'this is not your post' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { _id, user, ...body } = request.body

  const newUser = await User.findById(request.body.user.userId)
  body.user = newUser._id
  const result = await Blog.findByIdAndUpdate(request.params.id, body, { new:true })

  if (!result) {
    return response.status(404).json({ error: 'blog not found' })
  }

  response.status(200).json(result)
})

module.exports = blogsRouter
