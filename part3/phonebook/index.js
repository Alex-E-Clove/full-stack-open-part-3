const express = require("express");

const app = express();

app.use(express.json());

const generateId = () => {
  const randomDecimal = Math.random();
  const randomNumber = Math.round(randomDecimal * 10 ** 10);
  const id = String(randomNumber);
  return id;
};

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (_, response) => {
  response.send("<h1>phonebook api</h1>");
});

app.get("/info", (_, response) => {
  const numberOfPeopleString = `<p>Phonebook has info for ${persons.length} people</p>`;
  console.log(numberOfPeopleString);
  const dateString = `<p>${new Date().toString()}</p>`;
  console.log(dateString);
  response.send(numberOfPeopleString.concat(dateString));
});

app.get("/api/persons", (_, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  console.log(id);
  const person = persons.find((person) => person.id === id);
  console.log(persons);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({ error: "Missing name" });
  }

  if (!body.number) {
    return response.status(400).json({ error: "Missing number" });
  }

  if (persons.some((person) => person.name === body.name)) {
    return response.status(400).json({ error: "Name must be unique" });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = [...persons, person];

  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
