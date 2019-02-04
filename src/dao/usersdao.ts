import { Users } from '../models/users';
import { ConnectionPool } from '../utils/connectionPool';
import { Connection } from 'pg';
import { buildUsersForPromiseAll } from '../utils/buildUserForPromiseAll';


export async function findAll(): Promise<Users[]> { //find all the users from database requires a promise because request to database
  const client = await ConnectionPool.connect(); //connect to dbase await cause promise
  try {
    const result = await client.query( 
      'SELECT * FROM Project0.users' //dbname is Project0 and I want to get the users from there.
    );
    return Promise.all(result.rows.map(async(sqlUser) => { //cool functionality I found on a blog that I can return essentially an array of promises instead of doing it separately
      return await buildUsersForPromiseAll(sqlUser); //goes to a build for this specific functionality conversed with Alec to see how he was doing this and thought it sounded intelligent so did it myself
        }));
  } finally {
    client.release(); // releases connection...ya...
  }
}
/* export async function authenticate(username: string, password: string): Promise<Object> { //attempt at JWTs see more on login router
    const client = await ConnectionPool.connect();
    try{
        const loginResult = await client.query(  // grab what we need to grab to authenticate who is trying to log in.
            `SELECT * from users left join roles using (roleid) where username = ${'user'} and password = ${'pass'}`, [username, password]
        );
        const userForLogin: string = loginResult.rows[0].username;
        const roleForLogin = loginResult.rows[0].role;
        const userIdForLogin = loginResult.rows[0].userid;
        return {userForLogin, roleForLogin, userIdForLogin}
    }
catch{
    return undefined;
}
finally {
    client.release(); // release the connection 
}
} */

export async function findById(id: number): Promise<Users> { //a more specific find
  const client = await ConnectionPool.connect();
  try {
    const result = await client.query(
      'SELECT * FROM users WHERE user_id = $1',
      [id]
    );
    const returnedUser = result.rows[0]; // there should only be 1 record
    if (returnedUser) {
      return {
        userId: returnedUser['userid'],
        username: returnedUser.username,
        password: '', // don't send back the passwords that's pretty unsafe
        firstName: returnedUser.firstname,
        lastName: returnedUser.lastname,
        email: returnedUser.email,
        role: returnedUser.role
      };
    } else {
      return undefined;
    }
  } finally {
    client.release(); // release connection
  }
}

export async function update(user: Users): Promise<Users> { //update users info in database
  const client = await ConnectionPool.connect();
  try {
    const result = await client.query(
      `UPDATE users (username, password, name)
        VALUES  ($1, $2, $3)
        RETURNING userid`,
      [user.username, user.password, user.firstName]
    );
    if (result.rows[0]) {
      const id = result.rows[0].userid;
      return {
        ...user,
        userId: id
      };
    } else {
      return undefined;
    }

  } finally {
    client.release(); // release connection
  }
}
}
