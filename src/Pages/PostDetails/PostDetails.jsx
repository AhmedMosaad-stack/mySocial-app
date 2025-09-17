import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthContext";
import { FaCheck, FaComments, FaFileImage } from "react-icons/fa";
import { Button, Input, Spinner } from "@heroui/react";
import imgholder from "../../assets/Portrait_Placeholder.jpg";
import { useForm } from "react-hook-form";
import z from "zod";
import toast from "react-hot-toast";
import DeleteComment from "../../Components/DeleteComment/DeleteComment";
import { userData } from "../../Context/UserData";
import { RiDeleteBin6Line } from "react-icons/ri";
import PostCard from "../../Components/Footer/PostCard/PostCard";

export default function PostDetails() {
  const { userToken } = useContext(AuthContext);
  const { id } = useParams();
  const [Loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
const queryClient=useQueryClient()
  const { userID } = useContext(userData);
  const [showMore, setShowMore] = useState(5);
  function getPostDetails() {
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: userToken,
      },
    });
  }
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["getPostDetails"],
    queryFn: getPostDetails,
  });
  // console.log(data);
  const { register, handleSubmit, reset, watch } = useForm({
    mode: "onBlur",
    defaultValues: {
      content: "",
      post: "",
    },
  });
  const commentBody = watch("content");

  // لما الداتا توصل من ال API
  useEffect(() => {
    if (data?.data?.post?._id) {
      reset({
        content: "",
        post: data.data.post._id,
      });
    }
  }, [data, reset]);


  function addComment(value) {
    setLoading(true);

    axios
      .post(`https://linked-posts.routemisr.com/comments`, value, {
        headers: {
          token: userToken,
        },
      })
      .then((res) => {
        toast.success("Comment is added successfully!");
        queryClient.invalidateQueries(["getPostDetails"])
        reset();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  if (isError) {
    return <h1>{error}</h1>;
  }
  if (isLoading) {
    return (
      <h1 className="min-h-screen bg-gradient-to-r from-gray-500  to-zinc-900 flex items-center justify-center">
        <span className="loader"></span>
      </h1>
    );
  }

  return (
    <div className="bg-gradient-to-r from-gray-500  to-zinc-900">
      <div className="min-h-screen p-5 w-full md:w-[80%] lg:w-[60%] mx-auto">
        <div
          key={data?.data?.post._id}
          className="p-7 border-1 border-zinc-100/10 rounded-2xl shadow-2xl   bg-zinc-900/65 my-3 text-gray-300"
        >
          <PostCard post={data?.data?.post} />
          <div className="comments  rounded-2xl mt-3">
            {data?.data?.post.comments.slice(0, showMore).map((comment) => {
              return (
                <div
                  className="p-2 my-3 shadow bg-zinc-900/30 rounded-2xl text-[13px]"
                  key={comment._id}
                >
                  <div className=" p-1 flex gap-2 items-center justify-between">
                    <div className="p-1 flex gap-2 items-center">
                      <img
                        onError={(e) => {
                          e.target.src = imgholder;
                        }}
                        src={comment.commentCreator.photo}
                        className="size-7 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">
                          {comment.commentCreator?.name}
                        </p>
                        <p className=" text-[12px] text-gray-400">
                          {comment.createdAt?.split("T")[0]}
                        </p>
                      </div>
                    </div>
                    {comment.commentCreator._id === userID && (
                      <>
                        <DeleteComment
                          comment={comment}
                          isOpen={deleteModal}
                          onOpenChange={setDeleteModal}
                        />
                        <RiDeleteBin6Line
                          key="delete"
                          className="size-5 text-red-500/80 cursor-pointer"
                          onClick={() => {
                            setDeleteModal(true);
                          }}
                        />
                      </>
                    )}
                  </div>
                  <div className="p-1 text-[15px]">{comment.content}</div>
                </div>
              );
            })}
            <form
              onSubmit={handleSubmit(addComment)}
              className="add-comment flex items-center justify-between border-t-1 border-gray-500 pt-3"
            >
              <Input
                className="text-zinc-900"
                color=""
                variant="flat"
                placeholder="Add comment here"
                {...register("content")}
              />
              <Input
                type="hidden"
                id="postID"
                placeholder=""
                {...register("post")}
              />
              <Button
                className="mx-1 bg-orange-500 font-semibold text-[13px]"
                type="submit"
                isDisabled={!commentBody || Loading}
              >
                {Loading ? <Spinner color="default" /> : <FaCheck />}
              </Button>
            </form>
            {data?.data?.post.comments.length >= 5 && (
              <>
                <p
                  onClick={() => {
                    setShowMore(showMore + 5);
                  }}
                  className="w-full text-orange-500 my-3 cursor-pointer text-center underline"
                >
                  Show more
                </p>
                {showMore > 0 && (
                  <p
                    onClick={() => {
                      if (showMore === 0) {
                        return;
                      }
                      setShowMore(showMore - 5);
                    }}
                    className="w-full text-orange-500 cursor-pointer text-center underline"
                  >
                    Show less
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
