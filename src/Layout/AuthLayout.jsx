// import React from 'react';
import { Link, Outlet } from "react-router";
import { BsArrowLeft } from "react-icons/bs";

const AuthLayout = () => {
  return (
    <div className="max-w-11/12 mx-auto">

      <div className="mt-5 mb-5">
        <Link
          to="/"
          className="flex items-center gap-2 text-sky-500 hover:underline"
        >
          <BsArrowLeft className="text-lg" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>
      
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AuthLayout;
