import React, { useState } from "react";
import apiClient from "../utils/axios";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    apiClient
      .post("/user/register", {
        username,
        password,
      })
      .then((response) => {
        console.log("User registered:", response.data);
        if (response.data.success) {
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });

    console.log("username:", username);
    console.log("Password:", password);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "300px" }}
      >
        <h2>Register</h2>
        <label>
          username:
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ marginBottom: "10px", padding: "8px" }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginBottom: "10px", padding: "8px" }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Register
        </button>
        <a href="/login" style={{ textAlign: "center", marginTop: "10px" }}>
          Already have an account?
        </a>
      </form>
    </div>
  );
};

export default RegisterPage;
