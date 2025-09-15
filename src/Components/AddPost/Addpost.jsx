import { Button, Spinner, Textarea } from "@heroui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";

export default function Addpost() {
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
    if (data.image[0]) formData.append("image", data.image[0]);

    axios
      .post(`https://linked-posts.routemisr.com/posts`, formData, {
    
        headers: { token: userToken },
      })
      .then((response) => {
        if (response.data.message === "success") {
          toast.success("Post added successfully!");
          reset();
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

  return (
    <div>
      {!IsShow ? (
        <div
          onClick={() => setIsShow(true)}
          className="bg-gray-300 p-2 rounded-2xl cursor-pointer text-[14px]"
        >
          What's in your mind?
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(post)}
          className=" bg-zinc-900/40 rounded-2xl p-3 relative"
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
  );
}
