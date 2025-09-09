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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
      <h1>Welcome!</h1>
      <button
        style={{ padding: "20px", margin: "10px", fontSize: "18px" }}
        onClick={() => handleAction("book_appointment")}
      >
        Book Appointment
      </button>
      <button
        style={{ padding: "20px", margin: "10px", fontSize: "18px" }}
        onClick={() => handleAction("check_in")}
      >
        Check In
      </button>
      <p style={{ marginTop: "20px", fontSize: "16px" }}>{message}</p>
    </div>
  );
}

export default App;
