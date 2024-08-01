import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateEmployee from "./pages/CreateEmployee.tsx";
import EmployeeList from "./pages/EmployeeList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <CreateEmployee />,
      },
      {
        path: "employee-list",
        element: <EmployeeList />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
