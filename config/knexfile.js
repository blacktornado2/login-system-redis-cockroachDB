import { config } from "dotenv";

config();

export default {
    development: {
        client: "cockroachdb",
        connection: process.env.DB_CONNECTION_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    }
};
