import { ReimbursementTypes } from '../models/reimbursementTypes';
import { ConnectionPool } from '../utils/connectionPool';
import { ReimbursementStatuses } from '../Models/reimbursementStatuses';
import { Reimbursement } from '../Models/reimbursements';
import { buildReimbursementsForPromiseAll } from '../utils/buildReimbursementsForPromiseAll';

export async function findReimbursementsByUser(userid: number): Promise<Reimbursement[]> {
    const client = await ConnectionPool.connect();
    try {
        console.log(userid);
      const result = await client.query(
        'SELECT * FROM project0.reimbursements WHERE author = $1 ORDER BY datesubmitted ASC',
        [userid]
      );
      console.log(result);
      if(result){
        return Promise.all(result.rows.map(async (reimbursements) => {
          return await buildReimbursementsForPromiseAll(reimbursements);
        }));
      } else {
        return undefined;
      }
    } finally {
      client.release(); // release connection
    }
  }

export async function getReimbursementType (typeid:number): Promise<ReimbursementTypes> {
    const client = await ConnectionPool.connect();
    console.log("getreimbursementtype")
    try {
        const result = await client.query(
          'SELECT * FROM project0.reimbursementtypes WHERE typeid = $1',
          [typeid]
        );
        const sqlReimbursementType = result.rows[0]; // there should only be 1 record
        if(sqlReimbursementType){
            return {
                typeId: sqlReimbursementType.typeid,
                type: sqlReimbursementType.type
            }
        }else{
            return undefined;
        }  
    } finally{
        client.release();
    }
}

export async function getReimbursementStatus (statusid:number): Promise<ReimbursementStatuses> {
    const client = await ConnectionPool.connect();
    try {
        console.log(statusid);
        const result = await client.query(
          'SELECT * FROM project0.reimbursementstatuses WHERE statusid = $1',
          [statusid]
        );
        console.log(result.rows[0]);
        const returnOfSQLStatementForReimbursementStatus = result.rows[0]; // there should only be 1 record
        if(returnOfSQLStatementForReimbursementStatus){
            console.log("finished");
            return {
                statusid: returnOfSQLStatementForReimbursementStatus.statusid,
                status: returnOfSQLStatementForReimbursementStatus.status
            }
        }else{
            return undefined;
        }  
    } finally{
        client.release();
    }
}

export async function findByStatusId(status: number): Promise<Reimbursement[]> {
    const client = await ConnectionPool.connect();
    try {
        console.log(status);
      const result = await client.query(
        'SELECT * FROM project0.reimbursements WHERE status = $1 ORDER BY datesubmitted ASC',
        [status]
      );
      console.log(result);
      if(result){
        return Promise.all(result.rows.map(async (reimbursements) => {
          return await buildReimbursementsForPromiseAll(reimbursements);
        }));
      } else {
        return undefined;
      }
    } finally {
      client.release(); // release connection
    }
  }
export async function update(reimbursement: Reimbursement) {
    const client = await ConnectionPool.connect();
    try {
        // If the status is being updated to approved or denied, add the current date as the date resolved. Otherwise, leaved it null
        let currentDate = new Date().toISOString().split('T')[0];;
        if (reimbursement.status.statusid === (1)) {
            currentDate = undefined;
        }
        const result = await client.query(
            `update project0.reimbursements set author = $1, amount = $2, datesubmitted = $3, dateresolved = $4,
             description =$5, status = $6, type = $7 where reimbursementid = $8
            returning *;`,
            [reimbursement.author, reimbursement.amount, reimbursement.datesubmitted, currentDate, reimbursement.description, reimbursement.status, reimbursement.type, reimbursement.reimbursementid,]
        );
        console.log(result.rows[0])
        if (result.rows[0]) {
            const reimbursement = result.rows[0];
            return ({
                reimbursementid: reimbursement.reimbursementid,
                author: reimbursement.author,
                amount: reimbursement.amount,
                datesubmitted: reimbursement.datesubmitted,
                dateresolved: reimbursement.dateresolved,
                description: reimbursement.description,
                resolver: reimbursement.resolver,
                status: reimbursement.status,
                type: reimbursement.type
            });
        } else {
            return undefined;
        }
    } finally {
        client.release();
    }
}
export async function addReimbursement(reimbursement: Reimbursement) {
    const client = await ConnectionPool.connect();
    try {
        const currentDate = new Date().toISOString().split('T')[0];;
        console.log(currentDate);
        console.log(typeof(currentDate));
        const result = await client.query(
            `INSERT into project0.reimbursements (author,amount, datesubmitted, dateresolved, description,status,type,reimbursementid) 
            values ($1,$2,$3, $4, $5, $6,$7, default)
                        returning *;`,
            [reimbursement.author, reimbursement.amount, currentDate, currentDate, reimbursement.description, reimbursement.status, reimbursement.type]
        );
        if (result.rows[0]) {
            const reimbursement = result.rows[0];
            return ({
                reimbursementId: reimbursement.reimbursementid,
                author: reimbursement.author,
                amount: reimbursement.amount,
                dateSubmitted: reimbursement.date_submitted,
                dateResolved: reimbursement.date_resolved,
                description: reimbursement.description,
                resolver: reimbursement.resolver,
                status: reimbursement.status,
                type: reimbursement.type
            });
        } else {
            return undefined;
        }
    } finally {
        client.release();
    }
}