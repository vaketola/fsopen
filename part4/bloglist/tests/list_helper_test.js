const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const blogsList = require('./blogsList') // do not modify blogsList.js!

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

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

  test('blogs with negative likes are illegal?', () => {
    const blogList = [ { "title":"Test", "likes":5 }, { "title":"Test2", "likes":-3 } ]
    const result = listHelper.totalLikes(blogList)
    assert.strictEqual(result, 5)
  })
})

describe('favorite blog', () => {
  test('example list highest likes object is expected blog', () => {
    const result = listHelper.favoriteBlog(blogsList)
    assert.strictEqual(result, blogsList[2])
  })

  test('empty list returns null', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })

  test('list with one blog returns that blog', () => {
    const listWithOneBlog = [blogsList[1]]
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.strictEqual(result, blogsList[1])
  })

  test('blogs with missing fields are legal', () => {
    const blogList = [{ "title":"Test" }, { "title":"Test2", "likes":5 }]
    const result = listHelper.favoriteBlog(blogList)
    assert.strictEqual(result, blogList[1])
  })
  
  test('list of blogs without likes fields returns any blog', () => {
    const blogList = [{ "title":"Test" }, { "title":"Test2" }]
    const result = listHelper.favoriteBlog(blogList)
    assert(blogList.includes(result))
  })
})
