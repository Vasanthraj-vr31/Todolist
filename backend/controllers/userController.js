const User = require('../models/User');

exports.getUser = async (req, res) => {
  try {
    const userId = req.user.id; // From authMiddleware
    const user = await User.findById(userId).select("-password"); // Exclude password
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.user.id; // From authMiddleware
    const updates = req.body;

    // Do not allow updating password or userId through this route directly or handle safely
    delete updates.password;
    delete updates.userId;
    delete updates.email; // Email changes usually require more validation

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
