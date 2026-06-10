import { NavLink, Link } from "react-router";
import useAuth from "../../hook/useAuth";
import logo from "/logo.png";

const Navbar = () => {
  const { user, signOutUser } = useAuth();

  // Common function to handle active/selected tab styles
  const activeLinkStyle = ({ isActive }) =>
    `font-semibold px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-sky-500 text-white shadow-sm hover:bg-sky-600"
        : "text-slate-700 hover:bg-sky-200/50 hover:text-sky-600"
    }`;

  const links = (
    <>
      <li>
        <NavLink to="/" className={activeLinkStyle}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/allBook" className={activeLinkStyle}>All Book</NavLink>
      </li>
      <li>
        <NavLink to="/about" className={activeLinkStyle}>About us</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard/myProfile" className={activeLinkStyle}>Dashboard</NavLink>
        </li>
      )}
    </>
  );

  const handleSignOut = () => {
    signOutUser()
      .then()
      .catch((err) => console.log(err));
  };

  return (
    <div className="navbar bg-sky-100 sticky top-0 z-50 border-b border-sky-200 transition-all duration-300 shadow-sm">
      <div className="navbar-start lg:ml-10 md:ml-7">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-sky-200">
            {links}
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <img src={logo} className="h-9 w-9 object-contain" alt="Logo" />
          <Link to="/" className="text-xl font-extrabold tracking-tight text-slate-800">
            Book<span className="text-sky-500">Courier</span>
          </Link>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
      </div>

      <div className="navbar-end lg:mr-10 md:mr-7 gap-3">
        {/* Theme Controller */}
        <label className="swap swap-rotate mr-1 p-2 rounded-full hover:bg-sky-200/50 transition-colors text-slate-700">
          <input type="checkbox" className="theme-controller" value="luxury" />
          {/* Sun icon */}
          <svg className="swap-off h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          {/* Moon icon */}
          <svg className="swap-on h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-sky-400 hover:border-sky-500 transition-all p-0.5">
              <div className="w-9 rounded-full">
                <img alt="User Profile" src={user?.photoURL || "https://i.ibb.co/mJL1vY0/user-placeholder.png"} />
              </div>
            </div>
            
            {/* Updated Industry Standard Dropdown Menu */}
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-xl z-[50] mt-3 w-64 p-2 shadow-2xl border border-sky-100">
              
              {/* User Info Header */}
              <div className="px-4 py-3 border-b border-base-200 mb-2">
                <p className="font-bold text-slate-800 text-[15px] truncate">
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {user?.email}
                </p>
              </div>

              {/* Menu Items */}
              <li>
                <Link to="/dashboard/myProfile" className="py-2 text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/dashboard/myProfile" className="py-2 text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/settings" className="py-2 text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Settings
                </Link>
              </li>

              <div className="divider my-1 h-[1px]"></div>

              {/* Logout Button */}
              <li>
                <button onClick={handleSignOut} className="py-2 text-red-600 hover:bg-red-50 hover:text-red-700 font-medium rounded-lg transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link className="btn btn-sm bg-sky-500 hover:bg-sky-600 text-white border-none rounded-lg px-5 font-bold shadow-md transition-all" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;