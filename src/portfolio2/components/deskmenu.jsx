import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import useDarkMode from '../hooks/useDarkMode'; // Uncomment if you have this

const DeskMenu = () => {
  const location = useLocation();
  // const [theme, toggleTheme] = useDarkMode(); // Remove if not used

  const navItems = [
    { to: "/", label: "About", icon: "fa-user" },
    { to: "/resume", label: "Resume", icon: "fa-file-lines" },
    { to: "/work", label: "Works", icon: "fa-briefcase" },
    { to: "/blog", label: "Blogs", icon: "fa-blog" },
    { to: "/contact", label: "Contact", icon: "fa-address-book" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className="lg:w-[560px] h-[144px] hidden lg:block p-[30px] ml-auto mb-10 rounded-[16px] bg-white dark:bg-[#111111]"
    >
      <nav className='hidden lg:block'>
        <ul className="flex">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={isActive(item.to) ? "menu-active" : "menu-item"}
              >
                <span class="text-xl mb-1">
                <i className={`fa-solid ${item.icon}`}></i>
                </span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default DeskMenu;
