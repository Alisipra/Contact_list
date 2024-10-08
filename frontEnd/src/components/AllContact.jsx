import axios from "axios";
import React from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AllContact({ value, url, reload, setReload, setId, handleModel }) {
  const deleteContact = async (id) => {
    const api = await axios.delete(`${url}/api/deletecontact/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    setReload(!reload);
  };
  return (
    <>
      {value.map((data, index) => {
        return (
          <>
            <div
              className="container bg-black text-white mt-2 w-50 p-3 rounded-5"
              style={{
                border: "3px solid yellow",
                boxShadow: "2px 3px 0px red",
                color: "white",
              }}
              key={index}
            >
              <h2>{data.name}</h2>
              <h4>{data.email}</h4>
              <h6>{data.phone}</h6>
              <div className="d-flex justify-content-center ">
                <button
                  className="btn btn-primary m-1"
                  onClick={() => {
                    setId(data._id);
                    handleModel();
                  }}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger m-1"
                  onClick={() => deleteContact(data._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default AllContact;
