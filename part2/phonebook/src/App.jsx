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
    const newPerson = {name:newName}
    setPersons(persons.concat(newPerson))
    // const newPersons = [...persons]
    // newPersons.push(newPerson)
    // setPersons(newPersons)
    setNewName('')
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
