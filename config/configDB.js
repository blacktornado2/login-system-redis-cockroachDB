import Knex from "knex";

const connectDB = DB_CONNECTION_URL => {
    const client = new Knex({
        client: "pg",
        connection: DB_CONNECTION_URL
    });
    return client;
};

export default connectDB;
