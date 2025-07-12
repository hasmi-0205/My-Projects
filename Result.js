import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    total,
    attempted,
    correct,
    wrong,
    percentage,
    time,
  } = location.state || {};

  return (
    <div style={{
      backgroundColor: "#e6f7ff",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        padding: "40px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        width: "400px"
      }}>
        <h2>🎉 Quiz Result</h2>
        <table style={{ margin: "auto", marginTop: "20px", width: "100%" }}>
          <tbody>
            <tr><td><strong>Total Questions</strong></td><td>{total}</td></tr>
            <tr><td><strong>Attempted</strong></td><td>{attempted}</td></tr>
            <tr><td><strong>Correct</strong></td><td>{correct}</td></tr>
            <tr><td><strong>Wrong</strong></td><td>{wrong}</td></tr>
            <tr><td><strong>Percentage</strong></td><td>{percentage}%</td></tr>
            <tr><td><strong>Time Taken</strong></td><td>{time}s</td></tr>
          </tbody>
        </table>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default Result;
