import { Users } from '../models/users';
import { ConnectionPool } from '../utils/connectionPool';
import { Connection } from 'pg';


export async function findAll(): Promise<Users[]> {
  const client = await ConnectionPool.connect();
  try {
    const result = await client.query(
      'SELECT * FROM Project0.users'
    );
    return result.Promise.all(result.rows.map(async(sqlUser) => {
      return {
        username: sqlUser.username,
        password: '', // don't send back the passwords
        firstName: sqlUser.firstname,
        lastName: sqlUser.lastname,
        email: sqlUser.email,
        role: sqlUser.role 
  }
        
      }));
  } finally {
    client.release(); // release connection
  }
}
export async function authenticate(username: string, password: string): Promise<Users> {
    const client = await ConnectionPool.connect();
    try{
        const loginResult = await client.query( 
            `SELECT userid, username, role from users left join roles using (roleid) where username = ${1} and password = ${2}`, [username, password]
        );
        const userForLogin = loginResult.rows[0].username;
        const roleForLogin = loginResult.rows[0].role;
        const userIdForLogin = loginResult.rows[0].userid;
        return {userForLogin, roleForLogin, userIdForLogin}
    }
catch{
    return undefined;
}
finally {
    client.release();
}
}

export async function findById(id: number): Promise<Users> {
  const client = await ConnectionPool.connect();
  try {
    const result = await client.query(
      'SELECT * FROM users WHERE user_id = $1',
      [id]
    );
    const sqlUser = result.rows[0]; // there should only be 1 record
    if (sqlUser) {
      return {
        userId: sqlUser['userid'],
        username: sqlUser.username,
        password: '', // don't send back the passwords
        firstName: sqlUser.firstname,
        lastName: sqlUser.lastname,
        email: sqlUser.email,
        role: sqlUser.role
      };
    } else {
      return undefined;
    }
  } finally {
    client.release(); // release connection
  }
}

export async function update(user: Users): Promise<Users> {
  const client = await ConnectionPool.connect();
  try {
    const result = await client.query(
      `UPDATE INTO users (username, password, name)
        VALUES  ($1, $2, $3)
        RETURNING user_id`,
      [user.username, user.password, user.firstName]
    );
    if (result.rows[0]) {
      const id = result.rows[0].user_id;
      return {
        ...user,
        id: id
      };
    } else {
      return undefined;
    }

  } finally {
    client.release(); // release connection
  }
}
}
