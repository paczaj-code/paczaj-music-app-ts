// import * as path from 'path';
import express, { Application } from 'express';
// @ts-ignore
// import front from '../build';
const app: Application = express();
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// app.use(express.json());
// const pgp = require('pg-promise')(/* options */);
// const db = pgp(
//   'postgres://paczajmusic:paczajmusic@paczaj-music-database:5432/paczajmusic'
// );

// const router = require('./src/router/router');
// import router from './router/router';

// app.use(express.json());
// app.use('/api/', router);
// db.any('SELECT id,name FROM artist ORDER BY name ASC')
//     .then((data) => {
//         console.log(JSON.stringify(data))
//     })
//     .catch((error) => {
//         console.log('ERROR:', error)
//     })
app.get('/', (req, res) => {
  res.send('Hello My World too sss!');
})

export default app;
