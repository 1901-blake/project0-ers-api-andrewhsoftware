import express from 'express';
import * as ReimbursementsDao from '../dao/reimbursementsDao';
import { userIsLoggedIn, checkIfUserIsFinanceManagerOrAdmin, checkIfUserIsTheRequiredRole } from '../middleware/authLoginMiddleware';

export const reimbursementRouter = express.Router();

reimbursementRouter.post('',[userIsLoggedIn, async (req,res)=>{
    try {
        console.log(req.body)
        req.body.author = req.session.user.userid
        console.log(req.body);
        const reimbursement = await ReimbursementsDao.addReimbursement(req.body);
        res.status(200);
        res.json(reimbursement);
      } catch (err) {
        console.log(err);
        res.sendStatus(500);
      }
}]);


reimbursementRouter.get('/status/:statusId',[userIsLoggedIn, checkIfUserIsFinanceManagerOrAdmin, async (req, res) => {
    const idParam = req.params.statusId;
    //console.log(req.params.statusId);
    //console.log(idParam);
    try{
        const reimbursement = await ReimbursementsDao.findByStatusId(idParam);
        //console.log(reimbursement);
        if(reimbursement){
            res.json(reimbursement);
        }
        else{
            res.sendStatus(400);
        }
    } catch(err) {
        //console.log(err);
        res.sendStatus(500);
    }

}]);
reimbursementRouter.get('/author/userid/:userid',[userIsLoggedIn, checkIfUserIsTheRequiredRole, async (req, res) => {
    const idParam = req.params.userid;
    console.log(req.params.userid); 
    try{
        const reimbursement = await ReimbursementsDao.findReimbursementsByUser(idParam);
        if(reimbursement){
            console.log(reimbursement);
            res.json(reimbursement);
        }
        else{
            res.sendStatus(400);
        }
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }

}]);
reimbursementRouter.patch('',[userIsLoggedIn, checkIfUserIsFinanceManagerOrAdmin, async (req, res) => {
    try {
        req.body.resolver = req.session.user.userid;
        console.log("This is the req.session.user.userid" + req.session.user.userid);
        console.log("This is the req.body" + req.body.resolver);
      const reimbursement = await ReimbursementsDao.update(req.body);
      res.json(reimbursement);
      res.status(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }]);  