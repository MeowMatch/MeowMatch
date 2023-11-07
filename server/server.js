const path = require('path');
const express = require('express');
const router = require('./routes/api');
const cors = require('cors');

const app = express();
const PORT = 3000;

// const multer = require('multer');
// const upload = multer({ dest: './client/public/images' }); //replace '/public/images' with the proper path, in case it's wrong.
/**
 * in .post requests, we'd do either upload.single('name') as a middleware, or upload.array('name', number) if it's an array of photos.
 * For both of those, req.body will have whatever text fields were passed in.
 */

app.use(cors());

// HANDLE PARSING REQUEST BODY
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   '/style.css',
//   express.static(path.join(__dirname, '../client/public/style.css'))
// );
// app.use(
//   '/login.css',
//   express.static(path.join(__dirname, '../client/login.css'))
// );

app.use(express.static(path.join(__dirname, '../client/public')));

// define route handler
app.use('/', router);

// Route handler to respond with main app
app.get('/*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/public/index.html'));
});

// CATCH-ALL ROUTE HANDLER
app.use('*', (req, res) => res.sendStatus(404));

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);

  return res.status(errorObj.status).send(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
