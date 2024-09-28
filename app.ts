import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; 
import dbConnection from './config/db';
import mountRoutes from './routes';
import { Server } from 'http';
import helmet from 'helmet';
import cors from 'cors';
import { I18n } from 'i18n';
import path from 'path';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';



const app:express.Application = express();
dotenv.config();
app.use(express.static('uploads'))

app.use(cors({
  origin: ['http://localhost:4200'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-API-KEY'],
  credentials: true
}));
app.use(cookieParser());
app.use(csurf({
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  }
}));

app.use(express.json());
app.use(helmet({ crossOriginResourcePolicy: { policy: 'same-site' } }));


const i18n = new I18n({
  locales: ['en', 'ar'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'en',
  queryParameter: 'lang'
})
app.use(i18n.init);

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