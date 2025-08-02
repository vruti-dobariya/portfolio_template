import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/images/logo/logo.png';
import DefaultLogo from '../assets/images/logo.png';
import useDarkMode from '../hooks/useDarkMode';

const Header = () => {
  const location = useLocation();
  const [theme, toggleTheme] = useDarkMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoImg, setLogoImg] = useState(DefaultLogo);

    useEffect(() => {
      // Get profile photo
      fetch('admin/getImages')
        .then(res => res.json())
        .then(data => {
          if (data?.status?.success) {
            const path = data.data?.companyLogoPath;
            if (path) {
              setLogoImg(path);
            }
          }
        })
        .catch(() => setLogoImg(DefaultLogo));
    }, []);
  
  const navItems = [
    { to: "/", label: "Home", icon: "fa-house" },
    { to: "/about", label: "About", icon: "fa-user" },
    { to: "/resume", label: "Resume", icon: "fa-file-lines" },
    { to: "/work", label: "Works", icon: "fa-briefcase" },
    { to: "/blog", label: "Blogs", icon: "fa-blog" },
    { to: "/contact", label: "Contact", icon: "fa-address-book" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="flex justify-between items-center fixed top-0 left-0 w-full lg:static z-[1111111111]">
      <div className="flex justify-between w-full px-4 lg:px-0 bg-[#F3F6F6] lg:bg-transparent dark:bg-black">
        <div className="flex justify-between w-full items-center space-x-4 lg:my-8 my-5">
          <Link className="text-5xl font-semibold" to="/">
            <img className="max-h-[44px] w-[120px] object-contain" src={logoImg} alt="logo" />
          </Link>
          <div className="flex items-center">
            <button onClick={toggleTheme} type="button" className="dark-light-btn lg:hidden w-[44px] h-[44px] ml-2">
              <i className={`fa-solid text-xl ${theme === "dark" ? "fa-sun" : "fa-moon"}`}></i>
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="menu-toggle-btn lg:hidden w-[44px] h-[44px] ml-2"
            >
              <i className={`fa-solid text-xl ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Menu */}
      <nav className="hidden lg:block">
        <ul className="flex my-12">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={isActive(item.to) ? "menu-item-two-active" : "menu-item-two"}
              >
                <span className="mr-2 text-base">
                  <i className={`fa-solid ${item.icon}`}></i>
                </span>
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <button onClick={toggleTheme} type="button" className="dark-light-btn w-[44px] h-[44px] ml-2">
              <i className={`fa-solid text-xl ${theme === "dark" ? "fa-sun" : "fa-moon"}`}></i>
            </button>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden absolute left-0 top-[100%] w-full z-[9999] bg-white dark:bg-[#1d1d1d] rounded-b-[20px] shadow-md">
          <ul className="block">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={isActive(item.to) ? "mobile-menu-items-active" : "mobile-menu-items"}
                >
                  <span className="mr-2 text-xl">
                    <i className={`fa-solid ${item.icon}`}></i>
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
