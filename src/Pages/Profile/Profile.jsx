import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Accordion,
  AccordionItem,
  Button,
  Input,
  Spinner,
  Textarea,
} from "@heroui/react";
import { FaBirthdayCake } from "react-icons/fa";
import ProfilePosts from "../../Components/ProfilePosts/ProfilePosts";
import { userData } from "../../Context/UserData";
import { useForm } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
export const MailIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
        fill="currentColor"
      />
    </svg>
  );
};
export default function Profile() {
  const { userID, userName, userPhoto,isLoading } = useContext(userData);
  const [IsShow, setIsShow] = useState(false);
  const { userToken } = useContext(AuthContext);
  const [Loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      body: "",
      image: null,
    },
  });

  const body = watch("body");
  const img = watch("image");
  function post(data) {
    setLoading(true);
    const formData = new FormData();
    if (data.body) formData.append("body", data.body);
    if (data.image && data.image[0]) formData.append("image", data.image[0]);

    axios
      .post(`https://linked-posts.routemisr.com/posts`, formData, {
        headers: { token: userToken },
      })
      .then((response) => {
        if (response.data.message === "success") {
          toast.success("Post added successfully!");
          clearData();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message)
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function clearData() {
    reset();
    setIsShow(false);
  }
  if (isLoading) {
    return <Loader/>
    
  }
  return (
    <div className="min-h-screen ">
      <div className="flex flex-col justify-center items-center py-[2%] bg-zinc-900/50 border-b-2 border-orange-500">
        <img
          src={userPhoto}
          alt={userName}
          className="size-55 shadow bg-zinc-900/50 rounded-full border-2 border-orange-500"
        />
        <h1 className="font-black text-gray-200 mt-2">{userName}</h1>
      </div>
      <div className="w-[90%] md:w[80%] lg:w-[50%] mx-auto">
        {!IsShow ? (
          <div
            onClick={() => setIsShow(true)}
            className="bg-gray-300 p-3  mt-5 rounded-2xl cursor-pointer text-[14px]"
          >
            What's in your mind?
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(post)}
            className=" bg-zinc-900/40 mt-5 rounded-2xl p-3 relative"
          >
            <IoIosClose
              onClick={clearData}
              className="text-[25px] text-gray-300 cursor-pointer right-1 top-0 absolute"
            />

            <Textarea
              className="my-3"
              placeholder="What's in your mind?"
              variant="flat"
              {...register("body")}
            />

            {img && img[0] && (
              <div className="p-3 bg-zinc-900/30 flex justify-center rounded-2xl my-3 relative">
                <IoIosClose
                  onClick={() => reset({ body, image: null })}
                  className="text-[25px] text-gray-300 cursor-pointer right-1 top-0 absolute"
                />
                <img
                  src={URL.createObjectURL(img[0])}
                  className="size-[15rem] rounded-2xl"
                  alt="preview"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center font-sans">
                <label
                  htmlFor="dropzone-file"
                  className="mx-auto cursor-pointer flex flex-col items-center rounded-2xl bg-orange-500 p-1 text-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-[30px] text-zinc-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <input
                    id="dropzone-file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("image")}
                  />
                </label>
              </div>

              <div className="buttons flex items-center">
                <Button
                  variant="solid"
                  className="mx-2 text-zinc-900 bg-orange-500 font-semibold"
                  type="submit"
                  isDisabled={(!body.trim() && !img) || Loading}
                >
                  {Loading ? <Spinner color="default" /> : "Post"}
                </Button>
                <Button
                  onClick={clearData}
                  variant="bordered"
                  className="text-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
      <ProfilePosts id={userID} />
    </div>
  );
}
