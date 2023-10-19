import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const useProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie);
        setUser(userData);
      } catch (error) {
        console.error("Error parsing user data from the cookie:", error);
      }
    }
  }, []);

  return user;
};

export default useProfile;