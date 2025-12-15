const express = require("express");
const { createTodoController, getTodoController } = require("../controllers/todoController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//create todo
router.post("/create", authMiddleware, createTodoController);


router.get('/getAll/:userId',authMiddleware,getTodoController)
module.exports = router; 