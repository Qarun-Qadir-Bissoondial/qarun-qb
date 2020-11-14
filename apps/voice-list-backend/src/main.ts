import * as express from 'express';
import { authRouter } from './routes/auth';
import { listRouter } from './routes/list';
import * as helmet from 'helmet';

const app = express();
app.use(helmet());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/list', listRouter);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});

// get list items
// update list item
// delete list item

server.on('error', console.error);
