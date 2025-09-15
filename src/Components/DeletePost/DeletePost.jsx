import React, { useContext, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@heroui/react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
export default function DeletePost({ post, isOpen, onOpenChange }) {
  const { userToken } = useContext(AuthContext);
  const [Loading, setLoading] = useState(false);

  const { handleSubmit } = useForm();

  function deletePost() {
    setLoading(true);
    axios
      .delete(`https://linked-posts.routemisr.com/posts/${post._id}`, {
        headers: {
          token: userToken,
        },
      })
      .then((res) => {
        console.log(res);
        onOpenChange(false);
        toast.success("Successfully deleted!");
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
        className="bg-zinc-900 text-gray-300"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(deletePost)}>
                <ModalHeader className="flex flex-col gap-1 text-center">
                  Delete Post
                </ModalHeader>
                <ModalBody>
                  <p className="mb-3">Are you sure you want to delete post?</p>
                </ModalBody>
                <ModalFooter className="border-t-1">
                  <Button color="" variant="bordered" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color=""
                    className="bg-red-700 font-semibold"
                    type="submit"
                    isDisabled={Loading}
                  >
                    {Loading ? <Spinner color="default" /> : "Delete"}
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
