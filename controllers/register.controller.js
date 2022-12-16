import connectDB from "../config/configDB.js";
import { config } from "dotenv";
config();

const client = connectDB(process.env.DB_CONNECTION_URL);

export const registerUser = async (req, res) => {
    console.log(`registerUser called`);
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({
            status: "registration failed",
            message: "Provide all details required"
        });
    }

    // if username is already registered
    const rows = await client("Users").select("username", "password").where({
        username: username
    });
    console.log(rows);

    // Registration successful
};
