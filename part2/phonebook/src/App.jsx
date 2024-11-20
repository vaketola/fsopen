import { useState } from 'react'


const NameEntry = ({ name, number, filter }) => {
  if (name.toLowerCase().includes(filter.toLowerCase())) {
    return <div>{name} {number}</div>
  }
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' }
  ]) 
  const [newFilter, setNewFilter] = useState('')
  const [newName,   setNewName]   = useState('')
  const [newNumber, setNewNumber] = useState('')

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
      <h2>Phonebook</h2>
      <div>filter shown with <input value={newFilter} onChange={handleNewFilter}/>  </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>name:   <input value={newName}   onChange={handleNewName}/>  </div>
        <div>number: <input value={newNumber} onChange={handleNewNumber}/></div>
        <button type="submit">add</button>
      </form>
      
      <h2>Numbers</h2>
      {persons.map((person, id) => <NameEntry key={id} 
                                    name={person.name} 
                                    number={person.number} 
                                    filter={newFilter}/>)}
    </div>
  )
}


export default App
