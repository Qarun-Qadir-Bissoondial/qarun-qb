import { stripDbFields } from './../utils';
import { Router, Request, Response } from 'express';

export const listRouter = Router();
// const db = require('../models/index');
// const List = require('../models/list')(db.sequelize, db.Sequelize.DataTypes);
// const User = require('../models/user')(db.sequelize, db.Sequelize.DataTypes);

// get list for user
// listRouter.get('/', (req: Request, res: Response) => {
//     const id = req.query['id'];
//     console.log(id);

//     User.findAll({
//       where: { uuid: id },
//       include: [{
//         model: List
//       }]
//     }).then(console.log).catch(console.error);

//     // res.sendStatus(200);
//     // List
//     //   .findAll({where: { UserId: id }})
//     //   .then(lists => {
//     //     res.status(200).send({lists: stripDbFields(lists.toJSON())})
//     //   })
//     //   .catch(error => {
//     //     console.log(error);
//     //     res.status(500).send({message: 'Something went wrong internally'});
//     //   })
// });

// // add list
// listRouter.post('/add', (req: Request, res: Response) => {
//   const { listname } =  req.body;

//   List
//     .create({
//       listname,
//       completed: 0,
//       pending: 0
//     })
//     .then(list => {
//       res.status(200).send({list: stripDbFields(list.toJSON())})
//     })
//     .catch(error => { 
//       console.log(error);
//       res.status(500).send({message: 'Something went wrong internally'});
//     });

// })

// update list
// delete list