import React from "react";
import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as constant from "../utils/constants";
import { toast } from "react-toastify";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState();

  const loginUser = async (username, email, password) => {
    if (!email || !password || !username) {
      setError("Please, fill all data.");
      return;
    }

    await axios
      .post(constant.API_URL_LOGIN, {
        username,
        email,
        password,
      })
      .then((response) => {
        console.log(response, "Response from server");
        toast.success("User login successfully. You will be redirected now");
        setUserData(response.data);
        setUserName(response.data.username);

        if (response.data.username === "master") {
          return setIsAdmin(true);
        }
        // save user name in localstorage
        localStorage.setItem("username", response.data.username);
        navigate("/");
      })
      .catch((error) => {
        console.log("There was an error", error);
        toast.error("Sorry there was an error", error);
      });
  };

  const registerUser = async (email, username, password, password2) => {
    if (!email || !password || !username) {
      setError("Please, fill all data.");
      return;
    }

    await axios
      .post(constant.API_URL_REGISTER, {
        email,
        username,
        password,
        password2,
      })
      .then((response) => {
        console.log(response, "Response for server");

        toast.success("User created successfully. You can now login");
        navigate("/login");
      })
      .catch((error) => {
        console.log("There was an error", error);
        toast.error("There was an error. Please try again");
      });
  };

  const logoutUser = async () => {
    await axios
      .post(constant.API_URL_LOGOUT)
      .then((response) => {
        console.log(response, "Response from server");
        toast.success("Logout successfully");
        // remove user data
        setUserData(null);
        localStorage.removeItem("username");
        navigate("/login");
      })
      .catch((error) => {
        console.log("There was an error", error);
        toast.error("Sorry couldn't log you out", error);
      });
  };

  const contextData = {
    userName,
    error,
    isAdmin,
    setUserName,
    userData,
    registerUser,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
