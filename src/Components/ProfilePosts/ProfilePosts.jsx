import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import PostCard from "../PostCard/PostCard";
import Loader from "../../Pages/Loader/Loader";
export default function ProfilePosts({ id }) {
  const { userToken } = useContext(AuthContext);
  function getUserPosts() {
    return axios.get(
      `https://linked-posts.routemisr.com/users/${id}/posts`,
      {
      
        headers: {
          token: userToken,
        },
      }
    );
  }
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getUserPosts"],
    queryFn: getUserPosts,
  });
  if (isLoading) {
    return (
      <Loader/>
    );
  }
  if (isError) {
    console.log(error);
  }

  return (
    <div className="p-5 w-full md:w[80%] lg:w-[60%] mx-auto">
      {data?.data?.posts && (
        <>
          {data?.data?.posts.map((post) => {
            return (
              <div
                key={post._id}
                className="p-7 border-1 border-zinc-100/10 rounded-2xl shadow-2xl  mx-auto  bg-zinc-900/65 my-3 text-gray-300"
              >
                <PostCard post={post} />
              </div>
            );
          })}
        </>
      )}
      
    </div>
  );
}
