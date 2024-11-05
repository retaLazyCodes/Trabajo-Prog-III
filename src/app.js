import express from 'express';
import { config } from './config/index.js';
import {
    userRouter,
    emailRouter,
    officeRouter,
    authRouter,
    reportsRouter,
    claimsRouter,
    claimTypeRouter
} from './routes/index.js';
import { notFound } from './middlewares/notFound.js';
import path from 'path';
import { fileURLToPath } from 'url';

// only for test db connection
import './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router Middlewares
app.use(config.server.routes.users, userRouter);
app.use(config.server.routes.offices, officeRouter);
app.use(config.server.routes.email, emailRouter);
app.use(config.server.routes.auth, authRouter);
app.use(config.server.routes.reports, reportsRouter);
app.use(config.server.routes.claims, claimsRouter);
app.use(config.server.routes.claimsType, claimTypeRouter);

// custom middlewares
app.use(notFound);

export { app };
