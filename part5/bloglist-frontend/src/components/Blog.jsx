import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    const newBlog = {
      ...blog,
      likes: likes + 1,
    }
    try {
      blogService.update(blog.id, newBlog)
      setLikes(likes + 1)
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

  const onDelete = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog.id)
    }
  }

  if (blog.user.username === user.username) {
    return (
      <div style={blogStyle}>
        <div style={hideWhenVisible}>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible}>
          <div>
            {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
          </div>
          <div>{blog.url}</div>
          <div>likes {likes} <button onClick={handleLike}>like</button></div>
          <div>{blog.user.name}</div>
          <button onClick={onDelete}>remove</button>
        </div>
      </div>
    ) 
  } else {
    return (
      <div style={blogStyle}>
        <div style={hideWhenVisible}>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible}>
          <div>
            {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
          </div>
          <div>{blog.url}</div>
          <div>likes {likes} <button onClick={handleLike}>like</button></div>
          <div>{blog.user.name}</div>
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired
}


export default Blog
