import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong login credentials')
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    
    try {
      blogService.create({ title:title, author:author, url:url })
                 .then(blog => { setBlogs(blogs.concat(blog)) })
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.log('failed to create blog')
    }
    
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>blogs</h2>
        <form onSubmit={handleLogin}>
          <div>
            username <input type='text' value={username} name='username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password <input type='text' value={password} name='password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button>login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <div>{user.name} logged in</div>
      <button onClick={() => {
        window.localStorage.removeItem('loggedBlogAppUser')
        window.localStorage.removeItem('loggedBlogAppUserToken')
        setUser(null)
      }}>logout
      </button>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>title: <input type='text' value={title} name='title'
            onChange={({ target }) => setTitle(target.value)}
          /></div>
        <div>author: <input type='text' value={author} name='author'
            onChange={({ target }) => setAuthor(target.value)}
          /></div>
        <div>url: <input type='text' value={url} name='url'
            onChange={({ target }) => setUrl(target.value)}
          /></div>
        <button>create</button>
      </form>
      <p>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </p>
    </div>
  )
}

export default App
