import { Users } from '../Models/users';
import * as rolesDao from '../dao/rolesDao';

export async function buildUsersForPromiseAll(userJson): Promise<Users>{
    return{
        userid: userJson.userid,
        username: userJson.username,
        password: userJson.password,
        firstname: userJson.firstname,
        lastname: userJson.lastname,
        email: userJson.email,
        role: await rolesDao.getRoles(userJson.roleid)
    }
}