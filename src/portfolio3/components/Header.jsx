import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/img/logo.svg";
import DefaultLogo from '../assets/img/logo_refined_transparent.png';


const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState(0); // default active to "HOME"
  const [logoImg, setLogoImg] = useState(DefaultLogo);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

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

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: "HOME", icon: "fas fa-house-damage", href: "#home", nav: 0 },
    { name: "ABOUT", icon: "far fa-address-card", href: "#about", nav: 1 },
    { name: "RESUME", icon: "far fa-file", href: "#resume", nav: 2 },
    { name: "WORK", icon: "fas fa-briefcase", href: "#work", nav: 3 },
    { name: "BLOG", icon: "fas fa-blog", href: "#blog", nav: 4 },
    { name: "CONTACT", icon: "fas fa-id-card-alt", href: "#contactus", nav: 5 },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="mobile-header flex lg:hidden p-4 items-center justify-between relative z-50 bg-white dark:bg-gray-900 shadow">
        <div className="logo">
          <Link to="/">
            <img src={logoImg} alt="Logo" className="h-8" />
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex gap-2 items-center">
        <button
          onClick={toggleMobileMenu}
          className="mobile_toggle w-[40px] flex flex-col justify-center items-center"
        >
          <span className="w-[25px] h-[2px] bg-slate-900 dark:bg-white block mb-1"></span>
          <span className="w-[25px] h-[2px] bg-slate-900 dark:bg-white block mb-1"></span>
          <span className="w-[25px] h-[2px] bg-slate-900 dark:bg-white block"></span>
        </button>

        {/* Mobile Nav Menu */}
          <nav
            className={`absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-md transition-all duration-300 ease-in-out ${
              mobileOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col p-4 space-y-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    className={`nav-link flex items-center justify-between text-gray-800 dark:text-white ${
                      activeNav === index ? "active" : ""
                    }`}
                    data-scroll-nav={item.nav}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveNav(index); // mark clicked nav item as active
                      setMobileOpen(false); // close mobile nav
                      const section = document.querySelector(item.href);
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                  >
                    <span>{item.name}</span>
                    <i className={`${item.icon} ml-2`}></i>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

         <div className="theme-color mt-auto pb-0">
            <button id="theme-toggle" type="button" onClick={toggleTheme}>
              {darkMode ? (
                  <i className="fa-solid w-5 h-5 text-black fa-sun"></i>
              ) : (
                  <i className="fa-solid w-5 h-5 text-white fa-moon"></i>
              )}
            </button>
          </div>
          </div>
      </div>

      {/* Desktop Header */}
       <header className="main-header one-page-nav">
          {/* Logo */}
          <div className="logo bg-theme-500 py-3.5">
            <Link to="/">
              <img src={logoImg} className="object-contain" alt="Logo" />
            </Link>
          </div>
  
        <nav className="navbar-collapse">
          <ul className="nav nav-menu">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  className={`nav-link ${activeNav === index ? "active" : ""}`}
                  data-scroll-nav={item.nav}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveNav(index);
                    const section = document.querySelector(item.href);
                    if (section) {
                      section.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                    setMobileOpen(false);
                  }}
                >
                  <span>{item.name}</span>
                  <i className={`${item.icon} ml-2`}></i>
                </a>
              </li>
            ))}
          </ul>
        </nav>

          {/* Theme Switch */}
          <div className="theme-color mt-auto">
            <button id="theme-toggle" type="button" onClick={toggleTheme}>
              {darkMode ? (
                  <i className="fa-solid w-5 h-5 text-black fa-sun"></i>
              ) : (
                  <i className="fa-solid w-5 h-5 text-white fa-moon"></i>
              )}
            </button>
          </div>
        </header>
    </>
  );
};

export default Header;
