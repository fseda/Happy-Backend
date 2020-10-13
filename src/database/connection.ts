import { createConnection } from 'typeorm';

    
createConnection()
    .then(() => console.log('\x1b[32m%s\x1b[0m', 'Connected to DB...'))
    .catch(err => console.log('\x1b[31m%s\x1b[0m', 'Could NOT connect...', err));
