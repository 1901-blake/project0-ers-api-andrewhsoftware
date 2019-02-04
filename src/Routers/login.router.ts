import * as usersDao from '../dao/usersdao';
import express from 'express';
import jwt from 'jsonwebtoken';

export const loginRouter = express.Router();

/* export async function login(req: any, res) {

    const username = req.body.username;
    const password = req.body.password;

    const authUserForLogin = await usersDao.authenticate(username, password); //returns an 

    if(authUserForLogin){
    const authUserLoggedIn = authUserForLogin;
    res.send(jwt.sign(authUserLoggedIn, 'privatekey', { expiresIn: '1h' }, (err,token)   =>{
        if(err) {console.log(err) }
        res.send(token);
    }))

    } else { console.log('Error: Could not Log in')}
} */
loginRouter.post('/login', (req, res) => {
    console.log(req.body);
    if (req.body.username === 'blake' && req.body.password === 'password') {
      const user = {
        username: req.body.username,
        role: 'admin'
      };
      req.session.user = user;
      res.json(user);
    } else if (req.body.username === 'hank' && req.body.password === 'password') {
      const user = {
        username: req.body.username,
        role: 'associate'
      };
      req.session.user = user;
      res.json(user);
    } else {
      res.sendStatus(401);
    }
  });
