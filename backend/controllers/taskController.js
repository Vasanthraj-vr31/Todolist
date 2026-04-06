const Task = require('../models/Task');

// POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, tag } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });
    
    const newTask = new Task({
      title,
      description,
      dueDate,
      tag,
      userId: req.user.id // Securely obtained from jwt via authMiddleware
    });
    
    await newTask.save();
    res.status(201).json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, status, dueDate, tag } = req.body;
    
    // Ensure the task belongs to the user trying to update it
    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user.id },
      { title, description, status, dueDate, tag },
      { new: true, runValidators: true }
    );
    
    if (!task) return res.status(404).json({ message: "Task not found or unauthorized" });
    res.status(200).json({ message: "Task updated", task });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    // Ensure the task belongs to the user trying to delete it
    const task = await Task.findOneAndDelete({ _id: taskId, userId: req.user.id });
    
    if (!task) return res.status(404).json({ message: "Task not found or unauthorized" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
