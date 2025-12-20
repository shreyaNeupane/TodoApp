import React, { useEffect, useState } from "react";
import Navbar from "../../component/Layout/Navbar";
import PopUpModal from "./../../component/Layout/PopUpModal";
import TodoServices from "../../Services/TodoServices";
import Card from "../../component/Card/Card";
import Spinner from "../../component/Spinner";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allTask, setAllTask] = useState([]);
  //handle modal
  const openModalHandler = () => {
    setShowModal(true);
  };
  const userData = JSON.parse(localStorage.getItem("todoapp"));
  const id = userData && userData.user.id;
  const getUserTask = async () => {
    try {
      const { data } = await TodoServices.getAllTodo(id);
      setLoading(false);
      // console.log(data);
      setAllTask(data?.todos);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getUserTask();
  }, []);
  return (
    <>
      <Navbar />
      <div className="add-task">
        <h1>Your task</h1>
        <input type="search" placeholder="search your task" />
        <button className="btn btn-primary" onClick={openModalHandler}>
          Create task <i className="fa-solid fa-plus" />
        </button>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        allTask && <Card allTask={allTask} getUserTask={getUserTask} />
      )}
      {/* --------- modal ------------ */}
      <PopUpModal
        // key:value
        showModal={showModal}
        setShowModal={setShowModal}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        getUserTask={getUserTask}
      />
    </>
  );
};

export default HomePage;
