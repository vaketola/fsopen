import axios from 'axios'
const baseUrl = '/api/blogs'

// let token = null

const setToken = (newToken) => {
  const token = `Bearer ${newToken}`
  // console.log(token)
  // I read the note on using local storage, but this works for now.
  window.localStorage.setItem('loggedBlogAppUserToken', JSON.stringify(token))
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const token = window.localStorage.getItem('loggedBlogAppUserToken')
  // console.log(token)
  // console.log(newObject)
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  console.log(newObject)
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = async (id) => {
  const token = window.localStorage.getItem('loggedBlogAppUserToken')
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { setToken, getAll, create, update, remove }
