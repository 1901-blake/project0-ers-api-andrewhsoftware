import { Users } from '../models/users';
import { ConnectionPool } from '../utils/connectionPool';
import { Connection } from 'pg';
import { buildUsersForPromiseAll } from '../utils/buildUserForPromiseAll';


export async function findAllUsers(): Promise<Users[]> { //find all the users from database requires a promise because request to database
  const client = await ConnectionPool.connect(); //connect to dbase await cause promise
  try {
    const result = await client.query( 
      'SELECT * FROM project0.users' //dbname is Project0 and I want to get the users from there.
    );
    return Promise.all(result.rows.map(async(sqlUser) => { //cool functionality I found on a blog that I can return essentially an array of promises instead of doing it separately
      return await buildUsersForPromiseAll(sqlUser); //goes to a build for this specific functionality conversed with Alec to see how he was doing this and thought it sounded intelligent so did it myself
        }));
  } finally {
    client.release(); // releases connection...ya...
  }
}
/* 
Attempted to use JWT, decided against it, but kept code in case I wanted to go back to it.

export async function authenticate(username: string, password: string): Promise<Object> { //attempt at JWTs see more on login router
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

export async function findUserById(id: number): Promise<Users> { //a more specific find
  const client = await ConnectionPool.connect();
  try {
    const result = await client.query(
      'SELECT * FROM project0.users WHERE userid = $1',
      [id]
      
    );
    console.log('query success');
    const returnedUser = result.rows[0]; // there should only be 1 record
    if (returnedUser) {
      return {
        userid: returnedUser.userid,
        username: returnedUser.username,
        password: '', // don't send back the passwords that's pretty unsafe
        firstname: returnedUser.firstname,
        lastname: returnedUser.lastname,
        email: returnedUser.email,
        role: returnedUser.role
      };
    } else {
      console.log("find users by id else")
      return undefined;
    }
  } finally {
    client.release(); // release connection
  }
}
export async function findUserByName(name: string): Promise<Users> { //a more specific find
  const client = await ConnectionPool.connect();
  console.log('here');
  try {
    const result = await client.query(
      'SELECT * FROM project0.users WHERE username = $1',
      [name]
    );
 /*    console.log(result.rows[0]); */
    const returnedUser = result.rows[0]; // there should only be 1 record
    if (returnedUser) {
      return {
        userid: returnedUser['userid'],
        username: returnedUser.username,
        password: returnedUser.password, // don't send back the passwords that's pretty unsafe
        firstname: returnedUser.firstname,
        lastname: returnedUser.lastname,
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

export async function update(req){ //update users info in database
  const client = await ConnectionPool.connect();
  try {
      console.log(req.body.userid);
      console.log(+req.body.userid);
        let userToBeUpdated = await findUserById(+req.body.userid)
        console.log('update value: ' + userToBeUpdated.role);
        if(userToBeUpdated){
          userToBeUpdated.username = req.body.username || userToBeUpdated.username;
          userToBeUpdated.password = req.body.password || userToBeUpdated.password;
          userToBeUpdated.firstname = req.body.firstname || userToBeUpdated.firstname;
          userToBeUpdated.lastname = req.body.lastname || userToBeUpdated.lastname;
          userToBeUpdated.email = req.body.email || userToBeUpdated.email;
          userToBeUpdated.role = req.body.role || userToBeUpdated.role;
        }
        else {
          console.log('first else');
          return -1;
      }
/*       console.log(!Number.isInteger(userToBeUpdated.role))
      console.log(userToBeUpdated.role); */

/*       if (!Number.isInteger(userToBeUpdated.role)){
        return -1;
      } */
      console.log(userToBeUpdated);
      const returnQuery = await client.query(
        `UPDATE project0.users set username = $1, password = $2, 
        firstname = $3, lastname = $4, email = $5,
         role = $7 WHERE userid = $6 returning *`,
         [userToBeUpdated.username,userToBeUpdated.password,userToBeUpdated.firstname,userToBeUpdated.lastname,userToBeUpdated.email,
          userToBeUpdated.userid, userToBeUpdated.role]); //so this will update all the thing that it has supplied with the thing it has supplied, but leave it otherwise blank.
      return returnQuery.rows[0];
    }
   finally {
    client.release(); // release connection
  }
}
