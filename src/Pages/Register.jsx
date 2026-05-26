// import React from 'react';

import { useForm } from "react-hook-form";
import useAuth from "../hook/useAuth";
import { Link, useNavigate } from "react-router"; 
import axios from "axios";
import { saveOrUpdateUser } from "../../Util";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, sigInWIthGoogle, updateUserProfile } = useAuth();
  const navigate = useNavigate(); 

  const handleRegister = async (data) => {
    console.log("Registration Data:", data);

    const profileImg = data.photo[0];
    if (!profileImg) {
      console.error("No profile image selected");
      return;
    }

    try {
      // 1. Firebase ba Auth System-e User Register kora
      const authResult = await registerUser(data.email, data.password);
      console.log("User Registered Successfully:", authResult.user);

      // 2. Image Upload er jonno FormData ready kora
      const formData = new FormData();
      formData.append("image", profileImg);

      // 3. ImgBB API-te image host kora
      const imageApiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;
      const imgbbResponse = await axios.post(imageApiUrl, formData);
      const uploadedImageUrl = imgbbResponse.data.data.url;
      console.log("Image Hosted URL:", uploadedImageUrl);

      // 4. User Profile (Name & Photo) Update kora
      const userProfile = {
        displayName: data.name,
        photoURL: uploadedImageUrl,
      };

      const userPayload = {
        name: data.name,
        email: data.email,
        image: uploadedImageUrl,
      };

      await saveOrUpdateUser(userPayload);

      await updateUserProfile(userProfile);
      console.log("User profile updated successfully!");

      navigate("/");

    } catch (error) {
      console.error("Registration Process Failed:", error.message || error);
    }
  };

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
      
      navigate("/");

    } catch (err) {
      console.error("Google Sign-In Failed:", err.message || err);
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
      <div className="card-body">
        <form onSubmit={handleSubmit(handleRegister)}>
          <fieldset className="fieldset">
            {/* --Name-- */}
            <label className="label">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className="input"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
            {/* --Email-- */}
            <label className="label">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="input"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
            {/* Photo URL */}
            <div>
              <label className="label">Profile Image</label>

              <input
                type="file"
                {...register("photo", {
                  required: "Profile image is required",
                })}
                className="file-input"
              />

              {errors.photo && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.photo.message}
                </p>
              )}
            </div>
            {/* ---Password--- */}
            <label className="label">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: 6,
              })}
              type="password"
              className="input"
              placeholder="Enter your password"
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

            {/* ---------- */}
            <button className="btn btn-neutral mt-4">Register</button>
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
          Already have an account ?{" "}
          <Link to="/login" className="text-sky-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;