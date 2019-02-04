import { Users } from '../Models/users';
import * as rolesDao from '../dao/rolesDao';

export async function buildUsersForPromiseAll(userJson): Promise<Users>{
    return{
        userId: userJson.userId,
        username: userJson.username,
        password: userJson.password,
        firstName: userJson.firstName,
        lastName: userJson.lastName,
        email: userJson.email,
        role: await rolesDao.getRoles(userJson.roleid)
    }
}