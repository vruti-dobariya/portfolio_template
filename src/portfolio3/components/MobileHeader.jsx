import React from 'react';
import logo from '../assets/img/logo.svg';

const MobileHeader = () => (
  <div className="mobile-header flex lg:hidden">
    <div className="logo">
      <a href="#"><img src={logo} alt="Logo" /></a>
    </div>
    <button className="ml-auto mobile_toggle w-[40px] flex flex-col">
      <span className="w-[25px] h-[2px] bg-slate-900 dark:bg-white"></span>
      <span className="w-[25px] h-[2px] bg-slate-900 dark:bg-white my-[5px]"></span>
      <span className="w-[25px] h-[2px] bg-slate-900 dark:bg-white"></span>
    </button>
  </div>
);

export default MobileHeader;
