import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogs, setBlogs] = useState([])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong login credentials')
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
            username <input 
              type='text'
              value={username}
              name='username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password <input 
              type='text'
              value={password}
              name='password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button onClick={handleLogin}>login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <div>{user.name} logged in</div>
      <p>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </p>
      <button onClick={() => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
      }}>logout
      </button>
    </div>
  )
}

export default App
