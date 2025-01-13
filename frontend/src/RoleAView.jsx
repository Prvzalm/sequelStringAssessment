import React, { useState } from "react";
import axios from "axios";

const RoleAView = () => {
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const response = await axios.post(
        "http://localhost:5001/api/documents/upload",
        { name: fileName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(`Uploaded: ${response.data.name}`);
    } catch (err) {
      setMessage("Upload failed");
    }
  };

  return (
    <div>
      <h2>Role A: Upload Document</h2>
      <input
        type="text"
        placeholder="Document Name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RoleAView;
