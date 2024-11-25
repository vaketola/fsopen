const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const blogsList = require('./blogsList')


describe('total likes', () => {
  test('example list total matches expected', () => {
    const result = listHelper.totalLikes(blogsList)
    assert.strictEqual(result, 36)
  })

  test('empty list has zero likes', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('list with one blog has correct likes', () => {
    const listWithOneBlog = [blogsList[1]]
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('blogs with missing fields are legal', () => {
    const blogList = [{ "title":"Test", "likes":5 }, { "title":"Test2" }]
    const result = listHelper.totalLikes(blogList)
    assert.strictEqual(result, 5)
  })

  test('blogs with negative likes are legal', () => {
    const blogList = [ { "title":"Test", "likes":5 }, { "title":"Test2", "likes":-3 } ]
    const result = listHelper.totalLikes(blogList)
    assert.strictEqual(result, 2)
  })
})

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})
