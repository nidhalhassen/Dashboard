import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
  const [selectedMenu, setSelectedMenu] = useState(null);

  // Handle screen resizing for responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle Sidebar (Mobile)
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Toggle Dropdowns
  const toggleDropdown = (menu) => {
    setSelectedMenu(selectedMenu === menu ? null : menu);
  };

  return (
    <>
      {/* Sidebar Overlay (for mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#f8f4f3] p-4 z-50 transition-transform duration-300 ${
          isOpen ? "w-64 translate-x-0" : "-translate-x-full"
        } md:w-64 md:translate-x-0`}
      >
        {/* Sidebar Logo */}
        <div className="flex items-center pb-4 border-b border-gray-800">
          <img
            src="https://bowlnroll.com.tn/wp-content/uploads/2022/06/logo-3.png"
            alt="BowlinRoll Logo"
            className="h-12 w-auto"
          />
        </div>

        {/* Sidebar Menu */}
        <ul className="mt-4">
          <span className="text-gray-400 font-bold">ADMIN</span>

          <li className="mb-1">
            <Link
              to="/"
              className="flex items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-white rounded-md"
            >
              <i className="ri-home-2-line mr-3 text-lg"></i>
              <span className="text-sm">Dashboard</span>
            </Link>
          </li>

          {/* Users Dropdown */}
          <li className="mb-1">
            <button
              onClick={() => toggleDropdown("users")}
              className="flex w-full text-left items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-white rounded-md"
            >
              <i className="bx bx-user mr-3 text-lg"></i>
              <span className="text-sm">Users</span>
              <i
                className={`ri-arrow-right-s-line ml-auto transition-transform ${
                  selectedMenu === "users" ? "rotate-90" : ""
                }`}
              ></i>
            </button>
            {selectedMenu === "users" && (
              <ul className="pl-7 mt-2">
                <li className="mb-4">
                  <Link
                    to="/users/all"
                    className="text-gray-900 text-sm flex items-center hover:text-[#f84525]"
                  >
                    <span className="w-1 h-1 bg-gray-300 rounded-full mr-3"></span>All
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/users/roles"
                    className="text-gray-900 text-sm flex items-center hover:text-[#f84525]"
                  >
                    <span className="w-1 h-1 bg-gray-300 rounded-full mr-3"></span>Roles
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="mb-1">
            <Link
              to="/activities"
              className="flex items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-white rounded-md"
            >
              <i className="bx bx-list-ul mr-3 text-lg"></i>
              <span className="text-sm">Activities</span>
            </Link>
          </li>

          <span className="text-gray-400 font-bold">BLOG</span>

          {/* Blog Dropdown */}
          <li className="mb-1">
            <button
              onClick={() => toggleDropdown("blog")}
              className="flex w-full text-left items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-white rounded-md"
            >
              <i className="bx bxl-blogger mr-3 text-lg"></i>
              <span className="text-sm">Posts</span>
              <i
                className={`ri-arrow-right-s-line ml-auto transition-transform ${
                  selectedMenu === "blog" ? "rotate-90" : ""
                }`}
              ></i>
            </button>
            {selectedMenu === "blog" && (
              <ul className="pl-7 mt-2">
                <li className="mb-4">
                  <Link
                    to="/blog/all"
                    className="text-gray-900 text-sm flex items-center hover:text-[#f84525]"
                  >
                    <span className="w-1 h-1 bg-gray-300 rounded-full mr-3"></span>All
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to="/blog/categories"
                    className="text-gray-900 text-sm flex items-center hover:text-[#f84525]"
                  >
                    <span className="w-1 h-1 bg-gray-300 rounded-full mr-3"></span>Categories
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="mb-1">
            <Link
              to="/archive"
              className="flex items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-white rounded-md"
            >
              <i className="bx bx-archive mr-3 text-lg"></i>
              <span className="text-sm">Archive</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 bg-gray-200 p-2 rounded-md lg:hidden flex items-center justify-center"
        aria-label="Toggle Sidebar"
      >
        <i
          className={`ri-menu-line text-2xl transition-transform ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        ></i>
      </button>
    </>
  );
}

export default Sidebar;
