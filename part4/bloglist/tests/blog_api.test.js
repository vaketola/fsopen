const { test, describe, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('HTTP GET request to /api/blogs', () => {
  test('blogs returned as json', async() => {
    await api.get('/api/blogs')
             .expect(200)
             .expect('Content-Type', /application\/json/)
  })

  test('there are three blogs', async() => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 3)
  })
})



after(async () => {
  await mongoose.connection.close()
})
