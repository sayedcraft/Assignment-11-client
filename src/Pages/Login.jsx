// import React from 'react';

import { useForm } from "react-hook-form";
import useAuth from "../hook/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { singInUser } = useAuth();

  const handleLogin = (data) => {
    console.log(data);
    singInUser(data.email, data.password)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
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
      </div>
    </div>
  );
};

export default Login;
