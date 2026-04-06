const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// validation helper
const validateRegisterInput = (data) => {
  const errors = [];
  if (!data.userId) errors.push("userId is required");
  if (!data.username) errors.push("username is required");
  if (!data.password || data.password.length < 6) errors.push("password is required and must be at least 6 characters");
  if (!data.year) errors.push("year is required");
  if (!data.Department) errors.push("Department is required");
  if (!data.email) errors.push("email is required");
  if (!data.Age) errors.push("Age is required");
  return errors;
};

exports.register = async (req, res) => {
  try {
    const errors = validateRegisterInput(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const { userId, username, password, year, Department, email, Age } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { userId }] });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email or userId already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userId,
      username,
      password: hashedPassword,
      year,
      Department,
      email,
      Age
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, userId: user.userId, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        userId: user.userId,
        username: user.username,
        email: user.email,
        Department: user.Department,
        year: user.year,
        Age: user.Age
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
