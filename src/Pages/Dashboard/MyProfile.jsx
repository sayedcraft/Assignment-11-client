import useRole from "../../hook/useRole";
import UpdateProfile from "./UpdateProfile";
import { useState } from "react";
import useAuth from "../../hook/useAuth";
import Loading from "../../Components/Loading";

const MyProfile = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <Loading></Loading>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Profile Card Header Banner */}
        <div className="h-32 bg-linear-to-r from-[#003366] to-sky-500 w-full" />

        <div className="p-8 relative">
          {/* Avatar and Role Ring */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-24 mb-6">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-md bg-white">
              <img
                src={user?.photoURL || "/default-avatar.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center md:text-left pt-2">
              <h2 className="text-2xl font-extrabold text-[#003366] tracking-tight">
                {user?.displayName || "Not set"}
              </h2>
              <span className="inline-block mt-2 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white bg-sky-500 rounded-full shadow-xs">
                {role}
              </span>
            </div>
          </div>

          <hr className="border-gray-100 my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Full Name
              </p>
              <p className="text-base font-semibold text-[#003366] mt-1">
                {user?.displayName || "Not configured"}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Email Address
              </p>
              <p className="text-base font-semibold text-gray-600 mt-1 truncate">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Action Trigger Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#003366] hover:bg-[#002244] text-white text-sm font-bold rounded-xl shadow-sm transition-all duration-200 active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* Modern Modal Overlay */}
      {isOpen && <UpdateProfile closeModal={() => setIsOpen(false)} />}
    </div>
  );
};

export default MyProfile;
