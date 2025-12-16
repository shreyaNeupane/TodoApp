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
router.delete("/delete/:id", authMiddleware, deletetodoController);
router.patch("/update/:id", authMiddleware,updatetodoController)
module.exports = router;
