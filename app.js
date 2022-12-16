import express from "express";
import cors from "cors";
import { config } from "dotenv";

import loginRoutes from "./routes/login.routes.js";
import registerRoutes from "./routes/register.routes.js";

config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/register", registerRoutes);
app.use("/login", loginRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});
