import * as bcrypt from 'bcrypt';
import { Router, Request, Response } from 'express';
import { environment } from '../environments/environment';
import { stripDbFields } from './../utils';
import { User } from '../db/user';

export const authRouter = Router();
// const db = require('../models/index');
// const User = require('../models/user')(db.sequelize, db.Sequelize.DataTypes);

authRouter.post('/check_email', (req: Request, res: Response) => {
  const { email } = req.body;


});


// authRouter.post('/check_email', (req: Request, res: Response) => {
//     const { email } = req.body;
  
//     if (!email) { res.status(400).send({message: 'Data missing from request body'}) }
//     User
//       .findOne({where: { email }})
//       .then(user => {
//         !user
//           ? res.status(200).send({available: true})
//           : res.status(409).send({available: false})
//       })
//       .catch(error => { res.status(500).send({message: 'Something went wrong internally'}); });
  
//   });
  
//   authRouter.post('/register', (req: Request, res: Response) => {
    
//     const {firstname, lastname, email, password} = req.body;
  
//     if (!firstname || !lastname || !email || !password) {  
//       res.status(400).send({message: 'Data missing from request body'});
//     }
  
//     bcrypt.hash(password, environment.SALT_ROUNDS, (error: Error, hash: string) => {
  
//       User.create({
//         firstname,
//         lastname,
//         email,
//         password: hash
//       }).then(createdUser => {
//         res.status(200).send({message: 'User created successfully', user: stripDbFields(createdUser.toJSON())});
//       }).catch(error => {
//         console.log(error);
//         res.status(500).send({message: 'Internal Error Occurred. Please try again later'})
//       });
  
//     })
  
//   });
  
//   authRouter.post('/login', (req: Request, res: Response) => {
    
//     const { email, password } = req.body;
//     if (!email || !password) {
//       res.status(400).send({message: 'Data missing from request body'})
//     }
  
//     User
//       .findOne({where: { email }})
//       .then(user => {
//         if (!user) {
//           res.status(404).send({message: 'User not found'})
//         } else {
//           bcrypt
//             .compare(password, user.password, (error: Error, same: boolean) => {
//               same
//                 ? res.status(200).send({message: 'login successful', user: stripDbFields(user.toJSON())})
//                 : res.status(401).send({message: 'Email and password do not match'})
//             })
//         }
//       })
//       .catch(error => { console.log(error); res.status(500).send({message: 'Email and password do not match'}) })
  
//   }); 
