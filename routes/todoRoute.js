const express = require("express");
const {
  createTodoController,
  getTodoController,
  deletetodoController,
  updatetodoController,
} = require("../controllers/todoController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//create todo
router.post("/create", authMiddleware, createTodoController);

router.get("/getAll/:userId", authMiddleware, getTodoController);
router.patch("/update/:id", authMiddleware,updatetodoController)
router.delete("/delete/:id", authMiddleware, deletetodoController);
module.exports = router;
