const { test, describe, beforeEach, before, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

const usersInDb = (async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
})

let token
before(async () => {
  const user = { username: 'mluukkai', password: 'salainen' }
  const login = await api.post('/api/login').send(user).expect(200)
  token1 = login.body.token
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
})


describe('username and password requirements', () => {
  test('code 400 received with short username', async () => {
    const newUser = {
      username: 'ml',
      name: 'Test Name',
      password: 'secretive',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('number of users stays the same with short username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'ml',
      name: 'Test Name',
      password: 'secretive',
    }

    await api.post('/api/users').send(newUser)

    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('code 400 received with short password', async () => {
    const newUser = {
      username: 'ml123',
      name: 'Test Name',
      password: 'se',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('number of users stays the same with short password', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'ml123',
      name: 'Test Name',
      password: 'se',
    }

    await api.post('/api/users').send(newUser)

    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('both username and password are short also fails', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'ml',
      name: 'Test Name',
      password: 'se',
    }

    await api.post('/api/users').send(newUser).expect(400)

    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('username must be unique', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Test Name',
      password: 'secretive',
    }

    await api.post('/api/users').send(newUser).expect(400)

    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})


after(async () => {
  await mongoose.connection.close()
})
