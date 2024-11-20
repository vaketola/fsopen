import axios from 'axios'
import { useState, useEffect } from 'react'

const Header = ({ text }) => {
  return <h2>{text}</h2>
}

const NameEntry = ({ name, number, filter }) => {
  if (name.toLowerCase().includes(filter.toLowerCase())) {
    return <div>{name} {number}</div>
  }
}

const Persons = ({ persons, newFilter }) => {
  return (
    persons.map((person, id) => <NameEntry key={id} 
                                           name={person.name} 
                                           number={person.number} 
                                           filter={newFilter}/>)
  )
}

const FormField = ({ text, value, handler }) => {
  return <div>{text} <input value={value} onChange={handler}/></div>
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newFilter, setNewFilter] = useState('')
  const [newName,   setNewName]   = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
         .then(response => {setPersons(response.data)})
  }, [])
  

  const addName = (event) => {
    event.preventDefault()
    const alreadyIn = persons.some(person => person.name === newName)
    if (alreadyIn) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {name:newName, number:newNumber}
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
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
        <button type="submit">add</button>
      </form>
      <Header text='Numbers' />
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  )
}


export default App
