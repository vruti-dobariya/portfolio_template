import React, { useEffect, useRef, useState } from 'react';
import purple from '../assets/img/styleswitcher/purple.png';
import red from '../assets/img/styleswitcher/red.png';
import blueviolet from '../assets/img/styleswitcher/blueviolet.png';
import blue from '../assets/img/styleswitcher/blue.png';
import goldenrod from '../assets/img/styleswitcher/goldenrod.png';
import magenta from '../assets/img/styleswitcher/magenta.png';
import yellowgreen from '../assets/img/styleswitcher/yellowgreen.png';
import orange from '../assets/img/styleswitcher/orange.png';
import green from '../assets/img/styleswitcher/green.png';
import yellow from '../assets/img/styleswitcher/yellow.png';
import useDarkMode from '../hooks/useDarkMode';


const Header = ({ activePage, setActivePage, setDirection }) => {
  const [switcherVisible, setSwitcherVisible] = useState(() => {
    return localStorage.getItem('switcher_visible') === 'true';
  });

  const switcherRef = useRef(null);
  const showSwitcherRef = useRef(null);
  const [theme, toggleTheme] = useDarkMode();

  const colors = [
    { img: purple, title: 'purple' },
    { img: red, title: 'red' },
    { img: blueviolet, title: 'blueviolet' },
    { img: blue, title: 'blue' },
    { img: goldenrod, title: 'goldenrod' },
    { img: magenta, title: 'magenta' },
    { img: yellowgreen, title: 'yellowgreen' },
    { img: orange, title: 'orange' },
    { img: green, title: 'green' },
    { img: yellow, title: 'yellow' },
  ];

  const menuItems = [
    { icon: 'home', label: 'Home', id: 'home' },
    { icon: 'user', label: 'About', id: 'about' },
    { icon: 'briefcase', label: 'Portfolio', id: 'portfolio' },
    { icon: 'envelope-open', label: 'Contact', id: 'contact' },
    { icon: 'comments', label: 'Blog', id: 'blog' },
  ];

  const handleClick = (id) => {
    setActivePage(id);

    // Close mobile nav if open
    const mobileToggle = document.getElementById('inputmobile');
    if (mobileToggle && mobileToggle.checked) {
      mobileToggle.checked = false;
    }
  };

  const toggleSwitcher = () => {
    const nextState = !switcherVisible;
    setSwitcherVisible(nextState);
    localStorage.setItem('switcher_visible', nextState);
  };

  const setActiveStyleSheet = (title) => {
    const links = document.getElementsByTagName("link");
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      if (link.getAttribute("rel").includes("style") && link.getAttribute("title")) {
        link.disabled = true;
        if (link.getAttribute("title") === title) {
          link.disabled = false;
        }
      }
    }
    localStorage.setItem('active_theme', title);
  };

  const removeAllDirectionClasses = () => {
    const body = document.body;
    body.classList.remove(
      'animation-top', 'animation-right', 'animation-bottom', 'animation-left',
      'animation-cornertopleft', 'animation-cornertopright',
      'animation-cornerbottomleft', 'animation-cornerbottomright'
    );
  };

  const handleDirectionClick = (id) => {
    removeAllDirectionClasses();
    document.body.classList.add(`animation-${id}`);
    setDirection(id); // Store selected direction for App.jsx
    const all = document.querySelectorAll('.transition-direction > div');
    all.forEach(div => div.classList.remove('active'));
    const activeDiv = document.getElementById(id);
    if (activeDiv) activeDiv.classList.add('active');
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('active_theme');
    if (storedTheme) {
      setActiveStyleSheet(storedTheme);
    }

    if (switcherRef.current && showSwitcherRef.current) {
      if (switcherVisible) {
        switcherRef.current.style.marginLeft = '0px';
        switcherRef.current.style.display = 'block';
        showSwitcherRef.current.style.marginLeft = '-500px';
        showSwitcherRef.current.style.display = 'none';
      } else {
        switcherRef.current.style.marginLeft = '-500px';
        switcherRef.current.style.display = 'none';
        showSwitcherRef.current.style.marginLeft = '0px';
        showSwitcherRef.current.style.display = 'block';
      }
    }
  }, [switcherVisible]);

  return (
    <>
      <div id="switcher" ref={switcherRef}>
        <div className="content-switcher">
          <h4>COLOR SWITCHER</h4>
          <ul>
            {colors.map(({ img, title }, index) => (
              <li key={index}>
                <a href="#" title={title} className="color" onClick={(e) => {
                  e.preventDefault();
                  setActiveStyleSheet(title);
                }}>
                  <img src={img} alt={title} />
                </a>
              </li>
            ))}
          </ul>

          <h4>TRANSITION DIRECTION</h4>
          <div className="flex justify-between transition-direction">
            {['cornertopleft', 'top', 'cornertopright'].map(id => (
              <div id={id} key={id} onClick={() => handleDirectionClick(id)}>
                <div className={`arrow ${id}`}></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between transition-direction">
            {['left', 'right'].map(id => (
              <div id={id} key={id} onClick={() => handleDirectionClick(id)}>
                <div className={`arrow ${id}`}></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between transition-direction">
            {['cornerbottomleft', 'bottom', 'cornerbottomright'].map(id => (
              <div id={id} key={id} onClick={() => handleDirectionClick(id)}>
                <div className={`arrow ${id}`}></div>
              </div>
            ))}
          </div>

          <span>Navigate between sections to see the effect.</span>
          <div id="hideSwitcher" onClick={toggleSwitcher}>&times;</div>
        </div>
      </div>

      <div id="showSwitcher" ref={showSwitcherRef} className="styleSecondColor" onClick={toggleSwitcher}>
        <i className="fa fa-cog fa-spin"></i>
      </div>

       <header className="header from-lg:fixed from-lg:right-30 from-lg:bottom-0 from-lg:z-30 from-lg:flex from-lg:items-center from-lg:h-[calc(100vh-200px)] from-lg:top-100 from-lg:opacity-100 from-lg:transition from-lg:duration-300 from-lg:[&.hide-header]:z-0 from-lg:[&.hide-header]:opacity-0" id="navbar-collapse-toggle">
        {/* Desktop Navigation */}
        <ul className="icon-menu down-lg:hidden from-md:block uppercase">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleClick(item.id)}
              className={`desktop-nav-element cursor-pointer w-50 h-50 relative flex items-center transition duration-300 my-20 mx-0 rounded-full bg-light-grey dark:bg-black-2  ${activePage === item.id ? 'active' : ''}`}
            >
              <i className={`fa fa-${item.icon} absolute left-0 right-0 mx-auto block text-center top-15 pointer-events-none text-fs-19`}></i>
              <div className="group block p-0 w-50 h-50">
                <h2 className="absolute text-center -z-10 block h-50 pr-25 pl-30 text-fs-15 right-0 opacity-0 text-white leading-lh-50 font-medium transition-all duration-300 rounded-30 group-hover:opacity-100 group-hover:right-27 group-hover:rounded-tl-30 group-hover:rounded-bl-30 group-hover:rounded-tr-none group-hover:rounded-br-none">
                  {item.label}
                </h2>
              </div>
            </li>
          ))}
          <li className='cursor-pointer w-50 h-50'>
            <button onClick={toggleTheme} type="button" className="block down-md:hidden dark-light-btn cursor-pointer w-50 h-50 dark:bg-black-2 bg-light-grey rounded-full ">
              <i className={`fa-solid text-xl ${theme === "dark" ? "fa-sun" : "fa-moon"}`}></i>
            </button>
          </li>
        </ul>

        {/* Mobile Navigation */}
        <nav className="hidden down-md:block relative">
          <div id="menuToggle" className="fixed top-30 right-30 z-50 select-none pt-19 pl-16 w-54 h-54 rounded-5 bg-black-3 xs:right-15 xs:top-4 xs:pb-13 xs:w-49 xs:h-49">
            <input id="inputmobile" className="h-54 w-54 absolute top-0 left-0 opacity-0 z-20 cursor-pointer peer" type="checkbox" />
            <span className="flex h-0.5 w-23 mb-5 relative bg-white z-10 rounded-3 origin-0 custom-transition peer-checked:rotate-45 peer-checked:translate-x-1 peer-checked:translate-y-0"></span>
            <span className="flex h-0.5 w-23 mb-5 relative bg-white z-10 rounded-3 origin-0-100 custom-transition peer-checked:opacity-0 peer-checked:scale-0-2"></span>
            <span className="flex h-0.5 w-23 mb-5 relative bg-white z-10 rounded-3 origin-0-100 custom-transition peer-checked:-rotate-45 peer-checked:translate-x-2 peer-checked:translate-y-2"></span>

            <ul className="fixed m-0 left-0 top-0 w-full h-full pt-60 bg-black-3 -translate-x-full ease-menu-mobile duration-500 peer-checked:transform-none" id="mobile-nav">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleClick(item.id)}
                  className={`mobile-nav-element relative pl-30 ${activePage === item.id ? 'active home-link' : ''}`}
                >
                  <div className="uppercase delay-2000 no-underline relative text-fs-26 xs:text-fs-18 py-14">
                    <i className={`fa fa-${item.icon}`}></i>
                    <span className="absolute left-50 xs:left-35 font-normal">{item.label}</span>
                  </div>
                </li>
              ))}
              <li>
                <button onClick={toggleTheme} type="button" className="dark-light-btn w-[44px] h-[44px] ml-2 dark:bg-black-2 bg-light-grey rounded-full">
                  <i className={`fa-solid text-xl ${theme === "dark" ? "fa-sun" : "fa-moon"}`}></i>
                </button>
              </li>
            </ul>
            
          </div>
        </nav>
       
      </header>
    </>
  );
};

export default Header;