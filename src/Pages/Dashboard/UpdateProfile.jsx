import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { imageUpload } from "../../../Util";

const UpdateProfile = ({ closeModal }) => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let photoURL = user?.photoURL;

      // New Image Check Strategy
      if (data.photo && data.photo.length > 0) {
        photoURL = await imageUpload(data.photo[0]);
      }

      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      await axiosSecure.patch(`/update-user-data/${user?.email}`, {
        name: data.name,
        image: photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated Successfully!",
        customClass: {
          confirmButton: "bg-[#003366] text-white px-4 py-2 rounded-lg font-bold"
        },
        buttonsStyling: false
      });

      navigate("/dashboard/my-profile");
      closeModal();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.message,
        customClass: {
          confirmButton: "bg-red-500 text-white px-4 py-2 rounded-lg font-bold"
        },
        buttonsStyling: false
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-gray-100 overflow-hidden transform transition-all">
        
        {/* Header Block */}
        <div className="mb-5">
          <h3 className="text-xl font-extrabold text-[#003366] tracking-tight">
            Update Profile
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">Modify your account parameters below.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field Input */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-semibold text-gray-600 text-xs">Full Name</span>
            </label>
            <input
              {...register("name", { required: "Name configuration is required" })}
              className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none text-gray-700 font-medium transition-all"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-[11px] text-red-500 font-semibold mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Profile File Input Control */}
          <div className="form-control w-full">
            <label className="label py-1">
              <span className="label-text font-semibold text-gray-600 text-xs">Profile Cover Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("photo")}
              className="file-input file-input-bordered w-full h-11 text-sm rounded-xl focus:outline-none border-gray-200 bg-gray-50 file:bg-[#003366] file:text-white file:border-none file:text-xs file:font-bold file:uppercase file:h-full hover:file:bg-[#002244]"
            />
            <p className="text-[10px] text-gray-400 mt-1 px-1">Optional: Leave blank to keep current picture.</p>
          </div>

          {/* Form Actions Button Row */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
            <button
              type="button"
              onClick={closeModal}
              disabled={loading}
              className="px-4 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-all"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center px-5 py-2 text-sm font-bold text-white bg-sky-500 hover:bg-sky-600 rounded-xl shadow-xs min-w-28 transition-all duration-200 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;