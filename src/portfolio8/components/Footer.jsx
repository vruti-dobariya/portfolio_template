import React, { useEffect, useState } from "react";
import DefaultLogo from "../assets/logo_refined_transparent.png";
import "font-awesome/css/font-awesome.min.css";

const iconClassMap = {
  fbUrl: "fa-facebook",
  twitterURL: "fa-twitter",
  instaURL: "fa-instagram",
  whatsappURL: "fa-whatsapp",
  linkedInURL: "fa-linkedin",
  webURL: "fa-globe",
  ytURL: "fa-youtube",
  pintrestURL: "fa-pinterest",
  tiktokURL: "fa-music",
  tumblrURL: "fa-tumblr",
  threadURL: "fa-comments",
  redditURL: "fa-reddit",
};

const Footer = () => {
  const [socialLinks, setSocialLinks] = useState({});
  const [logoImg, setLogoImg] = useState(DefaultLogo);

  useEffect(() => {
    // Get company logo
    fetch("admin/getImages")
      .then((res) => res.json())
      .then((data) => {
        if (data?.status?.success) {
          const logoPath = data.data?.companyLogoPath;
          setLogoImg(logoPath || DefaultLogo);
        }
      })
      .catch(() => setLogoImg(DefaultLogo));

    // Get social links
    fetch("/social")
      .then((res) => res.json())
      .then((data) => {
        if (data?.status?.success && data.data) {
          setSocialLinks(data.data);
        }
      });
  }, []);

  return (
    <div className="w-full flex-center flex-col md:gap-10 gap-7 bg-black-300 py-10">
      {/* Logo */}
      <div>
        <img
          src={logoImg}
          alt="logo"
          className="w-10 h-10 object-contain object-center rounded-full bg-white p-1"
        />
      </div>

      {/* Social Media Icons */}
      <div className="flex items-center md:gap-16 gap-8">
        {Object.entries(iconClassMap).map(([key, iconClass]) => {
          const url = socialLinks[key];
          if (!url) return null;

          return (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:-translate-y-3 transition-all duration-500 text-white-50 text-2xl"
            >
              <i className={`fa ${iconClass}`} aria-hidden="true"></i>
            </a>
          );
        })}
      </div>

      {/* Footer Note */}
      <p className="font-regular md:text-lg text-sm text-white-50">
       Developed with by <span><a className="text__secondary" href="https://iconictap.com/">Iconic Tap</a></span> © 2025
      </p>
    </div>
  );
};

export default Footer;
