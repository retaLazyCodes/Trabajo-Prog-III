import express from 'express';
import { config } from './config/index.js';
import { userRouter } from './routes/index.js';
import { notFound } from './middlewares/notFound.js';

// only for test db connection
import './config/db.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router Middlewares
app.use(
    config.server.routes.users,
    userRouter
);

// custom middlewares
app.use(notFound);

export { app };
