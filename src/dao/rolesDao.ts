import { Role } from '../Models/roles'
import { ConnectionPool } from '../utils/connectionPool';

export async function getRoles (role:number): Promise<Role> { //legitimately only built this for the promise all-.-
    const client = await ConnectionPool.connect();
    try {
        console.log(role);
        const result = await client.query(
          'SELECT * FROM project0.roles WHERE roleid = $1',
          [role]
        );
        console.log(result.rows[0]);
        const returnOfSQLStatementRole = result.rows[0]; // there should only be 1 record
        if(returnOfSQLStatementRole){
            return {
                roleid: returnOfSQLStatementRole.roleid,
                role: returnOfSQLStatementRole.rolename
            }
        }else{
            return undefined;
        }  
    } finally{
        client.release();
    }
}