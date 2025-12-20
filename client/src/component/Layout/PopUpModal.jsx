import React from "react";
import TodoServices from "./../../Services/TodoServices";
import toast from "react-hot-toast";

const PopUpModal = ({
  title,
  setTitle,
  description,
  setDescription,
  showModal,
  setShowModal,
  getUserTask,
}) => {
  //handleclose
  const handleClose = () => {
    setShowModal(false);
  };
  //handle submit
  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("todoapp"));
      const id = userData && userData.user.id;
      const data = { title, description, id };

      if (!title || !description) {
        return toast.error("please provide title or description");
      }
      //todoservices has function that send data to backend
      const todo = await TodoServices.createTodo(data);
      console.log(todo);
      setShowModal(false);
      toast.success("Task created sucessfully");
      getUserTask()
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <>
      {/* condition && return value if condition is true */}
      {showModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          // a => transparency of background 0 to 1
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Task</h5>
                <button
                  className="btn-close"
                  aria-label="close"
                  onClick={handleClose}
                >
                  <span aria-hidden="true"> </span>
                </button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    id="floatingTextarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <label htmlFor="floatingTextarea">Description</label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary">
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpModal;
