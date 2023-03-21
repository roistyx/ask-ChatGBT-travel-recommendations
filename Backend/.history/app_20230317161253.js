const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

const openai = require('./src/config');

const port = process.env.PORT;

app.listen(port, () => console.log(`server listening on port ${port}`));
