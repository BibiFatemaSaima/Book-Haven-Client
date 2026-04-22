import React, { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../components/AuthContext/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleLogout = () => {
    signOutUser()
      .then(() => console.log("Logout successful"))
      // .catch((error) => console.error(error));
  };

  const activeClass = ({ isActive }) =>
    isActive ? "text-blue-600 font-semibold" : "";

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* left */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          {/* mobile menu */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/" className={activeClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-books" className={activeClass}>
                AllBooks
              </NavLink>
            </li>

            {user && (
              <>
                <li>
                  <NavLink to="/add-book" className={activeClass}>
                    AddBook
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-book" className={activeClass}>
                    MyBooks
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-profile" className={activeClass}>
                    MyProfile
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        <NavLink to="/" className="btn btn-ghost text-xl">
          The Book Haven
        </NavLink>
      </div>

      {/* center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <NavLink to="/" className={activeClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/all-books" className={activeClass}>
              AllBooks
            </NavLink>
          </li>

          {user ? (
            <>
              <li>
                <NavLink to="/add-book" className={activeClass}>
                  AddBook
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-books" className={activeClass}>
                  MyBooks
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-profile" className={activeClass}>
                  MyProfile
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className={activeClass}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={activeClass}>
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* right */}
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-3">
            {/* avatar + dropdown */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="cursor-pointer">
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="User"
                  className="w-10 h-10 rounded-full border"
                />
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box shadow mt-3 w-52 p-2"
              >
                <li className="px-3 py-2 text-sm text-gray-600">
                  {user.displayName || "User"}
                </li>
                <li>
                  <NavLink to="/my-profile">My Profile</NavLink>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-error">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <NavLink to="/login" className="btn btn-primary">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
