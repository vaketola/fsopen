import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const AnecdoteFilter = () => {
  const dispatch = useDispatch()

  const onFilter = (event) => {
    dispatch(filterChange(event.target.value))
  }

  return (
    <p>
      filter <input name="filter" onChange={onFilter} />
    </p>
  )
}

export default AnecdoteFilter
