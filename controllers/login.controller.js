import client from "../config/configDB.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({
            status: "login failed",
            message: "Provide all details required"
        });
    }

    const rows = await client("users")
        .select(["username", "password"])
        .where({ username: username });

    // if username not found
    if (!rows.length) {
        return res.json({
            status: "login failed",
            message: "User not found. Please verify username"
        });
    }

    // if password is incorrect
    if (password !== rows[0].password) {
        return res.json({
            status: "login failed",
            message: "Password incorrect"
        });
    }

    return res.json({
        status: "Login successful",
        message: "Login successful. Please continue",
        token: ""
    });
};
