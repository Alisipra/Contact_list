import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddContact({
  handleModel,
  url,
  reload,
  setReload,
  showModel,
  contact,
  id,
  setId,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleModel();
    if (id) {
      const api = await axios.put(
        `${url}/api/updatecontact/${id}`,
        { name, email, phone },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
    } else {
      const api = await axios.post(
        `${url}/api/addcontact`,
        { name, email, phone },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
    }
    setId("");
    setName("");
    setEmail("");
    setPhone("");

    setReload(!reload);
  };
  useEffect(() => {
    if (id) {
      for (let i = 0; i < contact.length; i++) {
        if (id === contact[i]._id) {
          setName(contact[i].name);
          setEmail(contact[i].email);
          setPhone(contact[i].phone);
          break;
        }
      }
    }
  }, [id]);

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={handleModel}>
        Add New Contact
      </button>
      {showModel && (
        <form onSubmit={handleSubmit}>
          <div
            className="modal"
            tabIndex="-1"
            role="dialog"
            style={{
              display: "block",
            }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="fw-bold modal-title fs-5">
                    {id ? "Edit Contact" : "Add Contact"}
                  </h1>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="p-2 m-2 rounded w-75"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="p-2 m-2 rounded w-75"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Enter Phone"
                    className="p-2 m-2 rounded w-75"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleModel}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    {id ? "Update Now" : "Add Contact"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default AddContact;
