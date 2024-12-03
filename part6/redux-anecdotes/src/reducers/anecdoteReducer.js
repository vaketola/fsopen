import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      const anecdote = action.payload
      state.push({
        content: anecdote,
        id: getId(),
        votes: 0
      })
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const newAnecdote = { ...anecdoteToChange, votes:anecdoteToChange.votes+1 }
      return state.map(anecdote => anecdote.id !== id ? anecdote : newAnecdote).sort((a,b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})


export default anecdoteSlice.reducer
export const { voteAnecdote, addAnecdote, appendAnecdote } = anecdoteSlice.actions
