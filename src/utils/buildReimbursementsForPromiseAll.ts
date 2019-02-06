import * as ReimbursementStatusDao from "../dao/reimbursementsDao";
import { Reimbursement } from "../models/Reimbursements";

export async function buildReimbursementsForPromiseAll(reimbursements): Promise<Reimbursement>{
    console.log(reimbursements);
    return {
        reimbursementid: reimbursements.reimbursementid,
        author: reimbursements.author,
        amount: reimbursements.amount,
        datesubmitted: reimbursements.datesubmitted,
        dateresolved: reimbursements.dateresolved,
        description: reimbursements.description,
        resolver: reimbursements.resolver,
        status: await ReimbursementStatusDao.getReimbursementStatus(reimbursements.status),
        type: await ReimbursementStatusDao.getReimbursementType(reimbursements.type)
    };

}