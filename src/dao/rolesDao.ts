import { Role } from '../Models/roles'
import { ConnectionPool } from '../utils/connectionPool';

export async function getRoles (roleid:number): Promise<Role> { //legitimately only built this for the promise all-.-
    const client = await ConnectionPool.connect();
    try {
        const result = await client.query(
          'SELECT * FROM project0.roles WHERE roleid = $1',
          [roleid]
        );
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