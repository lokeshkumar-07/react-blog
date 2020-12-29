const express = require('express');
const mongoose = require('mongoose');

const app = express();

const mongoUrl =  'mongodb+srv://lokesh-mongo:lokesh-mongo007@cluster0.ami4c.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(mongoUrl, { useNewUrlParser: true})
    .then(() => console.log('DB Connected'))
    .catch((err) => console.error(err));

app.get('/', (req,res) => {
    res.send('Hello World!');
});

app.listen(5000);