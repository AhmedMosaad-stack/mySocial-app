import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineDarkMode } from "react-icons/md";
import { AuthContext } from "../../Context/AuthContext";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoSettingsSharp } from "react-icons/io5";
import { SiSocialblade } from "react-icons/si";
import { userData } from "../../Context/UserData";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { userToken, setUserToken } = useContext(AuthContext);
  const { userEmail, userName, userPhoto } = useContext(userData);
  return (
    <Navbar
      className="bg-zinc-900 text-gray-200 shadow"
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand className="text-gray-200">
        {userToken ? (
          <NavLink to={"/"} className="text-orange-500">
            <SiSocialblade className="text-6xl" />
          </NavLink>
        ) : (
          <NavLink to={"/login"} className="text-gray-200">
            <SiSocialblade className="text-6xl" />
          </NavLink>
        )}
      </NavbarBrand>
      {userToken && (
        <NavbarContent className="hidden sm:flex gap-7" justify="center">
          <NavbarItem>
            <NavLink color="foreground" to={"/"}>
              <FaHome className="text-2xl" />
            </NavLink>
          </NavbarItem>
          <NavbarItem isActive>
            <NavLink color="foreground" to={"/profile"}>
              <CgProfile className="text-2xl" />
            </NavLink>
          </NavbarItem>

          <NavbarItem>
            <NavLink color="foreground" to={"/settings"}>
              <IoSettingsSharp className="text-2xl" />
            </NavLink>
          </NavbarItem>
        </NavbarContent>
      )}
      <NavbarContent justify="end">
        {!userToken ? (
          <>
            <NavbarItem className=" text-gray-400 flex">
              <NavLink to={"/login"}>Login</NavLink>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={NavLink}
                className="text-gray-400"
                color="default"
                to={"/register"}
                variant="bordered"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Button
                as={NavLink}
                className="text-orange-600"
                color=""
                to={"/login"}
                variant="bordered"
                onClick={() => {
                  setUserToken(null);
                  localStorage.removeItem("userToken");
                }}
              >
                Log Out
              </Button>
            </NavbarItem>
          </>
        )}

        {userToken && (
          <Dropdown
            placement="bottom-end"
            className="bg-zinc-900 text-gray-300"
          >
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform text-orange-500"
                color=""
                name={userName}
                size="md"
                src={userPhoto}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat" color="">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{userEmail}</p>
              </DropdownItem>
              <DropdownItem key="settings" as={NavLink} to={"/settings"} className="text-gray-300 hover:bg-gray-100/10" color="">
                My Settings
              </DropdownItem>

              <DropdownItem
                key="logout"
                as={NavLink}
                to={"/login"}
                className="text-red-500 hover:bg-red-600/10"
                color=""
                onClick={() => {
                  setUserToken(null);
                  localStorage.removeItem("userToken");
                }}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>

      <NavbarMenu className="text-center">
        <NavbarMenuItem>
          <NavLink color="foreground" to={"/"}>
            Home
          </NavLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavLink color="foreground" to={"/profile"}>
            Profile
          </NavLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <NavLink color="foreground" to={"/settings"}>
            Settings
          </NavLink>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
