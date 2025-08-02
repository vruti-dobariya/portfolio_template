import React, { useState, useEffect } from 'react';
import homebannerImg from '../assets/img/home-banner.png';
import { Link, useLocation } from 'react-router-dom';
import TypeIt from 'typeit-react';
import Designation from './Designation.jsx';
import defaultBanner from '../assets/img/user_placeholder.jpg';
import { generateVCard } from '../utils/generateVCard';

const Home = () => {
  const [jobTitle, setJobTitle] = useState('');
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
      <section className="page home-banner bg-white" id="home">
        <div className="p-0">
          <div className="grid grid-cols-12 min-h-screen">
            <div className="col-span-12 lg:col-span-3 xl:col-span-4 bg-[#ee9493]">
              <div className="flex items-end home-user-avtar min-h-full">
                <img src={homebannerImg} alt="banner" />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-9 xl:col-span-8">
              <div className="page-scroll">
                <div className="page-content">
                  <div className="lg:min-h-[calc(100vh_-_100px)] flex items-center flex-col justify-center">
                    <div className="home-text w-full">
                      <h6 className="yellow-after">Hello, There</h6>
                      <h1 className="blue-after">I'm <span className="firstName"></span> <span className="lastName"></span></h1>
                      
                      {jobTitle ? (
                        <p>
                          <span id="type-it"><TypeIt options={{ strings: [jobTitle], loop: true }} /></span>
                        </p>
                      ) : (
                        <p>
                          Job Title
                        </p>
                      )}

                      <div className="btn-bar mb-5" onClick={handleDownloadVCF}>
                        <a href="#" className="px-btn px-btn-theme">Save Contact</a>
                      </div>
                      {qrCodeUrl && (
                        <div className="">
                            <img src={qrCodeUrl} alt="QR Code" className="w-[70px] h-[70px] rounded-md border !ml-0" />
                        </div>
                      )}
                    </div>

                    <div className="social-icons flex flex-wrap gap-2">
                      <a href="#" target="_blank" id="webURL"><i className="fa fa-globe"></i></a>
                      <a href="#" target="_blank" id="fbUrl"><i className="fa-brands fa-facebook-f"></i></a>
                      <a href="#" target="_blank" id="twitterURL"><i className="fa-brands fa-twitter"></i></a>
                      <a href="#" target="_blank" id="instaURL"><i className="fa-brands fa-instagram"></i></a>
                      <a href="#" target="_blank" id="linkedInURL"><i className="fa-brands fa-linkedin-in"></i></a>
                      <a href="#" target="_blank" id="whatsappURL"><i className="fa-brands fa-whatsapp"></i></a>
                      <a href="#" target="_blank" id="ytURL"><i className="fa-brands fa-youtube"></i></a>
                      <a href="#" target="_blank" id="pintrestURL"><i class="fa-brands fa-pinterest-p"></i></a>
                      <a href="#" target="_blank" id="threadURL"><i className="fa-brands fa-threads "></i></a>
                      <a href="#" target="_blank" id="tumblrURL"><i class="fa-brands fa-tumblr"></i></a>
                      <a href="#" target="_blank" id="redditURL"><i class="fa-brands fa-reddit"></i></a>
                      <a href="#" target="_blank" id="discordURL"><i class="fa-brands fa-discord"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pass setJobTitle to Designation */}
            <Designation setJobTitle={setJobTitle} />
          </div>
        </div>
        
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
      </section>
    </>
  );
};

export default Home;
