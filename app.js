import express from "express";
import cors from "cors";
import { config } from "dotenv";

import loginRoutes from "./routes/login.routes.js";
import registerRoutes from "./routes/register.routes.js";
import { isLoggedIn, isNotLoggedIn } from "./middlewares/auth.middleware.js";

// const createTable = async tableName => {
//     await client.schema.createTable(tableName, table => {
//         table.string("username").notNullable().primary();
//         table.string("password").notNullable();
//     });
// };

// const dropTable = async tableName => {
//     await client.schema.dropTable(tableName);
// };

config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/register", isNotLoggedIn, registerRoutes);
app.use("/login", isNotLoggedIn, loginRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});

// createTable("users");
// dropTable("tableName");
