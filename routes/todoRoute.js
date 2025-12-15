const express = require("express");
const { createTodoController } = require("../controllers/todoController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//create todo
router.post("/create", authMiddleware, createTodoController);

module.exports = router;