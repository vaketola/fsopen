import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('renders content', async () => {
  const functionMock = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm handleCreate={functionMock} />)

  const createButton = screen.getByText('create new')

  await user.click(createButton)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'testing a form1...')
  await user.type(authorInput, 'testing a form2...')
  await user.type(urlInput, 'testing a form3...')
  await user.click(sendButton)

  expect(functionMock.mock.calls).toHaveLength(1)
  expect(functionMock.mock.calls[0][0].title).toBe('testing a form1...')
  expect(functionMock.mock.calls[0][0].author).toBe('testing a form2...')
  expect(functionMock.mock.calls[0][0].url).toBe('testing a form3...')
})
