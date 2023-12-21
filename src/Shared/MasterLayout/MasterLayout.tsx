import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header";

export default function MasterLayout() {
  return (
    <div>
      <div className="container-fluid">
        <NavBar />
        <div className="row">
          <div className="col-md-3 bg-danger">
            <SideBar />
          </div>
          <div className="col-md-9">
            <Header />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
