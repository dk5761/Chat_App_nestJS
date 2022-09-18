
// export type User = {
//     _id?: string,
//     email: string,
//     password: string,
//     username: string,
//     is_admin: boolean,
//     profile: Profile,
// }

// export type Profile = {

//     name: string,
//     avatar_url: string

// }

export type CreateUserParams = {
    email: string, password: string, username: string, is_admin: boolean, avatar_url: string, name: string
}