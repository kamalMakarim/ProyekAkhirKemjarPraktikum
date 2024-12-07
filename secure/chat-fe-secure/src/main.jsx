import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import EditUserPage from "./pages/EditUserPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/Login",
        element: <LoginPage />,
      },
      {
        path: "/EditUser/:token",
        element: <EditUserPage />,
      },
      {
        path: "/Register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
]);


const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
