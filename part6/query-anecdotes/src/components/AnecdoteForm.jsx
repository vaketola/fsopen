import { useContext } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey:['anecdotes'] }) },
    onError: () => {
      dispatch({ type:'ON', payload:`too short anecdote, must have length 5 or more` })
      setTimeout(() => { dispatch({ type:"OFF" }) }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes:0 })
    dispatch({ type:'ON', payload:`added anecdote ${content}` })
    setTimeout(() => { dispatch({ type:"OFF" }) }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
