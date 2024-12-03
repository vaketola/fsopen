import { useSelector, useDispatch } from 'react-redux'

const getId = () => (100000 * Math.random()).toFixed(0)

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch({
      type: 'NEW',
      payload: {
        content: anecdote,
        id: getId(),
        votes: 0
      }
    })
  }

  const vote = (id) => {
    dispatch({ type:'VOTE', id:id })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} <button onClick={() => vote(anecdote.id)}>
              vote
            </button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
