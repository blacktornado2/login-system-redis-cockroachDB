import Knex from "knex";

import knexfile from "./knexfile.js";

const db = Knex(knexfile.development);

export default db;
