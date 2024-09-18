import express from 'express';
import { config } from './config/index.js';
import { userRouter } from './routes/index.js';

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

export { app };
