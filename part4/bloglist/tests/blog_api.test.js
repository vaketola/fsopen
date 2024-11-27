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
      "author": `Test Author${initLength+1}`,
      "title": `This is a test title${initLength+1}`,
      "url": `https://fullstackopen.com/en/part${initLength+1}/`,
      "likes": 501 + initLength
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
})


after(async () => {
  await mongoose.connection.close()
})
