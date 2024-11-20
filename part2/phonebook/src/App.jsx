import { useState } from 'react'

const NameEntry = ({ name }) => {
  return <div>{name}</div>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const alreadyIn = persons.some(person => person.name === newName)
    if (alreadyIn) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {name:newName}
      setPersons(persons.concat(newPerson))
      setNewName('')
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <button type="submit">add</button>
      </form>
      
      <h2>Numbers</h2>
      {persons.map((person, id) => <NameEntry key={id} name={person.name} />)}
    </div>
  )
}

export default App
