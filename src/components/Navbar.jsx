import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/select-role");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="w-full bg-black text-white font-sans">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 md:py-5">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-400 transition">
            TrendSetter
          </Link>
        </div>
        <nav className="flex items-center gap-6 flex-wrap">
          <Link
            to="/home"
            className="flex items-center gap-1 font-medium px-2 py-1 rounded hover:bg-white hover:text-black transition"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="flex items-center gap-1 font-medium px-2 py-1 rounded hover:bg-white hover:text-black transition"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-1 font-medium px-2 py-1 rounded hover:bg-white hover:text-black transition"
          >
            <FontAwesomeIcon icon={faShoppingCart} /> Cart
          </Link>
          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1 rounded bg-white text-black font-medium shadow-md hover:bg-black hover:text-white hover:border hover:border-white transition"
            >
              <FontAwesomeIcon icon={faRightFromBracket} /> Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;