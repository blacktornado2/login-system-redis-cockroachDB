import jwt from "jsonwebtoken";

import client from "../config/configDB.js";
import redis from "../config/redis.js";
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({
            status: "Registration failed",
            message: "Provide all details required"
        });
    };

    const rows = await client("users").select(["username", "password"]).where({
        username
    });
    console.log(rows);
    // if username is already registered
    if (rows.length) {
        return res.json({
            status: "Registration failed",
            message: "User already registered"
        });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    // Registration successful
    await client("users").insert({
        username,
        password: hashedPassword
    });

    const token = jwt.sign({ username: username }, process.env.JWT_SECRET_KEY, {
        expiresIn: 60*5
    });

    const now = new Date();

    await redis.set(username, JSON.stringify({
        username,
        password: hashedPassword,
        token: token,
        created: now
    }));

    return res.json({
        status: "Registration successful",
        message: "User registered successfully",
        token: token
    });
};
