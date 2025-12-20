import React from 'react'

const Card = ({allTask}) => {
  return (
    <>
      {allTask?.map((task, i) => (
        <div
          className="card border-primary mb-3"
          style={{ maxWidth: "18rem" }}
          key={i}
        >
          <div className="card-header">
            <div className="chead">
              <h6>{task?.title.substring(0, 10)}</h6>
              <h6 className={task?.isCompleted === true? "task-cmp" : "task-inc"}>
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
            <button className="btn btn-warning" title="EDIT TASK">
              <i className='fa-solid fa-pen-to-square'></i>
            </button>
           
              <button className="btn btn-danger" title="DELETE TASK">
                <i className="fa-solid fa-trash"></i>
              </button>
            
          </div>
        </div>
      ))}
    </>
  );
}

export default Card
