require('dotenv').config();

const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
// const NotesService = require('./services/inMemory/NotesService');
const NotesService = require('./services/postgres/NotesService');
const NotesValidator = require('./validator/notes');

const init = async () => {
  const notesService = new NotesService();
  const server = Hapi.server({
    // port: process.env.NODE_ENV !== 'production' ? 5000 : process.env.PORT || 3000,
    // host: process.env.NODE_ENV !== 'production' ? 'localhost' : process.env.HOST || '0.0.0.0',
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['http://notesapp-v1.dicodingacademy.com'],
      },
    },
  });

  await server.register({
    plugin: notes,
    options: {
      service: notesService,
      validator: NotesValidator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
