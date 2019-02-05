import * as usersDao from '../dao/usersDao';
import express from 'express';

/* Commented out because decided against using JWTs for this build.    


export async function login(req: any, res) {

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
export const loginRouter = express.Router();

loginRouter.post('', async (req,res) => {
/*     console.log(req.body.username);
    console.log(req.body.password); */
    const user = await usersDao.findUserByName(req.body.username); //this sends it to the Dao to verify it is a user
/*     console.log(user.password); */
    if(req.body.password !== user.password){
        res.sendStatus(401); // bad username or password so sends error
    }
    else {
        user.password = ""
        req.session.user = user; //otherwise yay you're a valid user.
        res.json(user);
    }

});
