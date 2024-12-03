import { useSelector, useDispatch } from 'react-redux'
import { voteOnAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const onVote = (anecdote) => {
    dispatch(voteOnAnecdote(anecdote.id))
    dispatch(setNotification(`you voted for "${anecdote.content}"`, 5))
  }

  const applyFilter = (anecdote) => {
    if (filter) {
      if (anecdote.content.toLowerCase().includes(filter.toLowerCase())) {
        return (
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes} <button onClick={() => onVote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )
      }
      return
    }
    return (
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes} <button onClick={() => onVote(anecdote)}>
            vote
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {anecdotes.map(anecdote => applyFilter(anecdote))}
    </div>
  )
}

export default AnecdoteList
