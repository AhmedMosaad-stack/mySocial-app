import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function ProtectedRoutes({ children }) {
  const { userToken } = useContext(AuthContext);
  if (userToken) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
