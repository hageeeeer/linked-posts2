import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLogin, setLogin] = useState(null);
  const [userData, setUserData] = useState(null);

  async function getUserData() {
    const { data } = await axios.get(
      `https://route-posts.routemisr.com/users/profile-data`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    setUserData(data?.data?.user);
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogin(localStorage.getItem("token"));
      getUserData();
    }
  }, []);

  return (
    <authContext.Provider value={{ isLogin, setLogin, userData }}>
      {children}
    </authContext.Provider>
  );
}
