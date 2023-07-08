import { useState, useEffect } from 'react';
import personService from './services/persons';
import { Filter, PersonForm, Persons, Notification } from './Display';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searched, setSearched] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, []);

  const handleNameChange = event => setNewName(event.target.value);
  const handleNumberChange = event => setNewNumber(event.target.value);
  const handleSearchChange = event => setSearched(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find(person => person.number === newNumber)) {
      alert(`${newNumber} is already in the phonebook`);
    } else if (persons.find(person => person.name === newName)) {
      if (window.confirm(`${newName} is already in the phonebook. Update their number?`)) {
        const person = persons.find(person => person.name === newName);
        const updatedPerson = { ...person, number: newNumber };
        personService
          .updatePerson(updatedPerson.id, updatedPerson)
          .then(returnedPerson => setPersons(persons.map(person => person.id !== updatedPerson.id ? person : returnedPerson)))
          .then(() => setMessage(`${updatedPerson.name} updated successfully.`))
          .catch(() => setMessage(`${updatedPerson.name} has already been deleted from the server. Please refresh.`));
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService
        .createPerson(newPerson)
        .then(appendedPersons => setPersons(persons.concat(appendedPersons)))
        .then(() => setMessage(`${newPerson.name} added successfully.`));
    }
    setNewName('');
    setNewNumber('');
    setTimeout(() => {
      setMessage('')
    }, 4000);
  };

  const remPerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() =>setPersons(persons.filter(person => person.id !== id)))
        .then(() => setMessage(`${name} has been deleted successfully.`))
        .catch(() => setMessage(`${name} has already been deleted from the server. Please refresh`));
    }
    setTimeout(() => {
      setMessage('')
    }, 4000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter value={searched} handleChange={handleSearchChange} />
      <h3>Add new</h3>
      <PersonForm 
        valueName={newName} valueNumber={newNumber}
        handleSubmit={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} searchTerm={searched} handleChange={remPerson} />
    </div>
  )
}

export default App;