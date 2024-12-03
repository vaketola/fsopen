import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const onVote = (id) => {
    dispatch(voteAnecdote(id))
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
              has {anecdote.votes} <button onClick={() => onVote(anecdote.id)}>
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
          has {anecdote.votes} <button onClick={() => onVote(anecdote.id)}>
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
