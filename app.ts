import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; 
import dbConnection from './config/db';
import mountRoutes from './routes';
import { Server } from 'http';



const app:express.Application = express();
app.use(express.json());
dotenv.config();
dbConnection();
mountRoutes(app)




let server: Server;
server = app.listen(process.env.PORT, () => {
  console.log(`App is listen on port ${process.env.PORT}`);
})

// when run in prod mode you must to instal ===>  npm run start:prod  | to node Environment worked 

process.on('unhandledRejection', (err: Error) => {
  console.error(`unhandledRejection Error : ${err.name} | ${err.message}`);
  server.close(() => {
    console.error('Application is shutting down...')
    process.exit(1);
  })
})