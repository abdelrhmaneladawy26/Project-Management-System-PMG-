import { useContext } from "react";
import Logo from "../../assets/images/logo.png";
import avatar from "../../assets/images/avatar.png";
import { AuthContext } from "../../Context/AuthContext";
export default function NavBar() {
  const { userData } = useContext(AuthContext);
  return (
    <div>
      <nav className="d-flex bg-white py-3">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img src={Logo} alt="" />
          </a>
        </div>
        <div className="navUserData d-flex align-items-center me-5 ">
          <div className="mx-2">
            <img width="50px" src={avatar} alt="userImage" />
          </div>
          <div>
            <h6>{userData?.userName}</h6>
            <span className="">{userData?.userEmail}</span>
          </div>
        </div>
      </nav>
    </div>
  );
}
