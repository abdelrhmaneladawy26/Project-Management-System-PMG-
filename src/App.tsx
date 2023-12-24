import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import ProtectedRoute from "./Shared/ProtectedRoute/ProtectedRoute";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/request-reset", element: <RequestReset /> },
        { path: "/reset-password", element: <ResetPassword /> },
        { path: "/verify-user", element: <VerifyUser /> },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "tasks", element: <Tasks /> },
        { path: "projects", element: <Projects /> },
        { path: "users", element: <Users /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;
