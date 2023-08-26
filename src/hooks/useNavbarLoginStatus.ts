import { useEffect, useState } from "react";
import useCustomToast from "./useCustomToast";
import { CookieManager } from "../helpers/CookieManager";
import AuthService from "../services/AuthService";

const useNavbarLoginStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(checkLoginStatus);
  const customToast = useCustomToast();

  useEffect(() => {
    if (checkLoginStatus()) setIsLoggedIn(checkLoginStatus());
  }, [checkLoginStatus()]);

  function checkLoginStatus(): boolean {
    return !!(CookieManager.getCookie("token") && localStorage.getItem("user"));
  }

  function logout(): void {
    AuthService.logout();
    setIsLoggedIn(false);
    customToast("Logged out", "You have been logged out.");
  }
  return { isLoggedIn, logout };
};

export default useNavbarLoginStatus;
