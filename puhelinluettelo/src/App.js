import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/persons'


const App = () => {

  const promise = axios.get('http://localhost:3001/persons')
  promise.then(response => {
    console.log(response.data)
  })

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filterWord, setNewFilter] = useState('')
  const [approvalMessage, setApprovalMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
    }, [])

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

    setApprovalMessage(
      `${newName} added`
    )
    setTimeout(() => {
      setApprovalMessage(null)
    }, 5000)

    noteService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))      
        setNewName('')
      })

  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="approval">
        {message}
      </div>
    )
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

  const handleClick = (id, personname) => {
    if (window.confirm(`Delete ${personname}?`)) {
      noteService
        .update(id)
      setApprovalMessage(
        `${personname} deleted`
      )
      setTimeout(() => {
        setApprovalMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={approvalMessage} />
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
        {personsToShow.map(person => <p><div>{[person.name + " " + person.number]} 
        <button onClick={() => handleClick(person.id, person.name)}> delete
        </button></div></p>)}
      </div>
    </div>
  )

}

export default App