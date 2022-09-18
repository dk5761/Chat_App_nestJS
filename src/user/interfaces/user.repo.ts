

import { User } from '@internal/prisma/client';


export abstract class IUserRepository {

    abstract createUser(...CreateUserParams);
    abstract findById(id: string);
    abstract findOne(query: Object);
    abstract findByUsername(username: string);
    abstract update(id: string, data: Partial<User>);
    abstract delete(id: string);

}