import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'neural_secret_odishavox_2026';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error("Auth Middleware Error:", error);
            res.status(401).json({ error: "Unauthorized neural access. Session expired." });
        }
    }

    if (!token) {
        res.status(401).json({ error: "Access Denied. No neural token found." });
    }
};
