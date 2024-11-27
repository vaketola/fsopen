const { test, describe, after, before } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

let initLength = 0
before(async () => {
  const Blog = require('../models/blog')
  const blogs = await Blog.find({});
  initLength = blogs.length;
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
      "author": `Test Author${initLength+2}`,
      "title": `This is a test title${initLength+2}`,
      "url": `https://fullstackopen.com/en/part${initLength+2}/`,
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
    const savedBlog = response.body.find((blog) => blog.title === `This is a test title${initLength+2}`)
    assert(savedBlog)
  })

  test('missing likes property defaulted to zero', async() => {
    const response = await api.get('/api/blogs')
    const savedBlog = response.body.find((blog) => blog.title === `This is a test title${initLength+2}`)
    assert.strictEqual(savedBlog.likes, 0)
  })

  test('return 400 bad request if title missing', async() => {
    const newBlog = {
      "author": `Test Author${initLength+3}`,
      "url": `https://fullstackopen.com/en/part${initLength+3}/`,
      "likes": 502 + initLength
    }

    await api.post('/api/blogs')
             .send(newBlog)
             .expect(400)
  })

  test('return 400 bad request if url missing', async() => {
    const newBlog = {
      "title": `This is a test title${initLength+4}`,
      "author": `Test Author${initLength+4}`,
      "likes": 503 + initLength
    }

    await api.post('/api/blogs')
             .send(newBlog)
             .expect(400)
  })
})


after(async () => {
  await mongoose.connection.close()
})
