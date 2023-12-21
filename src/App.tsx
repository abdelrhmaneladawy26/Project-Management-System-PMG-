import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import Login from "./Components/Login/Login";
import Projects from "./Components/Projects/Projects";
import Register from "./Components/Register/Register";
import RequestReset from "./Components/RequestReset/RequestReset";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Tasks from "./Components/Tasks/Tasks";
import Users from "./Components/Users/Users";
import VerifyUser from "./Components/VerifyUser/VerifyUser";
import AuthLayout from "./Shared/AuthLayout/AuthLayout";
import MasterLayout from "./Shared/MasterLayout/MasterLayout";
import NotFound from "./Shared/NotFound/NotFound";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "request-reset", element: <RequestReset /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "verify-user", element: <VerifyUser /> },
    ],
  },
  {
    path: "/dashboard",
    element: <MasterLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "tasks", element: <Tasks /> },
      { path: "projects", element: <Projects /> },
      { path: "users", element: <Users /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
