import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header";

export default function MasterLayout() {
  return (
    <div className="master-layout">
      <NavBar />
      <div className="d-flex  gap-4">
        <div className="sidebar-container ">
          <SideBar />
        </div>
        <div className="w-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
