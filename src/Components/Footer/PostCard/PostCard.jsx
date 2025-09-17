import { FaComments, FaFileImage } from "react-icons/fa";
import imgholder from "../../../assets/Portrait_Placeholder.jpg";
import { Button, Input, useDisclosure } from "@heroui/react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { HiDotsVertical } from "react-icons/hi";
import UpdatePost from "../../UpdatePost/UpdatePost";
import DeletePost from "../../DeletePost/DeletePost";
import { userData } from "../../../Context/UserData";
export default function PostCard({ post }) {
  const { userToken } = useContext(AuthContext);
  const { userID } = useContext(userData);
  const location = useLocation();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <div className="max-h-svh">
      <div className="header flex justify-between items-center gap-2 ">
        <div className="flex items-center gap-2">
          <div>
            <img
              src={post.user?.photo}
              alt={post.body}
              className="size-10 rounded-full border-1 border-orange-500"
            />
          </div>
          <div className="font-semibold">
            {post.user?.name}
            <p className="text-[11px] text-gray-400">
              at {post.createdAt.split("T")[0]}
            </p>
          </div>
        </div>
        <div>
          {userID === post.user?._id && (
            <>
              <Dropdown className="bg-zinc-900 text-gray-300">
                <DropdownTrigger>
                  <HiDotsVertical className="cursor-pointer" />
                </DropdownTrigger>
                <DropdownMenu>
                  {/* اول ما تدوس على Edit يفتح المودال */}
                  <DropdownItem
                    key="edit"
                    onClick={() => setEditModal(true)}
                    color=""
                    className="hover:bg-gray-100/10"
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    onClick={() => setDeleteModal(true)}
                    className="text-red-500 hover:bg-red-600/10"
                    color=""
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              {/* المودال برا خالص */}
              <UpdatePost
                isOpen={editModal}
                onOpenChange={setEditModal}
                post={post}
              />
              <DeletePost
                isOpen={deleteModal}
                onOpenChange={setDeleteModal}
                post={post}
              />
            </>
          )}
        </div>
      </div>

      <div className="body">
        {post.body && <div className="paragraph my-3 p-1">{post.body}</div>}
        {post.image && (
          <img
            src={post.image}
            alt={post.body}
            className="postImage my-3 w-full max-h-[400px] object-contain rounded-2xl"
          />
        )}
      </div>
      <div className="numbers">
        {post.comments?.length != 0 && (
          <p className="text-[14px] flex gap-2 items-center text-gray-400">
            <FaComments />
            {post.comments?.length} Comments
          </p>
        )}
      </div>
      <div className="comments  rounded-2xl mt-3">
        {location.pathname !== `/details/${post._id}` && (
          <Button
            as={Link}
            to={`/details/${post._id}`}
            className="text-center w-full text-orange-500 font-semibold"
            variant="bordered"
            color=""
          >
            Details
          </Button>
        )}
      </div>
    </div>
  );
}
