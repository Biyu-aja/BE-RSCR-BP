"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = authenticateJWT;
const auth_1 = require("../utils/auth");
/**
 * Middleware to protect routes and verify JWT token in authorization header.
 */
function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access token missing or invalid format (Bearer token required)' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = (0, auth_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(403).json({ error: 'Token is invalid or expired', details: error.message });
    }
}
