import express from "express";
import cors from "cors";
import { config } from "dotenv";

import loginRoutes from "./routes/login.routes.js";
import registerRoutes from "./routes/register.routes.js";
import adminRoutes from "./routes/admin.routes.js";
// import { isNotLoggedIn } from "./middlewares/auth.middleware.js";
import redis from './config/redis.js'

config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/admin", adminRoutes);

const connectRedis =  async () => {
    await redis.connect();
    console.log(`Redis connected`);
};

connectRedis();

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});
