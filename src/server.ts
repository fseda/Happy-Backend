import express from 'express';
import path from 'path';
import cors from 'cors';

import 'express-async-errors';

import './database/connection';

import router from './routes';
import errorHandler from './errors/handler';

const app = express();

app.use(cors());
app.use(express.json())
app.use(router);
app.use('/uploads', express.static(path.join(__dirname, '..', '/uploads')));
app.use(errorHandler);


// PORT 
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
