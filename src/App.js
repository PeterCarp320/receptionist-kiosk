import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome!</h1>
      <button style={styles.bookBtn} onClick={() => navigate("/book")}>📅 Book Appointment</button>
      <button style={styles.checkBtn} onClick={() => navigate("/check-in")}>✅ Check In</button>
    </div>
  );
}

function BookingPage() {
  const [form, setForm] = useState({ name: "", email: "", date: "", time: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Booking...");
    try {
      const res = await fetch("https://ai-receptionist-backend-2qfh.onrender.com/webhook/vapi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "kiosk.book", form }),
      });
      const data = await res.json();
      setMessage(data.message || "Appointment booked!");
      setTimeout(() => navigate("/"), 2000); // go back after 2s
    } catch {
      setMessage("Error booking appointment");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Book Appointment</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input style={styles.input} placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <input style={styles.input} type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        <input style={styles.input} type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required />
        <input style={styles.input} type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} required />
        <button style={styles.bookBtn} type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

function CheckInPage() {
  const [form, setForm] = useState({ email: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Checking in...");
    try {
      const res = await fetch("https://ai-receptionist-backend-2qfh.onrender.com/webhook/vapi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "kiosk.checkin", form }),
      });
      const data = await res.json();
      setMessage(data.message || "Checked in!");
      setTimeout(() => navigate("/"), 2000);
    } catch {
      setMessage("Error checking in");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Check In</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input style={styles.input} type="email" placeholder="Email" value={form.email} onChange={e => setForm({ email: e.target.value })} required />
        <button style={styles.checkBtn} type="submit">Check In</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/check-in" element={<CheckInPage />} />
      </Routes>
    </Router>
  );
}

const styles = {
  container: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#f0f4f8" },
  title: { fontSize: "3rem", marginBottom: "40px" },
  form: { display: "flex", flexDirection: "column", gap: "15px", width: "80%", maxWidth: "400px" },
  input: { padding: "15px", fontSize: "1.2rem", borderRadius: "8px", border: "1px solid #ccc" },
  bookBtn: { padding: "20px", fontSize: "1.5rem", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "12px" },
  checkBtn: { padding: "20px", fontSize: "1.5rem", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "12px" }
};
