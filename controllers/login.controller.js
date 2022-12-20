import jwt from "jsonwebtoken";

import client from "../config/configDB.js";

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

    const token = jwt.sign({ username: username }, process.env.JWT_SECRET_KEY, {
        expiresIn: 60 * 60
    });

    return res.json({
        status: "Login successful",
        message: "Login successful. Please continue",
        token: token
    });
};
