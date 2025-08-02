import React, { useEffect, useRef, useState } from 'react';
import DefaultLogo from '../assets/img/logo_refined_transparent.png';


  const Header = ({ menuOpen, setMenuOpen, setCurrentPageIndex }) => {
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    const scrollToSection = (e, href, index) => {
    e.preventDefault();

    setCurrentPageIndex(index);
    setMenuOpen(false);

    const section = document.querySelector(href);
    if (section) {
      // Safer scroll offset for fixed header
      const offsetTop = section.getBoundingClientRect().top + window.scrollY - 50;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Resume', href: '#resume' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact Me', href: '#contact' },
  ];

  const [logoImg, setLogoImg] = useState(DefaultLogo); 

  useEffect(() => {
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

  return (
    <>
      <header className="header theme-bg">
        <div className="logo">                
          <img className=" md:w-[100px] w-[70px] h-[50px] object-contain" src={logoImg} alt="logo-img" />
        </div>
        <div className="menu-toggle">
          <button
            className={`menu-button ${menuOpen ? 'menu-button--open' : ''}`}
            onClick={toggleMenu}
          >
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </header>

      <nav className={`pages-nav ${menuOpen ? 'pages-nav--open' : ''}`}>
        {navItems.map((item, index) => (
          <div key={index} className="pages-nav__item">
            <a
              href={item.href}
              className="link link--page"
              onClick={(e) => scrollToSection(e, item.href, index)}
            >
              {item.name}
            </a>
          </div>
        ))}
      </nav>
    </>
  );
};

export default Header;
