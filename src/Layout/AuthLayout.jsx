// import React from 'react';

import { BsArrowLeft } from "react-icons/bs";
import { Link, Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-sky-500 hover:underline"
      >
        <BsArrowLeft className="text-lg" />
        <span className="font-medium">Back to Home</span>
      </Link>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
