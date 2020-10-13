import express from 'express';
import './database/connection';

import router from './routes';

const app = express();

app.use(express.json())
app.use(router);

//#region Param Types
// Query Params: http://localhost:3000/users?search=felipe
// Route Params: http://localhost:3000/users/1 (Identify a resource)
// Body: http://localhost:3000/users/1 
//#endregion



// PORT 
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
