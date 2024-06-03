import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import UsersRouter from './routes/usersRoute.js';
import LinksRouter from './routes/linksRoute.js';
import connectDB from './database.js';

// התחברות למסד הנתונים
connectDB();

const app = express();

app.use(cors());
const port = 3000;
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('1Hello World!');
});


app.use('/users', UsersRouter);
app.use('/links', LinksRouter);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
