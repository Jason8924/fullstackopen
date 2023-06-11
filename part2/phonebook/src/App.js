import { useState } from 'react'
import Person from "./components/Person"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [peopleToShow, setPeopleToShow] = useState([])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    filterPeople(event.target.value)
  }

  const filterPeople = (filter) => {
    if (filter === '') {
      setPeopleToShow(persons)
    } 
    else {
      const filteredPeople = persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
      setPeopleToShow(filteredPeople)
    }
  }  

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber,
    }

    const index = persons.findIndex((person) => person.name === newName)
    if (index === -1) {
      setPersons([...persons, person])
      setPeopleToShow([...peopleToShow, person])
    }
    else {
      alert(newName + " is already added to phonebook")
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <h3>add a new</h3>
      <PersonForm 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
        {peopleToShow.map(person => 
          <Person key={person.name} person={person} />
        )}
    </div>
  )
}

export default App