import { Button, Spinner } from "@heroui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import { AuthContext } from "../../../Context/AuthContext";
import { userData } from "../../../Context/UserData";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function ProfilePic() {
  const { userToken } = useContext(AuthContext);
  const { setuserPhoto } = useContext(userData);
  const [Loading, setLoading] = useState(false);
const queryClient=useQueryClient()
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      photo: null,
    },
  });
  const img = watch("photo");

  function addProfilePic(data) {
    setLoading(true);
    const formData = new FormData();
    data.photo[0] && formData.append("photo", data.photo[0]);
    axios
      .put(`https://linked-posts.routemisr.com/users/upload-photo`, formData, {
        headers: {
          token: userToken,
        },
      })
      .then(() => {
        toast.success("Profile picture successfully changed!")
        queryClient.invalidateQueries(["getUserData"])
        reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message)
      }).finally(()=>{
        setLoading(false)
      });
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(addProfilePic)}
        className="flex flex-col items-center"
      >
        {!img ? (
          <>
            <label
              htmlFor="dropzone-file"
              className="mx-auto cursor-pointer flex flex-col items-center rounded-2xl bg-orange-500 p-1 text-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-20 text-zinc-900"
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
              <p className="font-semibold p-3">Upload profile-picture.</p>
              <input
                id="dropzone-file"
                type="file"
                accept="image/*"
                className="hidden"
                {...register("photo")}
              />
            </label>
          </>
        ) : (
          <div className="relative">
            <IoIosClose
              onClick={() => reset({ img: null })}
              className="text-[25px] text-zinc-900 cursor-pointer right-1 top-0 absolute bg-orange-500 rounded-full"
            />
            <img
              src={URL.createObjectURL(img[0])}
              className="size-80 rounded-2xl"
            />
          </div>
        )}
        {img && (
          <Button
            type="submit"
            className="mt-3 bg-orange-500 text-zinc-900 font-semibold w-[10rem]"
           
            isDisabled={Loading}
          >
            {Loading ? <Spinner color="default" /> : "Update"}
          </Button>
        )}
      </form>
    </>
  );
}
