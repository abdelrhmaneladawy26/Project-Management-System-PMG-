import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function SideBar() {
  const { userRole } = useContext(AuthContext);
  return <div>SideBar {userRole}</div>;
}
