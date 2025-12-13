const express = require('express')
const { createTodoController } = require('../controllers/todoController')

const router = express.Router()

//create todo
router.post('/create',createTodoController)

module.exports = router;