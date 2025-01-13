import React, { useEffect, useState } from "react";
import axios from "axios";

const RoleBView = () => {
  const [documents, setDocuments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user")).token;
        const response = await axios.get(
          "http://localhost:5001/api/documents",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDocuments(response.data);
      } catch (err) {
        setMessage("Failed to fetch documents");
      }
    };
    fetchDocuments();
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      await axios.post(
        `http://localhost:5001/api/documents/approve/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Document approved");
      setDocuments((prev) =>
        prev.map((doc) =>
          doc._id === id ? { ...doc, approvedBy: "You" } : doc
        )
      );
    } catch (err) {
      setMessage("Approval failed");
    }
  };

  return (
    <div>
      <h2>Role B: Approve Documents</h2>
      {message && <p>{message}</p>}
      <ul>
        {documents.map((doc) => (
          <li key={doc._id}>
            {doc.name} - Uploaded by: {doc.uploadedBy.username}{" "}
            {doc.approvedBy ? (
              <span>(Approved by: {doc.approvedBy.username || "You"})</span>
            ) : (
              <button onClick={() => handleApprove(doc._id)}>Approve</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleBView;
