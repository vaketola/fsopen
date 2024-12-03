import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes:0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVotes = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  const object = response.data
  const newObject = { ...object, votes:object.votes+1 }
  const result = await axios.put(`${baseUrl}/${id}`, newObject)
  return result.data
}

export default { getAll, createNew, updateVotes }
