import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Deskmenu from '../components/deskmenu.jsx';
import Slider from 'react-slick';
import { Link, useLocation } from 'react-router-dom';
import Designation from '../components/Designation.jsx';
import Footer from '../components/Footer.jsx';
import about from '../assets/images/about/about.jpg';
import brand from '../assets/images/slider/brand.png';
import brand1 from '../assets/images/slider/brand1.png';
import brand2 from '../assets/images/slider/brand2.png';
import brand3 from '../assets/images/slider/brand3.png';
import brand4 from '../assets/images/slider/brand4.png';
import defaultIcon from '../assets/images/icons/icon.svg'; 
import avatar from '../assets/images/about/avatar.jpg';
import dowanload from '../assets/images/icons/dowanload.png';
import defaultBanner from '../assets/images/user_placeholder.jpg';
import { generateVCard } from '../utils/generateVCard';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const About = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [bannerImg, setBannerImg] = useState(defaultBanner);
  const [userData, setUserData] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
  // Get profile photo
  fetch('admin/getImages')
      .then(res => res.json())
      .then(data => {
      if (data?.status?.success) {
          const path = data.data?.profilePhotoPath;
          if (path) {
          setBannerImg(path);
          }
      }
      })
      .catch(() => setBannerImg(defaultBanner));

  // Get user details
  fetch('admin/getBasicDetails')
      .then(res => res.json())
      .then(data => {
      if (data?.data) {
          setUserData(data.data);
      }
      });
  }, []);

  useEffect(() => {
      if (userData?.firstName && userData?.lastName) {
          const baseUrl = window.location.origin; // auto detects host
          const profilePath = `/`;
          const qrText = `${baseUrl}${profilePath}`;
          const encodedText = encodeURIComponent(qrText);
          const url = `/generateQRCode?text=${encodedText}`;
          setQrCodeUrl(url);
      }
  }, [userData]);

  const handleDownloadVCF = () => {
  generateVCard();
  };

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const brandSliderSettings = {
    dots: false,
    infinite: true,
    speed: 2000,
    autoplaySpeed: 0,
    autoplay: true,
    cssEase: 'linear',
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  useEffect(() => {
    fetch('/otherServices')
      .then((res) => res.json())
      .then((data) => {
        if (data?.status?.success && data?.data?.serviceDTOList) {
          setServices(data.data.serviceDTOList);
        } else {
          console.error('Unexpected data format', data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Hidden image + data for vCard extraction */}
      <div style={{ display: 'none' }}>
          <span id="firstname">{userData?.firstName}</span>
          <span id="lastname">{userData?.lastName}</span>
          <span id="jobTitle">{userData?.jobTitle}</span>
          <span id="primaryMail">{userData?.primaryMail}</span>
          <span id="secondaryMail">{userData?.secondaryMail}</span>
          <span id="primaryContact">{userData?.primaryContact}</span>
          <span id="secondaryContact_contact">{userData?.secondaryContact}</span>
          <span id="cardName">{userData?.cardName || 'My Company'}</span>
          <span id="address">{userData?.address}</span>
          <span id="dob">{userData?.dateOfBirth}</span>
          <img id="profilePhotoPath" src={bannerImg} alt="profile" width="200" />
          <img id="companyLogoPath" src="/logo192.png" alt="logo" width="200" />
      </div>
      <div className="container grid grid-cols-12 md:gap-10 justify-between lg:mt-[220px]">
        {isDesktop && <Sidebar />}
        <div className="col-span-12 lg:col-span-8">
          <Deskmenu />
          <div>
            <div className="lg:rounded-2xl bg-white dark:bg-[#111111]">
              <div className="pt-12 md:py-12 px-3.5 sm:px-5 md:px-10 lg:px-14">
                <h2 className="after-effect after:left-52">About Me</h2>
                <div className="lg:hidden">
                  <div className="w-full mb-6 lg:mb-0 mx-auto relative bg-white text-center dark:bg-[#111111] px-3 rounded-[20px] mt-[180px] md:mt-[220px] lg:mt-0">
                    <img src={bannerImg}
                      className="w-[240px] absolute left-[50%] transform -translate-x-[50%] h-[240px] drop-shadow-xl mx-auto rounded-[20px] -mt-[140px]"
                      alt="about" />
                    <div className="pt-[100px] pb-8">
                      <h2 className="mt-6 mb-1 text-[26px] font-semibold dark:text-white">
                        <span className="firstName" id='firstName'></span> <span className='lastName'></span>
                      </h2>
                      <h3 className="mb-4 text-[#7B7B7B] inline-block dark:bg-[#1D1D1D] px-5 py-1.5 rounded-lg dark:text-[#A6A6A6] jobTitle">
                        Ui/Ux Designer
                      </h3>

                      <div className="flex gap-3 justify-center flex-wrap">
                        <Link target="_blank" id="webURL" to="#"><span className="socialbtn text-[#1773EA]"><i className="fa fa-globe"></i></span></Link>
                        <Link target="_blank" id="fbUrl" to="#"><span className="socialbtn text-[#1C9CEA]"><i className="fa-brands fa-facebook-f"></i></span></Link>
                        <Link target="_blank" id="twitterURL" to="#"><span className="socialbtn text-[#e14a84]"><i className="fa-brands fa-twitter"></i></span></Link>
                        <Link target="_blank" id="instaURL" to="#"><span className="socialbtn text-[#0072b1]"><i className="fa-brands fa-instagram"></i></span></Link>
                        <Link target="_blank" id="linkedInURL" to="#"><span className="socialbtn text-[#0072b1]"><i className="fa-brands fa-linkedin-in"></i></span></Link>
                        <Link target="_blank" id="whatsappURL" to="#"><span className="socialbtn text-[#0072b1]"><i className="fa-brands fa-whatsapp"></i></span></Link>
                        <Link target="_blank" id="ytURL" to="#"><span className="socialbtn text-[#0072b1]"><i className="fa-brands fa-youtube"></i></span></Link>
                        <Link target="_blank" id="pintrestURL" to="#"><span className="socialbtn text-[#0072b1]"><i className="fa fa-pinterest-p"></i></span></Link>
                        <Link target="_blank" id="threadURL" to="#"><span className="socialbtn text-[#0072b1]"><i className="fa-brands fa-threads "></i></span></Link>
                        <Link target="_blank" id="tumblrURL" to="#"><span className="socialbtn text-[#0072b1]"><i className="fa fa-tumblr-square"></i></span></Link>
                        <Link target="_blank" id="redditURL" to="#"><span className="socialbtn text-[#0072b1]"><i className="fa fa-reddit-alien"></i></span></Link>
                      </div>

                      <div className="p-7 rounded-2xl mt-7 bg-[#F3F6F6] dark:bg-[#1D1D1D]">
                        <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] pb-2.5">
                          <span className="socialbtn bg-white dark:bg-black text-[#E93B81] shadow-md"><i className="fa-solid fa-mobile-screen-button"></i></span>
                          <div className="text-left ml-2.5">
                            <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]"> Phone </p>
                            <p className="dark:text-white primaryContact">+123 456 7890</p>
                          </div>
                        </div>
                        <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">
                          <span className="socialbtn bg-white dark:bg-black text-[#6AB5B9] shadow-md"><i className="fa-solid fa-envelope-open-text"></i></span>
                          <div className="text-left ml-2.5 flex-1">
                            <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]"> Email </p>
                            <p className="dark:text-white primaryMail break-all">example@mail.com</p>
                          </div>
                        </div>
                        <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">
                          <span className="socialbtn bg-white dark:bg-black text-[#FD7590] shadow-md"><i className="fa-solid fa-location-dot"></i></span>
                          <div className="text-left ml-2.5 flex-1">
                            <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]"> Location </p>
                            <p className="dark:text-white address break-all">Hong kong china</p>
                          </div>
                        </div>
                        <div className="flex py-2.5">
                          <span className="socialbtn bg-white dark:bg-black text-[#C17CEB] shadow-md"><i className="fa-solid fa-calendar-days"></i></span>
                          <div className="text-left ml-2.5">
                            <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]"> Birthday </p>
                            <p className="dark:text-white dateOfBirth break-all">May 27, 1990</p>
                          </div>
                        </div>
                      </div>
                      <button className="dowanload-btn mb-5" onClick={handleDownloadVCF}>
                          <img className="mr-3" src={dowanload} alt="icon" /> Download CV
                        </button>
                      {qrCodeUrl && (
                          <div className="text-center">
                              <img src={qrCodeUrl} alt="QR Code" className="w-[70px] h-[70px] rounded-md border m-auto" />
                          </div>
                      )}
                      <Designation />
                    </div>
                  </div>
                </div>

                <div className="lg:grid grid-cols-12 md:gap-10 pt-4 md:pt-[30px] items-center hidden">
                  <div className="col-span-12 space-y-2.5">
                    <div className="lg:mr-16">
                      <p className="text-[#44566c] dark:text-color-910 leading-7 description break-all"> I'm Creative Director and UI/UX Designer from Sydney, Australia, working in web development and print media. I enjoy turning complex problems into simple, beautiful and intuitive designs. </p> </div>
                  </div>
                </div>

              </div>

              <div className="pb-12 px-3.5 sm:px-5 md:px-10 lg:px-14">
                <h3 className="text-[35px] dark:text-white font-bold font-robotoSlab pb-5">What I do!</h3>
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
                  {!loading && services.length > 0 ? (
                    services.map((service, index) => {
                      const bgClass = index % 2 === 0 ? 'bg-[#fcf4ff]' : 'bg-[#fefaf0]';
                      const iconSrc = service.serviceIconPath || defaultIcon;
                      return (
                        <div key={service.id} className={`about-box dark:bg-transparent ${bgClass}`}>
                          <img className="w-10 h-10 object-contain block" src={iconSrc} alt="icon" />
                          <div className="space-y-2">
                            <h3 className="dark:text-white text-2xl font-semibold">{service.name || 'No Name'}</h3>
                            <p className="leading-8 text-gray-lite dark:text-[#A6A6A6]">
                              {service.description || 'No description available.'}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-500">Loading services...</p>
                  )}
                </div>
              </div>

              <div className="px-3.5 sm:px-5 md:px-10 lg:px-14 hidden">
                <div className="bg-[#F8FBFB] dark:bg-[#0D0D0D] max-w-full h-auto py-10 rounded-xl mb-5">
                  <h3 className="text-center dark:text-white text-6xl mb-3 font-semibold">Clients</h3>
                  <div className="pt-8 px-2">
                    <Slider {...brandSliderSettings}>
                      {[brand, brand1, brand2, brand3, brand4, brand1, brand2].map((logo, i) => (
                        <div key={i}>
                          <img className="brand-img overflow-hidden mx-auto" src={logo} alt={`brand-${i}`} />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>

              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
