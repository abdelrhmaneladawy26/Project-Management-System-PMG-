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
import AddProject from "./Components/AddProject/AddProject";
import ProjectsList from "./Components/ProjectsList/ProjectsList";
import UpdateProject from "./Components/UpdateProject/UpdateProject";
import TasksList from "./Components/TasksList/TasksList";
import AddTask from "./Components/AddTask/AddTask";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { userRole } = useContext(AuthContext);
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
        {
          path: "tasks",
          element: <Tasks />,
          children: [
            { index: true, element: <TasksList /> },
            { path: "addTask", element: <AddTask /> },
          ],
        },
        {
          path: "projects",
          element: <Projects />,
          children: [
            { index: true, element: <ProjectsList /> },
            { path: "addProject", element: <AddProject /> },
            { path: "updateProject", element: <UpdateProject /> },
          ],
        },
        {
          path: "users",
          element: userRole == "Manager" ? <Users /> : <Dashboard />,
        },
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
