import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const PORT = process.env.PORT || 4123;

export const SECRET = process.env.SECRET || 'ultradificil121';

const app = express();

app.set('port', PORT);

app.use(morgan('dev'));

app.use(cors());

app.use(express.json());

app.use();

export default app;