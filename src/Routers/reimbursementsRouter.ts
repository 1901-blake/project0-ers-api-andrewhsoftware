import express from 'express';
import * as ReimbursementsDao from '../dao/reimbursementsDao';

export const reimbursementRouter = express.Router();

reimbursementRouter.post('', async (req,res)=>{
    try {
        const reimbursement = await ReimbursementsDao.save(req.body);
        res.status(200);
        res.json(reimbursement);
      } catch (err) {
        console.log(err);
        res.sendStatus(500);
      }
});


/* reimbursementRouter.get('/status/:statusid', (req,res) => {

});

reimbursementRouter.get('reimbursements/author/userId/:userId', (req,res) =>{

}); */

reimbursementRouter.patch('', async (req, res) => {
    try {
      const reimbursement = await ReimbursementsDao.update(req.body);
      res.status(200);
      res.json(reimbursement);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });   
