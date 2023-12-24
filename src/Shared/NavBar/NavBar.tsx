import { useContext } from "react";
import Logo from "../../assets/images/logo.png";
import { AuthContext } from "../../Context/AuthContext";
export default function NavBar() {
  const { userData } = useContext(AuthContext);
  console.log(userData);
  return (
    <div>
      <nav className="d-flex bg-white">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img src={Logo} alt="" />
          </a>
        </div>
        <div className="navUserData d-flex align-items-center me-5 ">
          <div>
            <img src="" alt="" />
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
