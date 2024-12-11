import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/operations/Authapi";
import { useDispatch, useSelector } from "react-redux";
import { RiContactsLine, RiMenu3Line } from "react-icons/ri";
import { setIsToggle } from "../../slices/userSlice";

function Navbar() {
  const tabs = [
    { title: "Noodles", foodCategory: "noodles", path: "/noodles" },
    { title: "Pizza", foodCategory: "pizza", path: "/pizza" },
    {
      title: "North Indian",
      foodCategory: "north indian",
      path: "/northindian",
    },
    {
      title: "South Indian",
      foodCategory: "south indian",
      path: "/southindian",
    },
    { title: "Sweets", foodCategory: "sweets", path: "/sweets" },
  ];

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user, isToggle } = useSelector((state) => state.auth);

  const toggleCategoryMenu = () => setIsCategoryOpen(!isCategoryOpen);
  const toggleDashboardMenu = () => setIsDashboardOpen(!isDashboardOpen);
  const toggleProfileSidebar = () => setProfileOpen(!profileOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex flex-row justify-between items-center bg-white fixed top-0 left-0 w-full p-5 bg-transparent text-red-500 font-bold text-lg border-b border-red-200 z-50">
      {/* Hamburger Menu for Mobile */}
      <div className="lg:hidden">
        <RiMenu3Line className="text-2xl cursor-pointer" onClick={toggleMenu} />
      </div>

      {/* Conditional rendering for login/signup links */}
      {!token ? (
        <div className="flex space-x-6">
          <Link to="/signup">
            <p className="hover:text-red-700 transition">Signup</p>
          </Link>
          <Link to="/login">
            <p className="hover:text-red-700 transition">Login</p>
          </Link>
        </div>
      ) : null}

      {/* Category Dropdown */}
      {user?.role === "Customer" && (
        <div className="relative hidden lg:block">
          <p
            onClick={toggleCategoryMenu}
            className="cursor-pointer hover:text-red-700 transition"
          >
            Category
          </p>

          {isCategoryOpen && (
            <div className="absolute left-0 mt-2 w-[200px] bg-red-800 rounded-md shadow-lg z-50">
              {tabs.map((tab) => (
                <Link to={tab.path} key={tab.foodCategory}>
                  <div className="hover:bg-red-400 p-2 text-white">
                    {tab.title}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Dashboard Menu */}
      <div className="relative hidden lg:block">
        <p
          onClick={toggleDashboardMenu}
          className="cursor-pointer bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
        >
          Dashboard
        </p>
        {isDashboardOpen && (
          <ul className="absolute left-0 mt-2 w-[200px] bg-red-800 text-white rounded-md shadow-lg">
            {token && (
              <li
                className="hover:bg-red-400 p-2 text-center cursor-pointer"
                onClick={() => dispatch(logout(navigate))}
              >
                Logout
              </li>
            )}

           
              <Link to="/">
                <li className="hover:bg-red-400 p-2 text-center cursor-pointer">
                  Go to all products
                </li>
              </Link>

          
            {user?.role === "Instructor" && (
              <Link to="/products">
                <li className="hover:bg-red-400 p-2 text-center cursor-pointer">
                {token && <p>All added products</p> }
                </li>
              </Link>
            )}
          </ul>
        )}
      </div>

      {/* Cart Link (only visible to Customers) */}
      {user?.role === "Customer" &&(
        <Link
          to="/cart"
          className="hidden lg:block hover:text-red-700 transition"
        >
          <p>Cart</p>
        </Link>
      )}

      {/* Profile Icon */}
      <div
        onClick={toggleProfileSidebar}
        className="cursor-pointer text-2xl flex items-center hover:text-red-700 transition"
      >
        <RiContactsLine />
      </div>

      {/* Profile Sidebar */}
      <div
        className={`fixed top-0 right-0 w-[400px] transform transition-transform duration-300 ease-in-out h-full overflow-y-auto bg-white ${
          profileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          onClick={toggleProfileSidebar}
          className="p-4 cursor-pointer text-xl bg-gradient-to-r from-red-100 to-red-500"
        >
          {profileOpen ? "X" : <RiContactsLine />}
        </div>
        {profileOpen && (
          <div className="p-4 bg-gradient-to-r from-red-100 to-red-500 text-white">
            <p>
              {user?.firstName}
              {user?.lastName}
            </p>
            <p>{user?.email}</p>
            <p>{user?.role}</p>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-6 bg-red-800 text-white p-5">
          <div
            onClick={() => setIsMenuOpen(false)}
            className="cursor-pointer text-2xl"
          >
            X
          </div>

          <p
            onClick={toggleCategoryMenu}
            className="cursor-pointer hover:text-red-400 transition"
          >
            {user?.role === "Customer" && <p>Category</p>}
          </p>
          {isCategoryOpen && (
            <div className="flex flex-col items-center">
              {tabs.map((tab) => (
                <Link to={tab.path} key={tab.foodCategory}>
                  <div className="hover:bg-red-400 p-2">{tab.title}</div>
                </Link>
              ))}
            </div>
          )}

          <p
            onClick={toggleDashboardMenu}
            className="cursor-pointer bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
          >
            Dashboard
          </p>
          {isDashboardOpen && (
            <ul className="flex flex-col items-center">
              {token && (
                <li
                  className="hover:bg-red-400 p-2 cursor-pointer"
                  onClick={() => dispatch(logout(navigate))}
                >
                  Logout
                </li>
              )}
              <Link to="/">
                <li className="hover:bg-red-400 p-2 cursor-pointer">
                  Go to all products
                </li>
              </Link>
            </ul>
          )}

          {user?.role === "Customer" && (
            <Link to="/cart" className="text-center text-white">
              <p>Cart</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
