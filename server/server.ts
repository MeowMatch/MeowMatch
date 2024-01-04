import path from 'path';
import express, { Express, Request, Response, NextFunction } from 'express';
import apiRouter from './routes/api';
import cors from 'cors';

const app: Express = express();
const PORT: number = 3000;

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
app.use('/', apiRouter);

// Route handler to respond with main app
app.get('/*', (req: Request, res: Response) => {
  res.status(200).sendFile(path.join(__dirname, '../client/public/index.html'));
});

// CATCH-ALL ROUTE HANDLER
app.use('*', (req: Request, res: Response) => res.sendStatus(404));

// GLOBAL ERROR HANDLER
app.use((err: any, req: Request, res: Response, next:NextFunction) => {
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

export default app;