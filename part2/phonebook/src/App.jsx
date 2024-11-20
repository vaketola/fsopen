import personService from './services/persons'
import { useState, useEffect } from 'react'

const Header = ({ text }) => {
  return <h2>{text}</h2>
}

const handleDelete = (person, persons, setPersons) => {
  if (confirm(`Delete ${person.name}?`)) {
    personService.remove(person.id)
                 .then(response => {
                  const newPersons = persons.filter(p => p.id !== response.data.id)
                  setPersons(newPersons)
                })
  }
}

const NameEntry = ({ person, persons, filter, setPersons }) => {
  if (person.name.toLowerCase().includes(filter.toLowerCase())) {
    return (
      <div>
        {person.name} {person.number} <button onClick={() => handleDelete(person, persons, setPersons)}>delete</button>
      </div>
    ) 
  }
}

const Persons = ({ persons, newFilter, setPersons }) => {
  return (
    persons.map(person => <NameEntry key={person.id} 
                                     person={person} 
                                     persons={persons}
                                     filter={newFilter}
                                     setPersons={setPersons}/>)
  )
}

const FormField = ({ text, value, handler }) => {
  return <div>{text} <input value={value} onChange={handler}/></div>
}

const App = () => {
  const [persons,   setPersons]   = useState([]) 
  const [newFilter, setNewFilter] = useState('')
  const [newName,   setNewName]   = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService.getAll()
                 .then(response => {setPersons(response.data)})
  }, [])  

  const addName = (event) => {
    event.preventDefault()
    const alreadyIn = persons.some(person => person.name === newName)
    if (alreadyIn) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {name:newName, number:newNumber}

      personService.create(newPerson)
                   .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNewNumber('')
                   })
    }
  }

  const handleNewFilter = (event) => {setNewFilter(event.target.value)}
  const handleNewName   = (event) => {setNewName(event.target.value)}
  const handleNewNumber = (event) => {setNewNumber(event.target.value)}

  return (
    <div>
      <Header text='Phonebook' />
      <FormField text='filter shown with' value={newFilter} handler={handleNewFilter}/>
      <Header text='add a new' />
      <form onSubmit={addName}>
        <FormField text='name:'   value={newName}   handler={handleNewName}/>
        <FormField text='number:' value={newNumber} handler={handleNewNumber}/>
        <button type='submit'>add</button>
      </form>
      <Header text='Numbers' />
      <Persons persons={persons} newFilter={newFilter} setPersons={setPersons} />
    </div>
  )
}


export default App
