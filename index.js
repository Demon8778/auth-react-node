const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const router = require('./router');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/react-redux-auth', {
	useNewUrlParser: true
});

router(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
