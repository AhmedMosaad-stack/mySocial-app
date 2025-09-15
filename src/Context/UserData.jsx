import { createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const userData = createContext();

export function UserDataProvider({ children }) {
  const { userToken } = useContext(AuthContext);

  function getUserData() {
    return axios.get("https://linked-posts.routemisr.com/users/profile-data", {
      headers: { token: userToken },
    });
  }

  const { data, isLoading } = useQuery({
    queryKey: ["getUserData"],
    queryFn: getUserData,
  });

  return (
    <userData.Provider
      value={{
        isLoading,
        userID: data?.data?.user?._id,
        userDOB: data?.data?.user?.dateOfBirth,
        userEmail: data?.data?.user?.email,
        userName: data?.data?.user?.name,
        userPhoto: data?.data?.user?.photo,
        userGender: data?.data?.user?.gender,
        isLoading,
      }}
    >
      {children}
    </userData.Provider>
  );
}
