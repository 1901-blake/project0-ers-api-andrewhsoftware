import express from 'express'
import * as userDao from "../dao/usersDao"
import { checkIfUserIsAdmin, checkIfUserIsTheRequiredRole, userIsLoggedIn } from '../middleware/authLoginMiddleware';

export const usersRouter = express.Router();


usersRouter.get('', [userIsLoggedIn, checkIfUserIsTheRequiredRole, async (req, res) => {

    try{
        const users = await userDao.findAllUsers();
        res.json(users);
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }

}]);
usersRouter.get('', [userIsLoggedIn, checkIfUserIsTheRequiredRole, async (req, res) => {

    try{
        const users = await userDao.findAllUsers();
        res.json(users);
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }

}]);

/* usersRouter.get('/:username',[userIsLoggedIn, checkIfUserIsTheRequiredRole, async (req, res) => {
    const idParam = +req.params.userId;
    console.log(+req.params.userId);
    try{
        const user = await userDao.findUserById(idParam);
        if(user){
            res.json(user);
        }
        else{
            res.sendStatus(400);
        }
    } catch(err) {
        res.sendStatus(500);
    }

}]);
 */

usersRouter.patch('',[userIsLoggedIn, checkIfUserIsAdmin, async (req, res) => {
    try{
        let result = await userDao.update(req);
        console.log(result);
        if(result === -1){
            res.sendStatus(400);
        } else{
            res.json(result);
        }
    }catch (err) {
        console.log(err);
        res.sendStatus(500)
    }

}]);