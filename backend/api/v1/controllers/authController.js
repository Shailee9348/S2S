import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'neural_secret_odishavox_2026';

// Register User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        let userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "Email already exists in our neural archive." });
        }

        const user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({ 
            message: "User registered successfully.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                planType: user.planType
            }
        });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ error: error.message || "Failed to initialize user session." });
    }
};

// Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: "Invalid neural credentials." });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            message: "Signal verified. Welcome back.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                planType: user.planType
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: error.message || "Failed to authenticate session." });
    }
};

export default {
    registerUser,
    loginUser
};
