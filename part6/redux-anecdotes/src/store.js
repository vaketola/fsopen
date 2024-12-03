import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

import anecdoteService from './services/anecdotes'
import { appendAnecdote } from './reducers/anecdoteReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

anecdoteService.getAll().then(anecdotes => 
  anecdotes.forEach(anecdote => {
    store.dispatch(appendAnecdote(anecdote))
  })
)

export default store
