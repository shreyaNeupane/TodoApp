const todoModel = require("../models/todoModel");
const mongoose = require("mongoose");

const createTodoController = async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;
    if (!title || !description) {
      return res.status(400).send({
        sucess: false,
        message: "please provide title and description",
      });
    }
    // // Backend creates a Todo document in server memory (temporary, not saved yet)
    const todo = new todoModel({ title, description, createdBy:req.userId });
    //saving data in database
    await todo.save();
    res.status(201).send({
      sucess: true,
      message: "your task has been created",
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "erorr in create todo api",
      error,
    });
  }
}


const getTodoController = async (req, res) => {
  try {
    //get user id
    const { userId } = req.params;
    //validate
    if (!userId) {
      return res.status(404).send({
        success: false,
        message: "No User Found with this id",
      });
    }
    //find task
    const todos = await todoModel.find({
      createdBy: new mongoose.Types.ObjectId(userId),
    });
    if (todos.length === 0) {
      return res.status(404).send({
        success: true,
        message: "you have no todos ",
      });
    }
    res.status(200).send({
      success: true,
      message: "Your Todos",
      todos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get Todo API",
      error,
    });
  }
};



module.exports = { createTodoController, getTodoController };
