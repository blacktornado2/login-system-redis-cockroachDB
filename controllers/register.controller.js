import jwt from "jsonwebtoken";

import client from "../config/configDB.js";

export const registerUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({
            status: "registration failed",
            message: "Provide all details required"
        });
    }

    const rows = await client("users").select(["username", "password"]).where({
        username
    });

    // if username is already registered
    if (rows.length) {
        return res.json({
            status: "registration failed",
            message: "User already registered"
        });
    }

    // Registration successful
    await client("users").insert({
        username,
        password
    });

    const token = jwt.sign({ username: username }, process.env.JWT_SECRET_KEY, {
        expiresIn: 60
    });

    return res.json({
        status: "registration successful",
        message: "User registered successfully",
        token: token
    });
};
