import client from '../config/configDB.js';

export const getUsers = async (req, res) => {
    const rows = await client("users").select("*");

    return res.json(rows);
};