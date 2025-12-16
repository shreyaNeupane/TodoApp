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
    const todo = new todoModel({ title, description, createdBy: req.userId });
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
};

// get todos
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

//delete todo
const deletetodoController = async (req, res) => {
  try {
    //check if id exists in url
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        message: "please provide todo id",
      });
    }
    //find id in database and delete
    const todo = await todoModel.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).send({
        success: false,
        message: "No task found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Your task has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
    });
  }
};

// update todo
const updatetodoController = async (req, res) => {
  try {
    const {id} = req.params;
    if (!id) {
      return res.status(400).send({
        message: "please provide todo id",
      });
    }
    const data = req.body;
    //update
    const todo = await todoModel.findByIdAndUpdate(
      id,
      //mongodb operator = >Only updates the fields I provide, leave the rest untouched.”
      { $set: data },
      //returns update document 
      { returnOriginal: false }
    );
    res.status(200).send({
      sucess: true,
      message: "your task has been updated",
      todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      error,
      message: "Error In update Todo",
    });
  }
};
module.exports = {
  createTodoController,
  getTodoController,
  deletetodoController,
  updatetodoController,
};
