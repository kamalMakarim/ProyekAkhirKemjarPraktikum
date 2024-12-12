import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../utils/axios";

const EditUserPage = () => {
  const {token} = useParams();
  const [user, setUser] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    capitalLetter: false,
    numberAndSpecialChar: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });

    // Validate password
    if (name === "password") {
      setPasswordValidations({
        length: value.length >= 10,
        capitalLetter: /[A-Z]/.test(value), // Check for at least one capital letter
        numberAndSpecialChar: /[0-9]/.test(value) && /[!@#$%^&*(),.?":{}|<>]/.test(value), // At least one number AND one special character
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match.");
      setSuccess(""); // Clear any previous success messages
      return;
    }

    // Clear error if passwords match
    setError("");

    // Make API request to update password
    apiClient
      .put(`/user?token=${token}`, { password: user.password })
      .then((response) => {
        console.log("response:", response);
        setSuccess("Password updated successfully!");
      })
      .catch((error) => {
        console.log("error:", error);
        setError("Failed to update password. Please try again.");
        setSuccess(""); // Clear any previous success messages
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Edit User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            <div className="mt-2">
              <ul>
                <li className={`flex items-center ${passwordValidations.length ? "text-green-500" : "text-red-500"}`}>
                  {passwordValidations.length ? "✔" : "✘"} At least 10 characters
                </li>
                <li className={`flex items-center ${passwordValidations.capitalLetter ? "text-green-500" : "text-red-500"}`}>
                  {passwordValidations.capitalLetter ? "✔" : "✘"} At least one capital letter
                </li>
                <li className={`flex items-center ${passwordValidations.numberAndSpecialChar ? "text-green-500" : "text-red-500"}`}>
                  {passwordValidations.numberAndSpecialChar ? "✔" : "✘"} At least one number and one special character
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          {/* Display error message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Display success message */}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

          <button
            type="submit"
            className={`w-full py-2 rounded hover:bg-blue-600 ${!passwordValidations.length || !passwordValidations.capitalLetter || !passwordValidations.numberAndSpecialChar || user.password !== user.confirmPassword ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"}`}
            disabled={
              !passwordValidations.length ||
              !passwordValidations.capitalLetter ||
              !passwordValidations.numberAndSpecialChar ||
              user.password !== user.confirmPassword
            }
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserPage;