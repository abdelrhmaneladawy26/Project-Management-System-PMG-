import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({});

export default function AuthContextProvider(props: any) {
  const baseUrl = "http://upskilling-egypt.com:3003/api/v1";
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState("");
  const saveUserData = () => {
    const encodedToken: any = localStorage.getItem("adminToken");
    const decodedToken: any = jwtDecode(encodedToken);
    setUserRole(decodedToken.userGroup);
    setUserData(decodedToken);
  };
  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      saveUserData();
    }
  }, []);
  return (
    <AuthContext.Provider value={{ baseUrl, userData, saveUserData, userRole }}>
      {props.children}
    </AuthContext.Provider>
  );
}
