import React, { useState } from "react";
import Navbar from "../../component/Layout/Navbar";
import PopUpModal from "./../../component/Layout/PopUpModal";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  //handle modal
  const openModalHandler = () => {
    setShowModal(true);
  };
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
      {/* <h1>{title}</h1>
      <h1>{description}</h1> */}
      {/* --------- modal ------------ */}
      <PopUpModal
      // key:value
        showModal={showModal}
        setShowModal={setShowModal}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />
    </>
  );
};

export default HomePage;
