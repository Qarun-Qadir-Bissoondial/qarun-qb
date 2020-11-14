import * as express from 'express';
import { db } from './app/db_ref';
import * as formidable from 'express-formidable';

// Create singleton for Database connection

export interface Pothole {
  uuid?: string;
  street: string;
  area: string;
  areaDesc: string;
  status: number; // 0 - Pothole not fixed, 1 - Pothole is fixed. Increment for future statuses
  lat?: number;
  long?: number;
  image?: File;
  createdAt?: Date;
  updatedAt?: Date;
}


const app = express();
app.use(express.json());
app.use(formidable({
  multiples: true
}))

export const TABLE_NAME = 'pothole';

const dbClient = db();

const initDB = () => {
  dbClient.schema.hasTable(TABLE_NAME).then(exists => {
    if (exists) { return; }

    if (!exists) {
      
    }
  })
}

initDB();

// const dbClient = knex({
//   client: 'pg',
//   connection: {
//     user: 'dmsppzsf',
//     password: 'Ep9XEihcnApbmQEd0ekMJD-BdDtYuF8u',
//     host: 'lallah.db.elephantsql.com',
//     port: 5432,
//     database: 'dmsppzsf'
//   }
// });

// dbClient(TABLE_NAME).then(console.log).catch(console.error);

const handleError = ({res, error}) => {
  console.log(res);
  console.log(error);
}

const lowerCaseReqBody = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  for (const key in req.body) {
    req.body[key] = req.body[key].trim().toLowerCase();
  }
  next();
}

const parseReqBody = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  for (const key in req.query) {
    req.query[key] = (req.query[key] as string).trim().toLowerCase();

    if (!req.query[key]) {
      delete req.query[key]
    }
  }

  next();
}

app.post('/pothole/add', lowerCaseReqBody, (req: any, res) => {
  console.log(req.fields as any);
  console.log(req.files as any);
  res.sendStatus(200);
  // dbClient(TABLE_NAME).insert(req.body).then(() => { res.status(200).send({message: 'Hole added succesfully!'}) }, console.error);
});

app.get('/pothole/all', (req, res) => {
  dbClient(TABLE_NAME).select().then(rows => { console.log(rows); res.status(200).send(rows); }, error => handleError({res, error}));
});

app.get('/pothole/search', parseReqBody, (req, res) => {
  console.log(req.query);

  dbClient(TABLE_NAME)
    .select()
    .where({status: 0})
    .then(rows => {

      let filteredRows: Pothole[] = rows;

      for (const key in req.query) {
        filteredRows = filteredRows.filter(hole => hole[key].includes(req.query[key]))
      }

      console.log(filteredRows);

      res
        .status(200)
        .send(filteredRows);
      }
    )
    .catch(error => handleError({res, error}));
});

app.put('/pothole/update', (req, res) => {
  const { uuid, status } = req.body as Pothole;

  dbClient(TABLE_NAME)
    .where({uuid})
    .update({status}, ['uuid', 'status', 'street', 'area', 'areaDesc', 'lat', 'long', 'image'])
    .then(row => {
      if (row.length === 0) {
        res.status(404).send({message: 'Hole does not exist'});
        return;
      }
      
      console.log(row);
      res.status(200).send({message: 'Row updated successfully!', data: row[0]})
    })
    .catch(error => { console.log('ERROR ERROR ERROR'); console.log(error); });
});

app.delete('/pothole/delete', (req, res) => {
  const { uuid } = req.body as Pothole;

  dbClient(TABLE_NAME)
    .where({uuid})
    .del()
    .then(row => {
      if (row === 0) {
        res.status(404).send({message: "Pothole does not exist"});
        return
      } 
      
      res.status(200).send({message: 'Deleted successfully!'}); })
    .catch(console.error);
})

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
