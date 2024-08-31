var express = require('express');
var app = express();
app.get('/', function (request, response) {
    response.send("Welcome to home");
});
app.get('/hello', function (request, response) {
    response.send("Hello World!");
});
app.listen(3000, function () {
    console.log("Started on port 3000");
});
