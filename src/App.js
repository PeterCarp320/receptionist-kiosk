import React, { useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  const handleAction = async (action) => {
    setMessage("Processing...");

    try {
      const res = await fetch("https://ai-receptionist-backend-2qfh.onrender.com/webhook/vapi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "kiosk.action", action }),
      });

      const data = await res.json();
      setMessage(data.message || "Success!");
    } catch (err) {
      setMessage("Error contacting backend");
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f0f4f8",
    }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "40px" }}>Welcome!</h1>

      <button
        style={{
          width: "80%",
          maxWidth: "400px",
          padding: "30px",
          margin: "15px 0",
          fontSize: "1.5rem",
          border: "none",
          borderRadius: "12px",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onClick={() => handleAction("book_appointment")}
        onTouchStart={(e) => e.target.style.backgroundColor = "#0056b3"}
        onTouchEnd={(e) => e.target.style.backgroundColor = "#007bff"}
      >
        📅 Book Appointment
      </button>

      <button
        style={{
          width: "80%",
          maxWidth: "400px",
          padding: "30px",
          margin: "15px 0",
          fontSize: "1.5rem",
          border: "none",
          borderRadius: "12px",
          backgroundColor: "#28a745",
          color: "white",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onClick={() => handleAction("check_in")}
        onTouchStart={(e) => e.target.style.backgroundColor = "#1e7e34"}
        onTouchEnd={(e) => e.target.style.backgroundColor = "#28a745"}
      >
        ✅ Check In
      </button>

      <p style={{ marginTop: "30px", fontSize: "1.2rem", color: "#333" }}>{message}</p>
    </div>
  );
}

export default App;
