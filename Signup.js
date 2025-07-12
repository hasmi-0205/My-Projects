import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (email && password) {
      navigate("/quiz");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div style={{
      backgroundColor: "#f8f0ff",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <form onSubmit={handleSignup} style={{
        padding: "30px",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center" }}>Signup</h2>
        <table style={{ width: "400px", margin: "20px auto" }}>
          <tbody>
            <tr>
              <td style={{ padding: "10px" }}><label>Email:</label></td>
              <td style={{ padding: "10px" }}>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ width: "100%", padding: "8px" }}
                />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}><label>Password:</label></td>
              <td style={{ padding: "10px" }}>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ width: "100%", padding: "8px" }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: "center", paddingTop: "15px" }}>
                <button type="submit" style={{ padding: "10px 20px" }}>Signup</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p style={{ textAlign: "center" }}>
          Already have an account? <a href="/">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
