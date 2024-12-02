import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './styles.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])

  const [notificationMessage, setNotificationMessage] = useState(null)

  const togglableFormRef = useRef()

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
      setNotificationMessage('wrong login credentials')
      setTimeout(() => {setNotificationMessage(null)}, 3000)
    }
  }

  const handleDelete = async (blogId) => {
    try {
      blogService.remove(blogId)
      setBlogs(blogs.filter(b => b.id !== blogId))
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
  }

  const handleCreate = async (blogObject) => {

    if (!blogObject.title || !blogObject.url) {
      setNotificationMessage('title and url are required')
      setTimeout(() => {setNotificationMessage(null)}, 3000)
      return
    }

    try {
      blogService
        .create(blogObject)
        .then(blog => { setBlogs(blogs.concat(blog)) })
      togglableFormRef.current.toggleVisibility()
      setNotificationMessage(`a new blog ${blogObject.title} by ${blogObject.author} was created`)
      setTimeout(() => {setNotificationMessage(null)}, 3000)
    } catch (exception) {
      console.log(exception)
      setNotificationMessage('failed to create blog')
      setTimeout(() => {setNotificationMessage(null)}, 3000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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
        <Notification message={notificationMessage}/>
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
      <Notification message={notificationMessage}/>
      <div>{user.name} logged in</div>
      <button onClick={() => {
        window.localStorage.removeItem('loggedBlogAppUser')
        window.localStorage.removeItem('loggedBlogAppUserToken')
        setUser(null)
      }}>logout
      </button>
      <Togglable buttonLabel='create new' ref={togglableFormRef}>
        <BlogForm handleCreate={handleCreate}/>
      </Togglable>
      <div>
        {blogs.slice().sort((x,y) => y.likes-x.likes).map(blog => <Blog key={blog.id} blog={blog} user={user} handleDelete={handleDelete} />)}
      </div>
    </div>
  )
}

export default App
