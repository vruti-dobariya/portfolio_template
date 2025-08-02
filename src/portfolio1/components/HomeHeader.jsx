import React, { useEffect, useRef, useState } from 'react';
import logo from '../asset/images/logo/nav-log.png';
import logowhite from '../asset/images/logo/nav-log-white.png';
import DefaultLogo from '../asset/images/logo_refined_transparent.png';

function HomeHeader() {
  const toggleNavRef = useRef(null);
  const lightDarkBtnRef = useRef(null);
  const [logoImg, setLogoImg] = useState(DefaultLogo); 
  
  useEffect(() => {
    const lightToDarkButton = lightDarkBtnRef.current;

    // Handle theme toggle
    const handleThemeToggle = () => {
      const root = document.documentElement;
      const isDark = localStorage.getItem("theme-color") === "dark" || root.classList.contains("dark");

      if (isDark) {
        root.classList.remove("dark");
        localStorage.setItem("theme-color", "light");
        lightToDarkButton?.classList.remove("dark--version");
      } else {
        root.classList.add("dark");
        localStorage.setItem("theme-color", "dark");
        lightToDarkButton?.classList.add("dark--version");
      }
    };
    
    lightToDarkButton?.addEventListener("click", handleThemeToggle);

    return () => {
      lightToDarkButton?.removeEventListener("click", handleThemeToggle);
    };
  }, []);

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
    <header className="header__section header__transparent">
      <div className="container">
        <div className="main__header d-flex justify-content-between align-items-center">
          <div className="main__logo">
            <h1 className="main__logo--title">
              <a className="main__logo--link" href="index-2.html">
                <img className="main__logo--img logo_light md:w-[100px] w-[70px] h-[50px]" src={logoImg} alt="logo-img" />
                <img className="main__logo--img logo_dark  md:w-[100px] w-[70px] h-[50px]" src={logoImg} alt="logo-img" />
              </a>
            </h1>
          </div>
          
          <button className="light__dark--btn" id="light__to--dark" ref={lightDarkBtnRef}>
            <svg className="dark--mode__icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
              <title>Moon</title>
              <path d="M264 480A232 232 0 0132 248c0-94 54-178.28 137.61-214.67a16 16 0 0121.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200 31.34 0 59.57-5.07 81.61-14.67a16 16 0 0121.06 21.06C442.28 426 358 480 264 480z" />
            </svg>
            <svg className="light--mode__icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
              <title>Sunny</title>
              <path d="M256 118a22 22 0 01-22-22V48a22 22 0 0144 0v48a22 22 0 01-22 22zM256 486a22 22 0 01-22-22v-48a22 22 0 0144 0v48a22 22 0 01-22 22zM369.14 164.86a22 22 0 01-15.56-37.55l33.94-33.94a22 22 0 0131.11 31.11l-33.94 33.94a21.93 21.93 0 01-15.55 6.44zM108.92 425.08a22 22 0 01-15.55-37.56l33.94-33.94a22 22 0 1131.11 31.11l-33.94 33.94a21.94 21.94 0 01-15.56 6.45zM464 278h-48a22 22 0 010-44h48a22 22 0 010 44zM96 278H48a22 22 0 010-44h48a22 22 0 010 44zM403.08 425.08a21.94 21.94 0 01-15.56-6.45l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.55 37.56zM142.86 164.86a21.89 21.89 0 01-15.55-6.44l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.56 37.55zM256 358a102 102 0 11102-102 102.12 102.12 0 01-102 102z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;
