import { useState, useRef, useEffect } from "react";

function Navbar() {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [notificationDropdown, setNotificationDropdown] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle fullscreen mode
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  return (
    <nav className="py-2 px-6 bg-[#f8f4f3] flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
      <button type="button" className="text-lg text-gray-900 font-semibold">
        <i className="ri-menu-line"></i>
      </button>

      <ul className="ml-auto flex items-center">
        {/* Search Bar */}
        <li className="mr-4">
          <input
            type="text"
            className="py-2 px-4 bg-gray-50 outline-none border border-gray-100 rounded-md text-sm focus:border-blue-500"
            placeholder="Search..."
          />
        </li>

        {/* Notifications */}
        <li className="relative" ref={notificationRef}>
          <button
            type="button"
            onClick={() => setNotificationDropdown(!notificationDropdown)}
            className="text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:text-gray-600"
          >
            <i className="ri-notification-3-line"></i>
          </button>

          {notificationDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-md border border-gray-100 z-50">
              <div className="p-4 border-b border-gray-100 text-sm font-medium">Notifications</div>
              <ul className="max-h-64 overflow-y-auto">
                <li className="py-2 px-4 hover:bg-gray-50 flex items-center">
                  <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded-full" />
                  <div className="ml-2">
                    <p className="text-sm font-medium text-gray-600">New Order</p>
                    <p className="text-xs text-gray-400">from a user</p>
                  </div>
                </li>
                <li className="py-2 px-4 hover:bg-gray-50 flex items-center">
                  <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded-full" />
                  <div className="ml-2">
                    <p className="text-sm font-medium text-gray-600">Message from John</p>
                    <p className="text-xs text-gray-400">Hello there!</p>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </li>

        {/* Fullscreen Button */}
        <li className="ml-4">
          <button type="button" onClick={toggleFullscreen} className="text-gray-400 w-8 h-8 rounded flex items-center justify-center hover:text-gray-600">
            <i className="ri-fullscreen-line"></i>
          </button>
        </li>

        {/* Profile Dropdown */}
        <li className="relative ml-4" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileDropdown(!profileDropdown)}
            className="flex items-center"
          >
            <div className="flex-shrink-0 w-10 h-10 relative">
              <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                  alt="User"
                />
                <div className="absolute top-0 left-7 w-3 h-3 bg-lime-500 border-2 border-white rounded-full"></div>
              </div>
            </div>
            <div className="p-2 md:block text-left">
              <h2 className="text-sm font-semibold text-gray-800">John Doe</h2>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </button>

          {profileDropdown && (
            <ul className="absolute right-0 mt-2 py-1.5 rounded-md bg-white border border-gray-100 shadow-md w-full max-w-[140px] z-50">
              <li>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-[#f84525] hover:bg-gray-50">
                  Profile
                </button>
              </li>
              <li>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-[#f84525] hover:bg-gray-50">
                  Settings
                </button>
              </li>
              <li>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-[#f84525] hover:bg-gray-50">
                  Logout
                </button>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
