require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const path = require('path')
const app = express()


// const randomId = (max) => Math.floor(Math.random()*max)

app.use(express.static(path.join(__dirname, 'public')))

app.use((request, response, next) => {
    request.requestTime = new Date()
    next()
})

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (request, response) => {return JSON.stringify(request.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
// This is equivalent to 'tiny' + body (from the docs)

app.use(cors({origin: 'http://localhost:5173'}))


app.get('/', (request, response) => {response.send('<h2>Phonebook<h2>')})

app.get('/info', (request, response) => {
    Person.countDocuments({}).then(count => {
        response.send(`<p>Phonebook has info for ${count} people</p><p>${request.requestTime}</p>`)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {response.json(persons)})
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body) {
        return response.status(400).json({error: 'invalid request content'})
    }
    if (!body.name) {
        return response.status(400).json({error: 'content must contain a name'})
    }
    if (!body.number) {
        return response.status(400).json({error: 'content must contain a number'})
    }
    if (persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())) {
        return response.status(400).json({error: 'name must be unique'})
    }

    const person = new Person({
        name:   body.name,
        number: body.number
    })
    // console.log(person)

    person.save().then(savedPerson =>{
        response.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
