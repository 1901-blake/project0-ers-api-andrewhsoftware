import { ReimbursementTypes } from '../models/reimbursementTypes';
import { ConnectionPool } from '../utils/connectionPool';
import { ReimbursementStatuses } from '../Models/reimbursementStatuses';
import { Reimbursement } from '../Models/reimbursements';

export async function getReimbursementTypes(typeid:number): Promise<ReimbursementTypes>{
    const pool = await ConnectionPool.connect();
    try{
        const resultOfQuery = await pool.query(
            `SELECT * from project0.reimbursementtypes WHERE typeid = ${typeid}`);
        const returnOfSQLStatementOfReimbursementTypes = resultOfQuery.rows[0]; 
        if(returnOfSQLStatementOfReimbursementTypes){
            return { 
                typeId: returnOfSQLStatementOfReimbursementTypes.typeid, 
                type: returnOfSQLStatementOfReimbursementTypes.type
            }
        } else{return undefined;}

    }finally{pool.release();}

}
export async function getReimbursementStatuses(statusid:number): Promise<ReimbursementStatuses>{
    const connectionPool = await ConnectionPool.connect();
    try{
        const resultOfQuery = await connectionPool.query(
            `SELECT * from project0.reimbursementstatuses WHERE statusid = $1`[statusid]
        )
        const returnofSQLStatementOfReimbursementStatuses = resultOfQuery.rows[0];
        if(returnofSQLStatementOfReimbursementStatuses){
            return{
                statusId: returnofSQLStatementOfReimbursementStatuses.statusid,
                status: returnofSQLStatementOfReimbursementStatuses.status
            };
        }else{ return undefined; }
    }finally {connectionPool.release();}
}
export async function update(reimbursement: Reimbursement) {
    const client = await ConnectionPool.connect();
    try {
        // If the status is being updated to approved or denied, add the current date as the date resolved. Otherwise, leaved it null
        let currentDate = new Date();
        if (reimbursement.status.statusId === (1)) {
            currentDate = undefined;
        }
        const result = await client.query(
            `update project0.reimbursement set author = $1, amount = $2, datesubmitted = $3, dateresolved = $4,
             description =$5, status = $6, type = $7 where reimbursementid = $8
            returning *`,
            [reimbursement.author, reimbursement.amount, reimbursement.dateSubmitted, currentDate, reimbursement.description, reimbursement.status, reimbursement.type, reimbursement.reimbursementId,]
        );
        if (result.rows[0]) {
            const reimbursement = result.rows[0];
            return ({
                reimbursementId: reimbursement.reimbursement_id,
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
export async function save(reimbursement: Reimbursement) {
    const client = await ConnectionPool.connect();
    try {
        const currentDate = new Date().toISOString().split('T')[0];;

        const result = await client.query(
            `INSERT into project0.reimbursement set author = $1, amount = $2, datesubmitted = $3, dateresolved = $4,
             description =$5, status = $6, type = $7, reimbursementid = default
            returning *`,
            [reimbursement.author, reimbursement.amount, reimbursement.dateSubmitted, currentDate, reimbursement.description, reimbursement.status, reimbursement.type]
        );
        if (result.rows[0]) {
            const reimbursement = result.rows[0];
            return ({
                reimbursementId: reimbursement.reimbursement_id,
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