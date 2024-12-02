import { useState } from 'react'


const BlogForm = (({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    handleCreate({ title:title, author:author, url:url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>title: <input type='text' placeholder='title' value={title} name='title'
          onChange={({ target }) => setTitle(target.value)}
        /></div>
        <div>author: <input type='text' placeholder='author' value={author} name='author'
          onChange={({ target }) => setAuthor(target.value)}
        /></div>
        <div>url: <input type='text' placeholder='url' value={url} name='url'
          onChange={({ target }) => setUrl(target.value)}
        /></div>
        <button>create</button>
      </form>
    </>
  )
})


export default BlogForm
