import jwt from "jsonwebtoken";

import client from "../config/configDB.js";

export const isLoggedIn = async (req, res, next) => {
    let token;

    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer")) {
        return res.status(401).json({
            status: "failed",
            message: "Unauthorized user, no token. Login first"
        });
    }

    token = authorization.split(" ")[1];

    if (!token) {
        return res.status(401).send({
            status: "failed",
            message: "unauthorised User, No token"
        });
    }

    // Verify Token
    const { username } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // *** Get user from Token ***
    const rows = await client("users").select(["username", "password"]).where({
        username
    });
    req.user = rows[0];
    next();
};

export const isNotLoggedIn = () => {
    return false;
};
