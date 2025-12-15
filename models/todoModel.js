const mongoose = require('mongoose')
//mongoose.Schema({ ... }) creates a blueprint for your MongoDB documents. no docment is stored just a blueprint
const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        required:true,
        default:false
    },
    createdBy:{
        ref:'users',
        type: mongoose.Schema.ObjectId,
    }
},{timestamps:true})

// mongoose.model => function that creates a Model.
//passing schema blueprint (todoSchema) to mongoose.model() named todo
const todoModel = mongoose.model('todo',todoSchema)
module.exports = todoModel