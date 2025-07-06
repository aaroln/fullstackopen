// Imports
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const Person = require('./models/person');

// Express config
app.use(express.static('dist'));
app.use(express.json());
morgan.token('body', request => JSON.stringify(request.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// Get all persons in phonebook
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons);
    });
});

// Get person from phonebook by id
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person);
            } else {
                response.json(404).end();
            }
    })
    .catch(error => next(error));
});

// Add person to phonebook
app.post('/api/persons', (request, response, next) => {
    const body = request.body;
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        });
    }
    
    const person = new Person({
        name: body.name,
        number: body.number
    });

    person.save().then(savedPerson => {
        response.json(savedPerson);
    })
    .catch(error => next(error));
});

// Delete person from phonebook
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).send(result);
        })
        .catch(error => next(error));
});

// Update person in phonebook
app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body;
    Person.findById(request.params.id)
        .then(person => {
            if (!person) {
                return response.status(404).end();
            }

            person.name = name;
            person.number = number;

            return person.save().then(updatedPerson => {
                response.json(updatedPerson);
            });
        })
        .catch(error => next(error));
})

// Unknown endpoint handling
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint'} );
}

app.use(unknownEndpoint);

// Error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);

// Port to bind to
const PORT = process.env.PORT;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});