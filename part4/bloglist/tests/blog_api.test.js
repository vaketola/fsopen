const { test, describe, after, before, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

let initLength = 0
let testUserId = null
before(async () => {
  const Blog = require('../models/blog')
  const blogs = await Blog.find({})
  initLength = blogs.length

  const User = require('../models/user')
  const users = await User.find({})
  testUserId = users.slice(-1)[0]._id
  console.log(testUserId)
})
let lastId = null
beforeEach(async () => {
  const Blog = require('../models/blog')
  const blogs = await Blog.find({})
  lastId = blogs.slice(-1)[0]._id
})

describe('HTTP GET request to /api/blogs', () => {
  test('blogs returned as json', async() => {
    await api.get('/api/blogs')
             .expect(200)
             .expect('Content-Type', /application\/json/)
  })

  test('blog identifier is called id not _id', async() => {
    const response = await api.get('/api/blogs')
    response.body.map((blog) => {
      assert(!blog._id)
      assert(blog.id)
    })
  })

  test('correct number of blogs', async() => {
    const response = await api.get('/api/blogs')    
    assert.strictEqual(response.body.length, initLength)
  })
})

describe('HTTP POST request to /api/blogs', () => {
  test('post succeeds with valid data', async() => {
    const newBlog = {
      'author': `Test Author${initLength+1}`,
      'title': `This is a test title${initLength+1}`,
      'url': `https://fullstackopen.com/en/part${initLength+1}/`,
      'user': { 'userId': testUserId }
    }

    await api.post('/api/blogs')
             .send(newBlog)
             .expect(201)
             .expect('Content-Type', /application\/json/)
  })

  test('correct number of blogs', async() => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initLength+1)
  })

  test('saved blog name is in database', async() => {
    const response = await api.get('/api/blogs')
    const savedBlog = response.body.find((blog) => blog.title === `This is a test title${initLength+1}`)
    assert(savedBlog)
  })

  test('missing likes property defaulted to zero', async() => {
    const response = await api.get('/api/blogs')
    const savedBlog = response.body.find((blog) => blog.title === `This is a test title${initLength+1}`)
    assert.strictEqual(savedBlog.likes, 0)
  })

  test('return 400 bad request if title missing', async() => {
    const newBlog = {
      'author': `Test Author${initLength+2}`,
      'url': `https://fullstackopen.com/en/part${initLength+3}/`,
      'likes': 502 + initLength,
      'user': { 'userId': testUserId }
    }

    await api.post('/api/blogs')
             .send(newBlog)
             .expect(400)
  })

  test('return 400 bad request if url missing', async() => {
    const newBlog = {
      'title': `This is a test title${initLength+3}`,
      'author': `Test Author${initLength+3}`,
      'likes': 503 + initLength,
      'user': { 'userId': testUserId }
    }

    await api.post('/api/blogs')
             .send(newBlog)
             .expect(400)
  })
})

describe('updating a blog', () => {
  test('return 404 on nonexistant blog id', async() => {
    const newBlog = {
      'title': `This is a test title${initLength+1}`,
      'author': `Test Author${initLength+1}`,
      'likes': 9,
      'user': { 'userId': testUserId }
    }
    await api.put('/api/blogs/507f1f77bcf86cd799439011')
             .send(newBlog)
             .expect(404)
  })
  
  test('updating likes succeeds', async() => {
    const newBlog = { 'likes': 9, 'user': { 'userId': testUserId } }
    await api.put(`/api/blogs/${lastId}`)
             .send(newBlog)
             .expect(200)
  })

  test('correct number of blogs', async() => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initLength+1)
  })

  test('blog has updated likes', async() => {
    const response = await api.get('/api/blogs')
    const body = response.body.find((blog) => blog.title === `This is a test title${initLength+1}`)
    assert.strictEqual(body.likes, 9)
  })
})

describe('HTTP DELETE request to /api/blogs', () => {
  test('return 204 on delete request', async() => {
    await api.delete(`/api/blogs/${lastId}`).expect(204)
  })

  test('correct number of blogs', async() => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initLength)
  })
})


after(async () => {
  await mongoose.connection.close()
})
