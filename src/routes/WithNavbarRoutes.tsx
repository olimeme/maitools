import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

const WithNavbarRoutes = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default WithNavbarRoutes;
