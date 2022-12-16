export const loginUser = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.json({
            status: "login failed",
            message: "Provide all details required"
        });
    }

    // if username not found
    // if password is incorrect
};
