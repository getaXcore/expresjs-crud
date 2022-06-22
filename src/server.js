import cors from 'cors';
import db from './config/database.js';
import Router from './routes/routes.js';
import express from 'express';
import Auth from './config/apikey.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(Auth);

try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error(error);
}

app.use(Router);

app.listen(8081, () => console.log('Server running at http://127.0.0.1:8081'));