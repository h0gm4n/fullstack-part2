import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    console.log('button clicked', event.target)
  }

  const handleNameChange = (event) => {    
    console.log(event.target.value)    
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          <button type="submit">save</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p><div>{person=person.name}</div></p>)}
      </div>
    </div>
  )

}

export default App