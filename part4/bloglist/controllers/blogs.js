const blogsRouter = require('express').Router()
const Blog        = require('../models/blog')
require('express-async-errors')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.likes) blog.likes = 0
  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'Title and URL are required' })
  }
  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const result = await Blog.findByIdAndUpdate(request.params.id, body, { new:true })
  if (!result) {
    return response.status(404).json({ error: 'blog not found' })
  }
  response.status(200).json(result)
})

module.exports = blogsRouter
