// import React from 'react';

import { useForm } from "react-hook-form";
import useAuth from "../hook/useAuth";
import { Link, useNavigate } from "react-router";
import { saveOrUpdateUser } from "../../Util";
import Swal from "sweetalert2"; 

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { singInUser, sigInWIthGoogle } = useAuth();
  const navigate = useNavigate();

  // 1. Email and Password Login Handler
  const handleLogin = async (data) => {
    try {
      const res = await singInUser(data.email, data.password);
      const user = res.user;

      const userPayload = {
        name: user.displayName || "Existing User",
        email: user.email,
        image: user.photoURL || "",
      };

      await saveOrUpdateUser(userPayload);

      Swal.fire({
        title: "Login Successful!",
        text: `Welcome back, ${user.displayName || "User"}!`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");

    } catch (err) {
      console.error('from error', err.message || err);
      
      Swal.fire({
        title: "Login Failed!",
        text: err.message || "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  // 2. Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    try {
      const res = await sigInWIthGoogle();
      const user = res.user;

      const userPayload = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      };

      await saveOrUpdateUser(userPayload);

      Swal.fire({
        title: "Login Successful!",
        text: `Welcome back, ${user.displayName}!`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");

    } catch (err) {
      console.error("err msg", err.message || err);
      
      Swal.fire({
        title: "Google Sign-In Failed!",
        text: err.message || "Could not connect with Google.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
      <div className="card-body">
        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            {/* --Email-- */}
            <label className="label">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="input"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
            {/* ---Password--- */}
            <label className="label">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: 6,
              })}
              type="password"
              className="input"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-xs text-red-500 mt-1">
                Password must be 6 character or long
              </p>
            )}
            {/* fp */}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            {/* ---------- */}
            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
        </form>

        <div className="my-3 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
        </div>

        {/* google btn */}
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>

        <p className="mt-2">
          Don’t have an account ?{" "}
          <Link to="/register" className="text-sky-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;