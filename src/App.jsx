import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Mainlayout from "./Pages/Mainlayout/Mainlayout";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Settings from "./Pages/Settings/Settings";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostDetails from "./Pages/PostDetails/PostDetails";
import { UserDataProvider } from "./Context/UserData";
import { Toaster } from "react-hot-toast";
import Password from "./Pages/SettingsLayout/Password/Password";
import ProfilePic from "./Pages/SettingsLayout/ProfilePic/ProfilePic";
import { IoSettingsSharp } from "react-icons/io5";
import LogoSettings from "./Pages/LOGOsettings/LogoSettings";
import About from "./Pages/SettingsLayout/About/About";
function App() {
  const query = new QueryClient();
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Mainlayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          ),
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "settings",
          element: (
            <ProtectedRoutes>
              <Settings />
            </ProtectedRoutes>
          ),
          children:[
            {
              index:true,
              element:<LogoSettings />
            },
            {
              path:"change-password",
              element:<Password/>
            },
            {
              path:"change-profile-picture",
              element:<ProfilePic/>
            },
            {
              path:"about",
              element:<About/>
            }
          ]
        },
        {
          path: "details/:id",
          element: (
            <ProtectedRoutes>
              <PostDetails />
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <AuthContextProvider>
        <QueryClientProvider client={query}>
          <UserDataProvider>
            <Toaster/>
            <RouterProvider router={routes}></RouterProvider>
          </UserDataProvider>
        </QueryClientProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
