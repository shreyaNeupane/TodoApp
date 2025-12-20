import React, { useState } from 'react'
import EditTodo from './../EditTodo';
import toast from 'react-hot-toast';
import TodoServices from '../../Services/TodoServices';

const Card = ({allTask ,getUserTask}) => {
   const [showModal, setShowModal] = useState(false);

   //handle edit => onlly changes state
   const handleEdit = () => {
    setShowModal(true)
   }
   const handleDelete = async(id) => {
    try{
      await TodoServices.deleteTodo(id);
    toast.success("task deleted sucessfully");
    getUserTask()
      }catch(error){
      console.log(error)
      toast.error(error)
    }
   }
  return (
    <>
      <div className="card-container">
        {allTask?.map((task, i) => (
          <>
            <div
              className="card border-primary mb-3"
              style={{ maxWidth: "18rem" }}
              key={i}
            >
              <div className="card-header">
                <div className="chead">
                  <h6>{task?.title.substring(0, 10)}</h6>
                  <h6
                    className={
                      task?.isCompleted === true ? "task-cmp" : "task-inc"
                    }
                  >
                    {task?.isCompleted === true ? "Completed" : "incomplete"}
                  </h6>
                </div>
              </div>
              <div className="card-body">
                <h6>{task?.title}</h6>
                <p className="card-text">{task?.description}</p>
                <h6>Date : {task?.createdAt.substring(0, 10)}</h6>
              </div>
              <div className="card-footer bg-transparent border-primary">
                <button
                  className="btn btn-warning"
                  title="EDIT task"
                  onClick={handleEdit}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>

                <button
                  className="btn btn-danger"
                  title="DELETE task"
                  onClick={() => handleDelete(task?._id)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
            <div>
              {/* renders edittodolist if showmodal  is true */}
              {showModal && (
                <EditTodo task={task} setShowModal={setShowModal} getUserTask={getUserTask} />
              )}
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default Card
