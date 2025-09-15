// import React from "react";
import { Button } from "@heroui/react";
import { Link, NavLink, Outlet } from "react-router-dom";

export default function SettingsLayout() {
  return (
    <div className="md:grid grid-cols-3 min-h-screen">
      <div className="col-span-1 flex flex-col items-center justify-center bg-zinc-900/50 p-5 rounded-2xl my-10 border-2 border-orange-500">
        <Button
          className="w-full  bg-zinc-900/50 text-gray-300 text-[15px] font-semibold"
          size="lg"
          as={Link}
          to={"change-password"}
        >
          Change password
        </Button>
        <Button
          className="w-full my-3 bg-zinc-900/50 text-[15px] text-gray-300 font-semibold "
          size="lg"
          as={Link}
          to={"change-profile-picture"}
        >
          Change Profile-picture
        </Button>
        <Button
          className="w-full bg-zinc-900/50 text-[15px] text-gray-300 font-semibold "
          size="lg"
          as={Link}
          to={"about"}
        >
          Your Information
        </Button>
      </div>
      <div className="col-span-2 flex items-center justify-center p-5 my-10 mx-3 rounded-2xl border-2 border-orange-500 bg-zinc-900/50">
        <Outlet />
      </div>
    </div>
  );
}
