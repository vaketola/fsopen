import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = import.meta.env.VITE_API_KEY

const getAll = () => {
  return axios.get(`${baseUrl}/all`)
}

const getCountry = (name) => {
  return axios.get(`${baseUrl}/name/${name}`)
}

const getWeather = (capital) => {
  return axios.get(`${weatherURL}${capital}&appid=${apiKey}`)
}

export default { 
  getAll: getAll, 
  getCountry: getCountry,
  getWeather: getWeather
}
