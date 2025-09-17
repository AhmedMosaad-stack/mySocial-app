import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Input } from "@heroui/react";
import Loader from "../Loader/Loader";
import Addpost from "../../Components/AddPost/Addpost";
import PostCard from "../../Components/Footer/PostCard/PostCard";

export default function Home() {
  const { userToken } = useContext(AuthContext);
  function getAllposts() {
    return axios.get("https://linked-posts.routemisr.com/posts?limit=50", {
      params: {
        sort: "-createdAt",
      },
      headers: {
        token: userToken,
      },
    });
  }
  const { data, error, isError, refetch, isLoading } = useQuery({
    queryKey: ["getPosts"],
    queryFn: getAllposts,
  });

  if (isError) {
    console.log(error);
    ;
  }

  if (isLoading) {
    return (
      <Loader/>
    );
  }
  return (
    <div className="min-h-screen p-5 w-full md:w[80%] lg:w-[60%] mx-auto">
     <Addpost/>
      {data?.data?.posts ? (
        <>
          {data.data.posts.map((post) => {
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
      ) : (
        <h1 className="text-center">THERE IS NO POSTS!</h1>
      )}
    </div>
  );
}
