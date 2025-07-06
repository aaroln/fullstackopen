import { useState, useEffect } from 'react';
import personsService from './services/persons';
import Message from './components/Message';

const PersonForm = ({ handleFormSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
const Person = ({ name, number, handleDeletion }) => <div>{name} {number}<button onClick={handleDeletion}>delete</button></div>
const Filter = ({ newFilter, handleFilterChange }) => <div>filter shown with: <input value={newFilter} onChange={handleFilterChange}></input></div>


const App = () => {

  
  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const isPerson = persons.map(person => person.name).includes(newName);
    if (isPerson) {
      const person = persons.find(person => person.name === newName);
      if (person.number !== newNumber) {
        const isUpdate = confirm(`${newName} is already added to the phonebook, would you like to replace the old number with a new one?`)
        if (isUpdate) {
          const changedPersonObj = {...person, number: newNumber};
          personsService 
            .update(person.id, changedPersonObj)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person));
              setIsError(false);
              setMessage(`Changed ${newName}`);
              setTimeout(() => {
                setMessage(null);
              }, 3000);
              setNewName('');
              setNewNumber('');
            })
            .catch(error => {
              setIsError(true);
              setMessage(`${error.response.data.error}`);
              setTimeout(() => {
                setMessage(null);
              }, 3000);
              setNewName('');
              setNewNumber('');
            });
        }
      } else {
        alert(`${newName} is already added to the phonebook`);
      }
    } else {
      const newPersonObj = { name: newName, number: newNumber };
      personsService
        .create(newPersonObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setIsError(false);
          setMessage(`Added ${newName}`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          setIsError(true);
          setMessage(`${error.response.data.error}`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
          setNewName('');
          setNewNumber('');
        })
    }
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  const handleDeletionOf = (id) => {
    const person = persons.find(p => p.id === id);
    const isConfirm = confirm(`Delete ${person.name}?`);
    if (isConfirm) {
      personsService
        .remove(id)
        .then(() => {
          setIsError(false);
          setMessage(`${person.name} was removed from the phonebook`);
          setPersons(persons.filter(p => p.id != person.id));
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        })
        .catch(() => {
          setIsError(true);
          setMessage(`Information of ${person.name} has already been removed from the server`);
          setPersons(persons.filter(person => person.id !== id));
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        });
    }
  }

  const isFilterMatch = (person) => person.name.toLowerCase().includes(newFilter);

  const includedPersons = persons.filter(person => isFilterMatch(person));

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} isError={isError}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm 
        handleFormSubmit={handleFormSubmit} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
      />
      <h3>Number</h3>
      <div>
        {includedPersons.length ? 
          includedPersons.map(person => 
            <Person 
              key={person.name} 
              name={person.name} 
              number={person.number} 
              handleDeletion={() => handleDeletionOf(person.id)}/>
          ) : <p>No persons found</p>}
      </div>
    </div>
  );
}

export default App;