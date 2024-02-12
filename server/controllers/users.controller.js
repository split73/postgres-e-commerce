const db = require("../db");

class UserController {
    generateAccessToken(username) {
        return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
    }

    async createNewUser(req, res) {
        const token = generateAccessToken({ username: req.body.username });
        res.json(token);
    }

}