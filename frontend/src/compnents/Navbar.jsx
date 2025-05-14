/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { connect } from "react-redux";
import axios from "axios";
import { setLogin } from "../action";

const Navbar = ({ commonData, setLogin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [clickedDropdown, setClickedDropdown] = useState(false);
  const navigate = useNavigate();

  const mobileMenuRef = useRef(null);
  const dropdownRefs = useRef([]);

  function f1() {
    return (
      <div className="flex items-center ml-4 space-x-4">
        <Link to="/profilePage">
          <motion.span
            className="text-sm font-bold text-gray-700 hover:text-black transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            PROFILE
          </motion.span>
        </Link>

        <div >
          <motion.button
            className="px-4 py-2 text-blue-800 text-sm font-medium bg-text-amber-400 rounded-md hover:bg-text-amber-400/70 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={doLogout}
          >
            LOGOUT
          </motion.button>
        </div>
      </div>
    )
  }
  function f2() {
    return (
      <div className="flex items-center ml-4 space-x-4">
        <Link to="/login">
          <motion.span
            className="text-sm font-bold text-gray-700 hover:text-black transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            LOGIN
          </motion.span>
        </Link>

        <Link to="/register">
          <motion.div
            className="px-4 py-2 text-blue-800 text-sm font-medium bg-text-amber-400 rounded-md hover:bg-text-amber-400/70 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            REGISTER
          </motion.div>
        </Link>
      </div>
    )
  }
  function f3() {
    return (
      <div className="mt-auto pt-6 gap-4">
        <Link to="/profilePage" onClick={() => setIsMobileMenuOpen(false)}>
          <motion.span
            className="text-xl pb-2 font-medium text-amber-400 hover:text-amber-700 transition-colors block text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            PROFILE
          </motion.span>
        </Link>

        <div onClick={() => setIsMobileMenuOpen(false)}>
          <motion.div onClick={doLogout}
            className="px-8 py-3 text-blue-800 text-lg font-medium bg-text-amber-700 rounded-md transition-colors text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            LOGOUT
          </motion.div>
        </div>
      </div>
    )

  }
  function f4() {
    return (
      <div className="mt-auto pt-6 gap-4">
        <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
          <motion.span
            className="text-xl pb-2 font-medium text-amber-400 hover:text-amber-700 transition-colors block text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            LOGIN
          </motion.span>
        </Link>

        <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
          <motion.div
            className="px-8 py-3 text-blue-800 text-lg font-medium bg-text-amber-700 rounded-md transition-colors text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            REGISTER
          </motion.div>
        </Link>
      </div>
    )
  }
  async function doLogout() {
    navigate("/login");
    window.location.reload();
    // let response = await axios.post(
    //   import.meta.env.VITE_API_URL + `/auth/logout`,
    //   {},
    //   { withCredentials: true }
    // );
    // if (response.status === 200) {
    //   setLogin(0);
    // }
    // // console.log("Logout");
  }
  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        isMobileMenuOpen
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Handle dropdown click outside
  useEffect(() => {
    const handleDropdownClickOutside = (event) => {
      if (dropdownOpen !== null && clickedDropdown) {
        const currentDropdownRef = dropdownRefs.current[dropdownOpen];
        if (currentDropdownRef && !currentDropdownRef.contains(event.target)) {
          setDropdownOpen(null);
          setClickedDropdown(false);
        }
      }
    };

    document.addEventListener("mousedown", handleDropdownClickOutside);
    return () => document.removeEventListener("mousedown", handleDropdownClickOutside);
  }, [dropdownOpen, clickedDropdown]);

  return (
    <nav
      className={` select-none left-0 w-full p-2 z-50 transition-all duration-700 ${isScrolled
        ? "bg-white/80 top-0 fixed shadow-lg"
        : "bg-white relative backdrop-blur-lg"
        }`}
    >
      <div className="px-4 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center">
          <span className="mr-2 text-amber-400">STORE</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-1 xl:space-x-4">

          {/* Auth Buttons */}
          {commonData.islogin === 0 ? f2() : f1()}
        </div>

        {/* Mobile Auth Buttons */}
        {/* <div className="flex items-center md:hidden space-x-2 mr-2">
          <Link to="/login">
            <motion.span 
              className="text-sm font-medium text-yellow-600" 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.span>
          </Link>
        </div> */}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-gray-700 hover:bg-yellow-50 p-2 rounded-md"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-3/4 h-auto bg-white shadow-lg z-50 flex flex-col pb-12 px-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center ">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-amber-400">
                STORE
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Mobile Auth Buttons */}
            {commonData.islogin === 0 ? f4() : f3()}

          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

let connectToStore = (state) => ({ commonData: state });
let dispatchToStore = (dispatch) => (
  {
    setLogin: (value) => dispatch(setLogin(value)),
  }
);
export default connect(connectToStore, dispatchToStore)(Navbar);