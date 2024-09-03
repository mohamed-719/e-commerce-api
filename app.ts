import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; 

const app:express.Application = express();

dotenv.config();


mongoose.connect('mongodb://localhost:27017/e-commerce')
.then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB: ", err);    
})

app.get('/', (request : express.Request, response :express.Response) => {
    response.send("Welcome to home");
});

// app.get('/hello', (request : Request, response : Response) => {
//     response.send("Hello World");
// });

app.listen(3000, () => {
    console.log("Started on port 3000");
});