import { useContext, useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
export default function SideBar() {
  const { userRole }: any = useContext(AuthContext);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };
  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  // Modal handler
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Sidebar collapsed={isCollapsed}>
        <Menu>
          <div className="sidebar-arrow rounded-4 " onClick={handleToggle}>
            <li className="fa fa-arrow-right "></li>
          </div>
          <MenuItem
            icon={<i className="fa fa-home"></i>}
            component={<Link to="/dashboard" />}
          >
            {" "}
            Home
          </MenuItem>
          {userRole === "Manager" ? (
            <MenuItem
              icon={<i className="fa-solid fa-users"></i>}
              component={<Link to="/dashboard/users" />}
            >
              Users
            </MenuItem>
          ) : (
            ""
          )}
          <MenuItem
            icon={<i className="fa-solid fa-table-list"></i>}
            component={<Link to="/dashboard/projects" />}
          >
            {" "}
            Projects
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-table-list"></i>}
            component={<Link to="/dashboard/tasks" />}
          >
            {" "}
            Tasks
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-unlock"></i>}
            title="Change Password"
            onClick={handleShow}
          >
            {" "}
            Change Password
          </MenuItem>
          <MenuItem
            icon={
              <i className="fa-solid fa-arrow-right-from-bracket text-danger"></i>
            }
            onClick={logOut}
          >
            {" "}
            LogOut
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
