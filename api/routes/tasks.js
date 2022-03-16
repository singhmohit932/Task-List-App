const router = require("express").Router();
const Task = require("../models/Task");
const User = require("../models/User");

//create a task

router.post("/", async (req, res) => {
  const newTask = new Task(req.body);
  try {
    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (err) {
    res.status(500).json(err);
  }
});
//accept or reject a task

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    console.log(req.body.userId)
    if (task.sharedUserId === req.body.userId) {

      await task.updateOne({ $set: {accepted:req.body.accepted} });
      res.status(200).json("the task status has been updated");
    } else {
      res.status(403).json("you can only accept or reject tasks shared with you");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a task

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the task has been deleted");
    } else {
      res.status(403).json("you can delete only your tasks");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a task

router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all tasks

router.get("/taskList/:userId", async (req, res) => {
  try {
    console.log(req.params.userId); 
    const currentUser = await User.findById(req.params.userId);
    const userTasks = await Task.find({ userId: currentUser._id });
    const userSharedTasks = await Task.find({ sharedUserId: currentUser._id });
    res.status(200).json(userTasks.concat(...userSharedTasks));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
