import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filterWord, setNewFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const persons_list = persons.map(person => person.name)

    if (persons_list.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
      console.log('button clicked', event.target)
    }

  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterWord.toLowerCase()))

  const handleNameChange = (event) => {    
    console.log(event.target.value)    
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {    
    console.log(event.target.value)    
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {  
    console.log(event.target.value)    
    setNewFilter(event.target.value)
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        filter shown with <input value={filterWord} onChange={handleFilterChange}/>
      </form>
      <h2>add new</h2>
      <form onSubmit={addName}>
        <div>
          <div>name: <input value={newName} onChange={handleNameChange}/></div>
          <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
          <button type="submit">save</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Filter on' : 'Filter off' }
        </button>
      </div>      
      <div>
        {personsToShow.map(person => <p><div>{[person.name + " " + person.number]}</div></p>)}
      </div>
    </div>
  )

}

export default App