import { Outlet } from "react-router-dom";
import "./AuthLayout.module.css";
export default function AuthLayout() {
  return (
    <>
      <div className="auth-container  container-fluid">
        <div className="row bg-overlay vh-100 justify-content-center align-items-center ">
          <div className=" auth-wrapper col-md-6  rounded-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
