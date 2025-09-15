import { Input } from "@heroui/react";
import React, { useContext } from "react";
import { MailIcon } from "../../Profile/Profile";
import { FaBirthdayCake } from "react-icons/fa";
import { userData } from "../../../Context/UserData";
import { IoIosMale, IoMdFemale } from "react-icons/io";

export default function About() {
  const { userEmail, userDOB, userGender } = useContext(userData);
  console.log(userEmail);

  return (
    <div className="size-full flex flex-col justify-center items-center">
      <Input
        isReadOnly
        className="max-w-2/3 text-gray-300"
        value={userEmail}
        label="Email"
        type="email"
        variant="bordered"
        endContent={
          <MailIcon className="text-2xl pointer-events-none shrink-0" />
        }
      />

      <Input
        isReadOnly
        className="max-w-2/3 my-5 text-gray-300"
        value={userDOB}
        label="Date of Birth"
        type="text"
        variant="bordered"
        endContent={
          <FaBirthdayCake className="text-2xl pointer-events-none shrink-0" />
        }
      />
      <Input
        isReadOnly
        className="max-w-2/3 text-gray-300"
        value={userGender}
        label="Gender"
        type="text"
        variant="bordered"
        endContent={userGender === "male" ? <IoIosMale  className="text-2xl pointer-events-none shrink-0" /> : <IoMdFemale className="text-2xl pointer-events-none shrink-0" />}
      />
    </div>
  );
}
