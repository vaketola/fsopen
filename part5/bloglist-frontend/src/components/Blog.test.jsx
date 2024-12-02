import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('only title and author rendered initially', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Author test text',
    url: 'testurl.com',
    likes: 5,
    user: { username:'mluukkai' }
  }
  const user = { username:'mluukkai' }
  const { container } = render(<Blog blog={blog} user={user}/>)
  const div = container.querySelector('.hideWhenVisible')

  expect(div).toHaveTextContent('Component testing is done with react-testing-library Author test text')
  
  const url = screen.getByText('testurl.com')
  const likes = screen.getByText('likes 5')
  expect(url).not.toBeVisible()
  expect(likes).not.toBeVisible()
})

test('url and likes can be viewed', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Author test text',
    url: 'testurl.com',
    likes: 5,
    user: { username:'mluukkai' }
  }
  const user = { username:'mluukkai' }

  const { container } = render(<Blog blog={blog} user={user}/>)
  const div = container.querySelector('.showWhenVisible')

  expect(div).toHaveTextContent('testurl.com')
  expect(div).toHaveTextContent('likes 5')
})

test('url and likes on screen when view clicked', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Author test text',
    url: 'testurl.com',
    likes: 5,
    user: { username:'mluukkai' }
  }
  const user = { username:'mluukkai' }
  
  const userMock = userEvent.setup()

  render(<Blog blog={blog} user={user}/>)
  
  const viewButton = screen.getByText('view')
  await userMock.click(viewButton)

  const url = screen.getByText('testurl.com')
  const likes = screen.getByText('likes 5')
  expect(url).toBeVisible()
  expect(likes).toBeVisible()
})
