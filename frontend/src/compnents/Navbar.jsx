import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    {
      title: "Book",
      path: "#",
      hasSubmenu: true,
      submenu: ["Art & Photography", "Literature & literary studies", "English Language Teaching", "Novels"],
    },
   
    {
      title: "New Arrival",
      path: "#",
      hasSubmenu: true,
      submenu: ["LAW", "History", "Auto Biography"],
    },
    {
      title: "Book Sets",
      path: "#",
      hasSubmenu: true,
      submenu: ["Lifestyle", "Computer & Internet", "Medicine"],
    },
    {
      title: "Fiction Books",
      path: "#",
      hasSubmenu: true,
      submenu: ["Adventure", "Classic Fiction", "Fantasy"],
    },
    { title: "Award Winners", path: "#", hasSubmenu: false },
    { title: "Today's Deal", path: "#", hasSubmenu: false },

   
  ];

  

  const toggleDropdown = (index) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-white transition-all duration-300 ${
        isScrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="max-w-8xl mx-auto">
        <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-3">
          {/* Logo */}
          <Link to="/" className="font-bold text-lg text-black tracking-widest">
            BOOKS WAGON
          </Link>

          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">
                <Link
                  to={link.path}
                  className="py-2 flex items-center text-black hover:text-black/60"
                >
                  {link.title}
                  {/* {link.hasSubmenu && (
                    <ChevronDown
                      size={16}
                      className="ml-1 opacity-70 group-hover:rotate-180 transition-transform duration-300"
                    />
                  )} */}
                </Link>

                {link.hasSubmenu && (
                  <div className="absolute top-full -left-6 pt-3 w-48 hidden group-hover:block">
                    <div className="bg-white rounded-md shadow-lg border py-2">
                      {link.submenu.map((item, idx) => (
                        <Link
                          key={idx}
                          to={`${link.path}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block px-4 py-2 text-black text-left text-sm hover:bg-gray-50"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Search (desktop) */}
            <div className="hidden md:flex items-center px-3 py-1 bg-gray-100 rounded-full">
              <Search size={16} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-sm w-28 lg:w-40"
              />
            </div>

            <Link to="/cart" className="text-black hover:text-black/60">
              <ShoppingCart size={20} />
            </Link>
            <Link to="/login" className="text-black hover:text-black/60">
              <User size={20} />
            </Link>
            

            {/* Hamburger */}
            <button
              className="lg:hidden menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu lg:hidden fixed top-16 left-0 w-full h-full bg-white z-40 transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto px-4 py-6">
          <nav>
            {navLinks.map((link, index) => (
              <div key={index} >
                <div
                  className="flex justify-between items-center py-3"
                  onClick={() => link.hasSubmenu && toggleDropdown(index)}
                >
                  <Link
                    to={!link.hasSubmenu ? link.path : "#"}
                    className="text-base text-black font-medium"
                    onClick={(e) => link.hasSubmenu && e.preventDefault()}
                  >
                    {link.title}
                  </Link>
                  {link.hasSubmenu && (
                    <ChevronRight
                      size={20}
                      className={`transform transition-transform duration-300 ${
                        activeDropdown === index ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </div>

                {/* Submenu for Mobile */}
                {link.hasSubmenu && activeDropdown === index && (
                  <div className="pl-4">
                    {link.submenu.map((item, idx) => (
                      <Link
                        key={idx}
                        to={`${link.path}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                        className="block py-1 text-left text-black text-sm "
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Search */}
          <div className="mt-6">
            <div className="flex items-center px-3 py-2 bg-gray-100 rounded-full">
              <Search size={18} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>
          </div>

          {/* Extra mobile links */}
          <div className="mt-8 space-y-3 pb-20">
            <Link to="/login" className="flex items-center text-black text-sm font-medium">
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
               Login
             </Link>
              <Link to="/register" className="flex items-center text-black text-sm font-medium">
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
               Register
             </Link>
              <Link to="/" className="flex items-center text-black text-sm font-medium">
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
               Logout
             </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

