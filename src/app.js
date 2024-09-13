import express from 'express';

// only for test db connection
import './config/db.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export { app };
