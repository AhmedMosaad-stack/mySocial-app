import React, { useContext, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";
export default function DeleteComment({ isOpen, onOpenChange,comment }) {
  const [Loading, setLoading] = useState(false);
  const { userToken } = useContext(AuthContext);

  const { handleSubmit } = useForm();
  function delComment(data) {
    setLoading(true);
    axios.delete(
      `https://linked-posts.routemisr.com/comments/${comment._id}`,
      {
        headers: {
          token: userToken,
        },
      }
    ).then((res) => {
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
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-zinc-900 text-gray-300"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(delComment)}>
              <ModalHeader className="flex flex-col gap-1">
                Delete comment
              </ModalHeader>
              <ModalBody>
                <p className="mb-3">Are your sure you want to delete comment? </p>
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
                  {Loading ? <Spinner color="default" /> :<RiDeleteBin6Line className="size-5 text-zinc-900 cursor-pointer"/>}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
