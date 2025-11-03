const { verifyToken } = require('../utils/jwt.js');
const User = require('../models/user.js');

const checkAuthJWT = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = verifyToken(token);

        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid or expired session token' });
        }
        req.user = { id: user.user_id, role: user.role };
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = { checkAuthJWT };