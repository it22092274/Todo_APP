const User = require("../models/Users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET ; // Ensure you have this in your environment variables

// Login function
const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Check if all fields are provided
        if (!email || !password) {
            return res.status(401).json({ message: "All fields are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Create JWT payload
        const payload = {
            user: {
                id: user.id,
                email: user.email,
                fname: user.fname,
                lname: user.lname
            }
        };

        // Sign JWT token (expires in 100 years to mimic never-ending session)
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '100y' });

        return res.status(200).json({ message: "Login Successful", token });
    } catch (error) {
        next(error);
    }
};

// Helper function to validate names
const isValidName = (name) => {
    const regex = /^[a-zA-Z]+$/; // Only allows letters
    return regex.test(name);
};

// Register users
const signup = async (req, res, next) => {
    const { fname, lname, email, password, type } = req.body;
    try {
        // Check if all fields are provided
        if (!fname || !lname || !email || !password || !type) {
            return res.status(401).json({ message: "All fields are required" });
        }

        // Validate fname and lname
        if (!isValidName(fname) || !isValidName(lname)) {
            return res.status(401).json({ message: "First and last names should only contain letters" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            fname,
            lname,
            email,
            password: hashedPassword,
            type
        });

        // Save user to database
        await newUser.save();

        return res.status(200).json({ message: "Signup Successful", data: newUser });
    } catch (error) {
        next(error);
    }
};

module.exports = {signup, login};
