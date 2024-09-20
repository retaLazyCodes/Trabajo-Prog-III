import express from 'express';

// only for test db connection
import './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
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
