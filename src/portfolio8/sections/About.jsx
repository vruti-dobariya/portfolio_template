import { useEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import GradientSpheres from "../components/GradientSpheres";
import { Alien } from "../components/models/Alien";
import TitleHeader from "../components/TitleHeader";
import defaultBanner from "../assets/user_placeholder.jpg";
import downloadIcon from "../assets/dowanload.png";
import { generateVCard } from "../utils/generateVCard";
import flower from '../assets/images/flower.svg';

import "font-awesome/css/font-awesome.min.css";

// Helper to strip HTML
const stripHtml = (html) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

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

const About = () => {
  const [userData, setUserData] = useState(null);
  const [bannerImg, setBannerImg] = useState(defaultBanner);
  const [socialLinks, setSocialLinks] = useState({});
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("admin/getImages")
      .then((res) => res.json())
      .then((data) => {
        if (data?.status?.success) {
          const path = data.data?.profilePhotoPath;
          if (path) setBannerImg(path);
        }
      })
      .catch(() => setBannerImg(defaultBanner));

    fetch("admin/getBasicDetails")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) setUserData(data.data);
      });

    fetch("/social")
      .then((res) => res.json())
      .then((data) => {
        if (data?.status?.success && data.data) {
          setSocialLinks(data.data);
        }
      });
  }, []);

  useEffect(() => {
    fetch("/otherServices")
      .then((res) => res.json())
      .then((data) => {
        if (data?.status?.success && Array.isArray(data.data?.serviceDTOList)) {
          const mapped = data.data.serviceDTOList.map((s) => ({
            name: s.name,
            description: s.description,
            icon: s.serviceIconPath || "",
          }));
          setServices(mapped);
        }
      })
      .catch((err) => console.error("Service fetch error:", err));
  }, []);

  const handleDownloadVCF = () => {
    generateVCard();
  };

  return (
    <>
      {/* Hidden vCard data */}
      {userData && (
        <div style={{ display: "none" }}>
          <span id="firstname">{userData.firstName}</span>
          <span id="lastname">{userData.lastName}</span>
          <span id="jobTitle">{userData.jobTitle}</span>
          <span id="primaryMail">{userData.primaryMail}</span>
          <span id="secondaryMail">{userData.secondaryMail}</span>
          <span id="primaryContact">{userData.primaryContact}</span>
          <span id="secondaryContact_contact">{userData.secondaryContact}</span>
          <span id="cardName">{userData.cardName || "My Company"}</span>
          <span id="address">{userData.address}</span>
          <span id="dob">{userData.dateOfBirth}</span>
          <img id="profilePhotoPath" src={bannerImg} alt="profile" width="200" />
          <img id="companyLogoPath" src="/logo192.png" alt="logo" width="200" />
          {/* Social link IDs for vCard */}
          {Object.keys(iconClassMap).map((key) => (
            <a id={key} href={socialLinks[key]} key={key}></a>
          ))}
        </div>
      )}

      <section id="about" className="flex-center relative md:p-0 px-5">
        <GradientSpheres
          sphere1Class="about-gradient-sphere about-sphere-1"
          sphere2Class="about-gradient-sphere about-sphere-2"
        />

        <div className="container w-full h-full md:my-40 my-20 relative z-10">
          <TitleHeader
            title="About Me"
            number="01"
            text="Passionate Creator, Lifelong Learner"
          />

          <div className="md:mt-20 mt-10">
            <div className="grid grid-cols-12 md:grid-rows-12 gap-5">
              {/* Left Column */}
              <div className="md:col-span-7 col-span-12 row-span-5">
                <div className="bg-black-300 rounded-2xl p-7 w-full h-full">
                  <img
                    src={flower}
                    alt="flower"
                    className="md:w-32 w-16"
                  />
                  <div className="mt-5">
                    <h1 className="text-blue-50 md:text-5xl text-3xl">
                      {(userData?.firstName || "USER").toUpperCase()}{" "}
                      {(userData?.lastName || "").toUpperCase()}
                    </h1>
                    <p className="md:text-2xl mt-2">
                      {userData?.description
                        ? stripHtml(userData.description)
                        : "Description"}
                    </p>
                    <button
                      className="dowanload-btn mt-6 flex items-center gap-2"
                      onClick={handleDownloadVCF}
                    >
                      <img
                        src={downloadIcon}
                        alt="Download Icon"
                        className="w-5 h-5"
                      />
                      Save Contact
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Alien Model */}
              <div className="md:col-span-5 col-span-12 row-span-5">
                <div className="bg-blue-600 hover:cursor-grab rounded-2xl w-full md:h-full h-60">
                  <Canvas>
                    <ambientLight />
                    <OrbitControls enableZoom={false} />
                    <Alien
                      scale={2}
                      position={[0, -5.5, 0]}
                      rotation={[0, -0.5, 0]}
                    />
                  </Canvas>
                </div>
              </div>

              {/* Quote Cards */}
              {/* DESIGN CARDS FROM API */}
              {services.map((service, index) => (
                <div
                  key={index}
                  className="md:col-span-6 col-span-12 row-span-3"
                >
                  <div className="bg-black-300 rounded-2xl p-7 w-full h-full">
                    <div className="flex flex-col h-full justify-center gap-2">
                      <h1 className="gradient-title md:text-3xl text-2xl font-medium">
                        {service.name}
                      </h1>
                      <p className="md:text-2xl max-w-96">
                        {stripHtml(service.description)}
                      </p>
                      {service.icon && (
                        <img
                          src={service.icon}
                          alt={service.name}
                          className="w-12 h-12 mt-2"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="md:col-span-4 col-span-12 row-span-4">
                <div className="bg-black-300 rounded-2xl p-7 h-full flex flex-col justify-evenly">
                  <h1 className="gradient-title md:text-5xl text-3xl font-bold">
                    BE YOURSELF!
                  </h1>
                  <h1 className="gradient-title md:text-5xl text-3xl font-bold">
                    BE DIFFERENT!
                  </h1>
                  <h1 className="gradient-title md:text-5xl text-3xl font-bold">
                    BUILD DIFFERENT!
                  </h1>
                </div>
              </div>

              {/* Social Cards */}
              {Object.entries(socialLinks).map(([key, value], index) => {
                if (!value) return null;
                const icon = iconClassMap[key] || "fa-link";
                const label = key.replace("URL", "").replace(/([A-Z])/g, " $1").trim();

                return (
                  <div
                    key={index}
                    className="md:col-span-4 col-span-12 row-span-2"
                  >
                    <a
                      href={value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black-300 rounded-2xl p-7 w-full h-full group cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-5">
                        <i className={`fa ${icon} text-white text-3xl`} />
                        <h1 className="gradient-title text-xl font-medium">
                          {label}
                        </h1>
                      </div>
                      <div className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
                        <i className="fa fa-arrow-up-right-from-square text-white text-xl" />
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
