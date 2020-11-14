import * as knex from 'knex';
const DB_NAME = 'tt_pothole_db';

export class Database {
    private static ref: knex;

    static init() {
        if (this.ref) { return this.ref }

        this.ref = knex({
            client: 'pg',
            connection: {
              user: 'postgres',
              password: 'password',
              host: 'localhost',
              port: 5432,
              database: DB_NAME
            }
          });

          return this.ref;
    }
}

export const db = () => Database.init();