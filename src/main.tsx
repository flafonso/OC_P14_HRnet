import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateEmployee from "./pages/CreateEmployee.tsx";
import EmployeeList from "./pages/EmployeeList.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
