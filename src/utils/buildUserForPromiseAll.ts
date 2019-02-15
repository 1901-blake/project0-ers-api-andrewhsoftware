import { Users } from '../Models/users';
import * as rolesDao from '../dao/rolesDao';

export async function buildUsersForPromiseAll(user): Promise<Users>{
    console.log(user);
    return{
        userid: user.userid,
        username: user.username,
        password: 'user.password',
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: await rolesDao.getRoles(user.role)
    }
}