const express = require('express');
const app = express();

app.get('/', (request, response) => {
    response.send("Welcome to home");
});

app.get('/hello', (request, response) => {
    response.send("Hello World");
});

app.listen(3000, () => {
    console.log("Started on port 3000");
});