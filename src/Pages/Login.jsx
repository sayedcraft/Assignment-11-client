// import React from 'react';

import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegister)}>
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
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
          {/* ---Password--- */}
          <label className="label">Password</label>
          <input
            {...register("password", { required: "Password is required" ,minLength:6})}
            type="password"
            className="input"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
          {
            errors.password?.type==='minLength' && <p className="text-xs text-red-500 mt-1">
              Password must be 6 character or long
            </p>
          }
          {/* ---------- */}
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
