import React, { useEffect, useState } from "react";
import apiClient from "../utils/axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleForgotPassword = () => {
    apiClient
      .post("/user/get-one-time-link", { username: username })
      .then((response) => {
      console.log("One time link sent:", response.data);
      })
      .catch((error) => {
      console.error("Failed to send one time link:", error);
      });
  };

  useEffect(() => {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
  }, [username, password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    apiClient
      .post("/user/login", {
        username,
        password,
      })
      .then((response) => {
        console.log("User logged in:", response.data);
        if (response.data.success) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
          window.location.href = "/home";
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
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
        <h2>Login</h2>
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
          Login
        </button>
        <a href="/register" style={{ textAlign: "center", marginTop: "10px" }}>
          No account?
        </a>
        <div onClick={handleForgotPassword}>Forgot Password ?</div>
      </form>
    </div>
  );
};

export default LoginPage;
