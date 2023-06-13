import { useState, useEffect } from 'react'
import Person from "./components/Person"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import peopleService from './services/people'
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [peopleToShow, setPeopleToShow] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    peopleService
      .getAll()
      .then(response => {
        setPersons(response.data)
        setPeopleToShow(response.data)
      })
  }, [])

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
      peopleService
        .create(person)
        .then(response => {
          setPersons([...persons, response.data])
          setPeopleToShow([...peopleToShow, response.data])
          setMessage("Added " + response.data.name)
          setTimeout(() => {
            setMessage(null)
          }, 4000)
      })
    }
    else {

      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)){
        const updatedPerson = { ...persons[index], number: newNumber }

        peopleService
          .update(persons[index].id, updatedPerson)
          .then((response) => {
            const updatedPersons = [...persons]
            updatedPersons[index] = response.data
            setPersons(updatedPersons)
            setPeopleToShow(updatedPersons)
            setMessage(updatedPerson.name + "'s number changed to " + newNumber)
            setTimeout(() => {
              setMessage(null)
            }, 4000)
          })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {  
    const person = persons.find((person) => person.id === id)
    const personName = person.name

    if (window.confirm(`Delete ${personName}?`)) {
      peopleService
        .remove(id)
        .then(() => {
          setTimeout(() => {
            const updatedPersons = persons.filter(person => person.id !== id)
            setPersons(updatedPersons)
            setPeopleToShow(updatedPersons.filter(person => person.id !== id))
          }, 100)
        })
        .catch(error => {
          console.error("error deleting", error)
          const updatedPersons = persons.filter(person => person.id !== id)
          setPersons(updatedPersons)
          setPeopleToShow(updatedPersons.filter(person => person.id !== id))
          setMessage("Information of " + person.name + " has already been removed from server")
            setTimeout(() => {
              setMessage(null)
            }, 4000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
          <Person key={person.name} person={person} deletePerson={deletePerson}/>
        )}
    </div>
  )
}

export default App