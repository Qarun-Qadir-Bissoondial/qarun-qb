import { Client } from 'pg';

export const connection = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'voice_list_db',
    password: 'password',
    port: 5432
});
connection.connect();

// const text = 'SELECT * FROM public."Users" WHERE email = $1'
// const values = ['qarun.bissoondial@someone.com'];

// connection.query(text, values, (err, response) => {
//     if (err) { console.error(err); connection.end(); return; }

//     console.log(response.rows[0]);
//     connection.end();
// });
