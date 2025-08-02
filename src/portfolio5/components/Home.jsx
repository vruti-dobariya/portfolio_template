import React, { useEffect, useState } from 'react';
import bannerImgMobile from '../assets/img/dark-img-mobile.jpg';
import Designation from './Designation.jsx';
import defaultBanner from '../assets/img/user_placeholder.jpg';
import { generateVCard } from '../utils/generateVCard';

const Home = () => {
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

      <div className="bg-accent fixed w-full h-[200%] -rotate-15 -top-1/2 -left-[83%] hidden from-lg:block"></div>

      <div className="flex items-center h-screen w-full down-lg:mx-auto down-lg:justify-center xs:text-left down-lg:text-center">
        {bannerImg && (
          <img
            className="hidden from-lg:block fixed w-1/3 h-[calc(100vh-80px)] left-40 top-40 rounded-[30px] shadow-1 object-cover"
            src={bannerImg}
            alt="Banner"
          />
        )}

        <div className="from-lg:ml-100/3 from-lg:w-2/3">
          <div className="mx-auto max-w-[550px] custom-md-1:max-w-[450px]">
            <img
              src={bannerImg}
              className="hidden down-lg:block xs:hidden rounded-full w-[270px] h-[270px] mx-auto mb-[25px] border-4 border-solid border-black-3"
              alt="Mobile Banner"
            />

            <h1 className="text-[42px] text-accent font-Poppins relative uppercase font-bold leading-lh-62 pl-70 before:absolute before:left-0 before:top-29 before:h-4 before:w-40 before:rounded-10 custom-md-2:text-fs-42 down-xl:before:hidden down-xl:pl-0 custom-md-2:leading-lh-52 down-md:text-fs-38 down-md:leading-lh-48 down-md:mt-29 down-md:mb-13 xs:text-fs-29 xs:leading-lh-39 xs:mt-18">
              I'm <span className="firstName">{userData?.firstName}</span> <span className="lastName">{userData?.lastName}</span>.
              <span className="block dark:text-white text-black jobTitle">{userData?.jobTitle || 'Web Designer'}</span>
            </h1>

            <p className="description font-Open-sans mt-[15px] mb-[28px] leading-[35px] down-lg:mt-[10px] down-lg:mb-[23px] down-lg:text-[15px] down-lg:leading-[30px] text-black">
              I'm a Tunisian-based web designer & front‑end developer focused on crafting clean & user‑friendly experiences. I’m passionate about building excellent software that improves the lives of those around me.
            </p>

            <div className='flex items-center gap-7 flex-wrap'> 
              <div
                id="link-about"
                onClick={handleDownloadVCF}
                className="button cursor-pointer overflow-hidden inline-block leading-[1.4] rounded-[30px] text-center align-middle select-none transition-all duration-250 ease-in-out uppercase no-underline relative z-10 py-[16px] pr-[70px] pl-[35px] text-[15px] font-semibold text-white bg-transparent outline-0 before:absolute before:-z-10 before:left-0 before:right-0 before:top-0 before:bottom-0 before:translate-x-full hover:before:translate-x-0 before:transition before:duration-300 before:ease-out"
              >
                <span className="relative z-20 text-black">Save Contact</span>
                <span className="!flex absolute -right-px bottom-0 w-55 h-55 items-center justify-center rounded-full text-white text-fs-19 fa fa-arrow-right bg-accent "></span>
              </div>
              {/* QR Code section */}
              {qrCodeUrl && (
                <div className="">
                  <img src={qrCodeUrl} alt="QR Code" className="w-[100px] h-[100px] rounded-md border" />
                </div>
              )}
            </div>

            <Designation />
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
