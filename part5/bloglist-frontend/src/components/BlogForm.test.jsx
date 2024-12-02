import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test(() => {})
// test('renders content', async () => {
//   const createBlog = vi.fn()
//   const user = userEvent.setup()

//   render(<Blog blog={blog} user={user} />)

//   const input = screen.getByRole('textbox')
//   const sendButton = screen.getByText('save')

//   await user.type(input, 'testing a form...')
//   await user.click(sendButton)

//   expect(createNote.mock.calls).toHaveLength(1)
//   expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
// })
