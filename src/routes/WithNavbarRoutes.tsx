import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

const withNavbarRoutes = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default withNavbarRoutes;
