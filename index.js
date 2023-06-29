const express = require('express');
const cors = require('cors');
const logger = require('./loggerMiddleware');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(logger);

let notes = [
	{
		id: 1,
		content: 'Codear un rato',
		date: '2019-05-30717:30:31.0982',
		important: true,
	},
	{
		id: 2,
		content: 'Estudiar tranquilamente',
		date: '2019-05-30T18:39:34.091Z',
		important: true,
	},
	{
		id: 3,
		content: 'Salir a pasear',
		date: '2019-05-30T19:20:14.2982',
		important: true,
	},
	{
		id: 4,
		content: 'Ver una película',
		date: '2019-05-30T19:20:14.2982',
		important: false,
	},
];

app.get('/', (request, response) => {
	response.send('<h1>Hello World</h1>');
});

app.get('/api/notes', (request, response) => {
	response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id);
	console.log({ id });
	const note = notes.find((note) => note.id === id);

	if (note) {
		response.json(note);
	} else {
		response.status(404).end();
	}

	response.json(note);
});

app.delete('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id);
	notes = notes.filter((note) => note.id !== id);
	response.status(204).end();
});

app.post('/api/notes', (request, response) => {
	const note = request.body;

	if (!note || !note.content) {
		return response.status(400).json({
			error: 'note.content is missing',
		});
	}

	const ids = notes.map((note) => note.id);
	const maxId = Math.max(...ids);

	const newNote = {
		id: maxId + 1,
		content: note.content,
		important:
			typeof note.important !== 'undefined'
				? note.important
				: false || false,
		date: new Date().toISOString(),
	};

	notes = [...notes, newNote];

	response.status(201).json(newNote);
});

app.use((request, response) => {
	response.status(404).json({
		error: 'Not found',
	});
});

app.listen(port, '0.0.0.0', () => {
	console.log(`Server running on port ${PORT}`);
});
