import { connection } from './connection';

const INSERT = 'INSERT INTO public."Users"(firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *'
const SELECT = 'SELECT * FROM public."Users" WHERE email = $1'

export const User = {
    create: () => {},
    update: () => {},
    delete: () => {},
    get: () => {  }
};
