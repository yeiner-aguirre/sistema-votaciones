const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/voters', require('./routes/voters.routes'));
app.use('/candidates', require('./routes/candidates.routes'));
app.use('/votes', require('./routes/votes.routes'));

module.exports = app;
