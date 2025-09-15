import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Pages/Loader/Loader";

export const userData = createContext();

export function UserDataProvider({ children }) {
  const { userToken } = useContext(AuthContext);
  const [userID, setuserID] = useState(null);
  const [userDOB, setuserDOB] = useState(null);
  const [userEmail, setuserEmail] = useState(null);
  const [userName, setuserName] = useState(null);
  const [userPhoto, setuserPhoto] = useState(null);
  const [userGender, setuserGender] = useState(null);

  function getUserData() {
    return axios.get("https://linked-posts.routemisr.com/users/profile-data", {
      headers: { token: userToken },
    });
  }

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["getUserData"],
    queryFn: getUserData,
  });

  useEffect(() => {
    if (data?.data?.user) {
      setuserID(data.data.user._id);
      setuserEmail(data.data.user.email);
      setuserName(data.data.user.name);
      setuserDOB(data.data.user.dateOfBirth);
      setuserPhoto(data.data.user.photo);
      setuserGender(data.data.user.gender)
    }
  }, [data]);


  if (isLoading) {
    return (
      <Loader/>
    );
  }

  return (
    <userData.Provider
      value={{ userID, userDOB, userEmail, userName, userPhoto, setuserPhoto ,userGender }}
    >
      {children}
    </userData.Provider>
  );
}
