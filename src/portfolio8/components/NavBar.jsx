import React, { useEffect, useState } from "react";
import DefaultLogo from "../assets/logo_refined_transparent.png";
import { navItems } from "../constants";

const NavBar = () => {
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [logoImg, setLogoImg] = useState(DefaultLogo);

  useEffect(() => {
    fetch("admin/getImages")
      .then((res) => res.json())
      .then((data) => {
        if (data?.status?.success) {
          const logoPath = data.data?.companyLogoPath;
          setLogoImg(logoPath || DefaultLogo);
        }
      })
      .catch(() => setLogoImg(DefaultLogo));
  }, []);

  return (
    <div className="w-full flex-center fixed z-50 top-0 left-0 md:p-0 px-5">
      <div className="container md:my-10 my-5 flex items-center justify-between">
        <img
          src={logoImg}
          alt="logo"
          className="md:w-[150px] size-10 object-contain object-center"
        />
        <div className="md:flex items-center gap-7 hidden">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="relative after:absolute after:bg-gray-200 after:bottom-0 after:left-0 after:h-[2px]
               after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left
                hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300"
            >
              <a className="gradient-title text-lg" href={item.href}>
                {item.name}
              </a>
            </div>
          ))}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={scrollToContact}
              className="relative bg-pink-100 text-white font-semibold py-2 px-5 rounded-full shadow-lg
              transition-all duration-300 border-2 border-pink-100 hover:bg-transparent hover:text-pink-100
              hover:border-pink-100 text-base overflow-hidden group"
            >
              <span className="relative z-10">Hire Me</span>
              <div className="absolute inset-0 bg-pink-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
