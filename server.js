const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const methodOverride = require('method-override')
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const jukeboxRouter = require('./controllers/jukebox.js');
app.use(cors({ origin: 'http://localhost:5173' }));

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// middlewares
app.use(express.json());
app.use(methodOverride('_method'))

// Routes go here
app.use('/tracks', jukeboxRouter)

app.listen(3000, () => {
  console.log('The express app is ready!');
});
