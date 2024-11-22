require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const path = require('path')
const app = express()
const PORT = process.env.PORT

// most middleware
app.use(express.static(path.join(__dirname, 'public')))
app.get('/favicon.ico', (req, res) => res.status(204).end())

app.use((request, response, next) => {
  request.requestTime = new Date()
  next()
})
app.use(express.json())

app.use(express.static('dist'))

morgan.token('body', (request, response) => {return JSON.stringify(request.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')) // This is equivalent to 'tiny' + body (from the docs)

app.use(cors({ origin: '*' }))


app.get('/', (request, response) => {response.send('<h2>Phonebook<h2>')})

app.get('/info', (request, response) => {
  Person.countDocuments({}).then(count => {
    response.send(`<p>Phonebook has info for ${count} people</p><p>${request.requestTime}</p>`)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {response.json(persons)})
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new:true, runValidators: true, context: 'query' }
  ).then(
    newPerson => response.json(newPerson)
  ).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end()
  }).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  Person.findOne({ name: body.name }).then(oldPerson => {
    if (oldPerson) {
      return response.status(400).json({ error: 'name must be unique' })
    }

    const person = new Person({
      name:   body.name,
      number: body.number
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    }).catch(error => next(error))
  }).catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
