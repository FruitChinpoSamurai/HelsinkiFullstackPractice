const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();


const contentLog = (request, response, next) => {
    request.content = JSON.stringify(request.body);
    next();
};

morgan.token('content', function getContent (request) {
    return request.content;
});

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.use(express.static('build'))
app.use(cors());
app.use(express.json());
app.use(contentLog)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content', {
    skip: function (request, response) { return request.method !== 'POST' }
}));

app.get('/', (request, response) => {
    response.send('<h1>This is the root.</h1>');
})

// Get all.
app.get('/api/persons', (request, response) => {
    response.json(persons);
})

// General.
app.get('/info', (request, response) => {
    const dateTime = new Date();
    response.send(
        `<div>
            <p>Phonebook has info for ${persons.length} people.</p>
            <p>${dateTime}.</p>
        </div>`
    );
})

// Get one.
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const personFound = persons.find(person => person.id === id);
  
    if (personFound) {
        response.json(personFound);
    } else {
        response.statusMessage = "Person with that ID does not exist.";
        response.status(404).end();
    }
})

// Create one.
app.post('/api/persons', (request, response) => {
    const randomNumber = Math.floor(Math.random() * 100000);
    const newPerson = { ...request.body, 'id': randomNumber };
    const impostor = persons.find(person => person.number === newPerson.number);

    if (newPerson.name === '' || newPerson.number === '') {
        response.statusMessage = "Either name or number is missing.";
        response.status(400).end();
    } else if (impostor) {
        response.statusMessage = "Provided number already exists in database.";
        response.status(400).end();
    } else {
        persons = persons.concat(newPerson);
        response.json(newPerson);
    }
})

// Delete one.
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const personFound = persons.find(person => person.id === id);
    
    if (personFound) {
        persons = persons.filter(person => person.id !== id)
        response.status(204).end()
    } else {
        response.statusMessage = "Person with that ID does not exist.";
        response.status(404).end();
    }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})