import jwt from "jsonwebtoken";

import client from "../config/configDB.js";
import redis from "../config/redis.js";
import bcrypt from 'bcrypt'

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    // Incomplete credentials
    if (!username || !password) {
        return res.json({
            status: "login failed",
            message: "Provide all details required"
        });
    }

    const user = JSON.parse(await redis.get(username));

    if (user) {
        const comparePassword = await bcrypt.compare(password, user.password);
        
        if(!comparePassword) {
            return res.json({
                status: "Login failed",
                message: "Login failed. Please enter correct password"
            });
        }

        const diffInMilliseconds = new Date() - new Date(user.created);
        const diffInMinutes = diffInMilliseconds / (1000 * 60);

        if(diffInMinutes < 5) {
            return res.json({
                status: "Login successful",
                message: "Login successful. Please continue",
                token: user.token
            });
        }
    };

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

    const now = new Date();

    await redis.set(username, JSON.stringify({
        username,
        password,
        token: token,
        created: now
    }));

    return res.json({
        status: "Login successful",
        message: "Login successful. Please continue",
        token: token
    });
};
