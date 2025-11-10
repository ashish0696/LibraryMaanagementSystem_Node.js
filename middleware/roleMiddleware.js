const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Authentication required' });
            }

            const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Access denied for this resource' });
            }

            return next();
        } catch (err) {
            return res.status(500).json({ message: 'Authorization failure' });
        }
    };
};

module.exports = { roleMiddleware };