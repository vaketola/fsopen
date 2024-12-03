import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  
  const result = useQuery({ queryKey: ['anecdotes'], queryFn: getAnecdotes })
  // console.log(JSON.parse(JSON.stringify(result)))
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({ mutationFn: updateAnecdote,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey:['anecdotes'] }) }
  })

  if (result.isLoading) return <div>loading anecdote service</div>
  if (result.isError) {
    return (
      <div>
        anecdote service not available due to problems in server
      </div>
    )
  }

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes:anecdote.votes+1 })
    dispatch({ type:'ON', payload:`anecdote "${anecdote.content}" voted` })
    setTimeout(() => { dispatch({ type:"OFF" }) }, 5000)
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
