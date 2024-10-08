import axios from "axios";
import React, { useEffect, useState } from "react";
import AllContact from "./components/AllContact";
import AddContact from "./components/AddContact";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [contact, setContact] = useState([]);
  const [showModel, setShowModel] = useState(false);

  const [reload, setReload] = useState(false);
  const [id, setId] = useState("");
  const url = "http://localhost:2000";
  useEffect(() => {
    const fetchData = async () => {
      const api = await axios.get(`${url}/api/getcontact`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setContact(api.data.contactGet);
    };
    fetchData();
  }, [reload]);

  const handleModel = () => {
    setShowModel(!showModel);
  };

  return (
    <div className="container text-center">
      <ToastContainer />
      <AddContact
        handleModel={handleModel}
        showModel={showModel}
        url={url}
        reload={reload}
        setReload={setReload}
        id={id}
        contact={contact}
        setId={setId}
      />
      <AllContact
        value={contact}
        url={url}
        reload={reload}
        setReload={setReload}
        setId={setId}
        handleModel={handleModel}
      />
    </div>
  );
}

export default App;
