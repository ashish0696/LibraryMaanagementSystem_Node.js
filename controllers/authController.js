const { verifyPassword,findUserByEmail } = require("../services/authService.js");
const { generateToken } = require("../utils/jwt.js");
const logger = require("../utils/logger.js");



const loginUser = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        const user = await findUserByEmail(email);

        if (!user) {
            return res.sendError('invalid credentials', 401);
        }

        const pass = await verifyPassword(user, password);
        if (!pass) {
            return res.sendError('invalid credentials', 401);
        }

        const token = generateToken({ id: user.user_id, role: user.role });
    res.sendResponse({ token }, 'login successful', true, 200);
        logger.info(`user with id: ${user.user_id} and role: '${user.role}' has logged in the system`);

    } catch (error) {
        next(error);
    }
};



module.exports = {
    loginUser
};