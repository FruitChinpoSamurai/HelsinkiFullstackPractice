import './Display.css';

const Notification = ({ message }) => {
    if (message === '') { return null }
    const notifSuccess = message.includes('successfully');
    return (
      <div className='Notif' style={notifSuccess ? { color: 'green' } : { color: 'red'}}>
        {message}
      </div>
    )
}

const Filter = ({ value, handleChange }) => <div>filter shown with: <input value={value} onChange={handleChange}/></div>

const PersonForm = ({ valueName, valueNumber, handleSubmit, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={handleSubmit}>
        <div>
          name: <input value={valueName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={valueNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({ persons, searchTerm, handleChange }) => {
  return (
    searchTerm === '' && persons !== [] ?
      persons.map(person => <Person key={person.number} name={person.name} number={person.number} id={person.id} handleChange={handleChange} />) :
      persons
        .filter(element => ((element.name).toLocaleLowerCase()).includes(searchTerm.toLocaleLowerCase()))
        .map(person => <Person key={person.number} name={person.name} number={person.number} id={person.id} handleChange={handleChange} />)
  )
}

const Person = ({ name, number, id, handleChange }) => {
  return (
    <div>
      <span>{name} {number}   </span>
      <button onClick={() => handleChange(id, name)}>delete</button>
    </div>
  )
}

export { Filter, PersonForm, Persons, Notification };