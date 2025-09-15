import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
  Spinner,
} from "@heroui/react";
import { IoIosClose } from "react-icons/io";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import { userData } from "../../Context/UserData";
import toast from "react-hot-toast";


export default function Update({ post, isOpen, onOpenChange }) {
  const { userToken } = useContext(AuthContext);
  const [Loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      body: "",
      image: null,
    },
  });
  useEffect(() => {
    if (post) {
      reset({
        body: post.body || "",
        image: post.image || null,
      });
    }
  }, [post, reset, isOpen]);
  const body = watch("body");
  const img = watch("image");

  function updatePost(data) {
    setLoading(true)
    const formData = new FormData();
    data.body && formData.append("body", data.body);
    if (data.image !== post.image && data.image)
      formData.append("image", data.image[0]);
    //  if(data.image!==post.image && !data.image)formData.append("image", null);
    axios
      .put(`https://linked-posts.routemisr.com/posts/${post?._id}`, formData, {
        headers: {
          token: userToken,
        },
      })
      .then((res) => {
        console.log(res);
        onOpenChange(false);
        toast.success("Successfully updated!");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-zinc-900/50"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-gray-300">Edit Post</ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(updatePost)}
                  className="  rounded-2xl p-3 relative"
                  id="submit"
                >
                  <Textarea
                    className="my-3"
                    placeholder="What's in your mind?"
                    variant="flat"
                    {...register("body")}
                  />
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
                        <p className="font-semibold p-3 text-zinc-900">
                          Upload profile-picture.
                        </p>
                        <input
                          id="dropzone-file"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          {...register("image")}
                        />
                      </label>
                    </>
                  ) : (
                    <div className="relative">
                      <IoIosClose
                        onClick={() => reset({ body, image: null })}
                        className="text-[20px] text-zinc-900 cursor-pointer right-1 top-0 absolute bg-orange-500 rounded-full"
                      />
                      <img
                        src={
                          typeof img === "string"
                            ? img
                            : URL.createObjectURL(img[0])
                        }
                        className="size-80 rounded-2xl"
                      />
                    </div>
                  )}
                  <ModalFooter className="pt-3 pb-0 px-0 mt-5 border-t-1 border-gray-300 ">
                    <Button
                      color=""
                      variant="bordered"
                      className="text-orange-800"
                      onPress={onClose}
                    >
                      Close
                    </Button>
                    <Button
                      color=""
                      className="text-zinc-900 bg-orange-500 font-semibold"
                      id="submit"
                      type="submit"
                      isDisabled={Loading}
                    >
                      {Loading ? <Spinner color="default" /> : "Update"}
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
