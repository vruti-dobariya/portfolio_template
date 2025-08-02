import React, { useEffect, useState } from 'react';
import defaultBanner from '../assets/images/user_placeholder.jpg';
import { generateVCard } from '../utils/generateVCard';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Sidebar = () => {
  const [bannerImg, setBannerImg] = useState(defaultBanner);
  const [userData, setUserData] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    fetch('/admin/getImages')
      .then((res) => res.json())
      .then((data) => {
        if (data?.status?.success && data.data?.profilePhotoPath) {
          setBannerImg(data.data.profilePhotoPath);
        }
      })
      .catch(() => setBannerImg(defaultBanner));

    fetch('/admin/getBasicDetails')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) setUserData(data.data);
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
      {/* Hidden fields for vCard */}
      <div className="hidden">
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
        <img id="profilePhotoPath" src={bannerImg} alt="profile" />
        <img id="companyLogoPath" src="/logo192.png" alt="logo" />
      </div>

      {/* Sidebar UI */}
      <div className="w-full lg:w-1/2 bg-[#214734] text-white flex flex-col items-center justify-center p-10 lg:fixed lg:top-0 lg:right-0 lg:h-full">
        <div className="text-center">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">
            {userData?.firstName || ''} {userData?.lastName || ''}
          </h1>
          <img
            src={bannerImg}
            alt="User"
            className="rounded-full mx-auto mb-6 w-60 h-60 object-cover"
            onError={(e) => (e.target.src = defaultBanner)}
          />
          <h2 className="text-lg font-medium">
            {userData?.occupation || 'Occupation'} and <br />
            {userData?.jobTitle || 'Job Title'}
          </h2>

          <button
            className="hidden flex items-center gap-2 bg-[#0072b1] text-white px-4 py-2 rounded-md mt-4 hover:bg-[#005c91] transition-all  m-auto"
            onClick={handleDownloadVCF}
          >
            <i className="fas fa-download" />
            Save Contact
          </button>

          {qrCodeUrl && (
            <div className="mt-6">
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="w-[70px] h-[70px] rounded-md border border-gray-300 m-auto"
              />
            </div>
          )}

          <div className="social-icons flex flex-wrap gap-2 justify-center mt-6">
            <a href="#" target="_blank" className='bg-white p-2 rounded-full h-8 w-8 justify-center' id="webURL"><i className="text-black fa fa-globe"></i></a>
            <a href="#" target="_blank" className='bg-white p-2 rounded-full h-8 w-8 justify-center' id="fbUrl"><i className="text-black fa-brands fa-facebook-f"></i></a>
            <a href="#" target="_blank" className='bg-white p-2 rounded-full h-8 w-8 justify-center' id="twitterURL"><i className="text-black fa-brands fa-twitter"></i></a>
            <a href="#" target="_blank" className='bg-white p-2 rounded-full h-8 w-8 justify-center' id="instaURL"><i className="text-black fa-brands fa-instagram"></i></a>
            <a href="#" target="_blank" className='bg-white p-2 rounded-full h-8 w-8 justify-center' id="linkedInURL"><i className="text-black fa-brands fa-linkedin-in"></i></a>
            <a href="#" target="_blank" className='bg-white p-2 rounded-full h-8 w-8 justify-center' id="whatsappURL"><i className="text-black fa-brands fa-whatsapp"></i></a>
            <a href="#" target="_blank" className='bg-white p-2 rounded-full h-8 w-8 justify-center' id="ytURL"><i className="text-black fa-brands fa-youtube"></i></a>
            <a href="#" target="_blank" className='bg-white p-2 rounded-full h-8 w-8 justify-center' id="pintrestURL"><i class="text-black fa-brands fa-pinterest-p"></i></a>
            <a href="#" target="_blank" className='bg-white p-2 rounded-full h-8 w-8 justify-center' id="threadURL"><i className="text-black fa-brands fa-threads "></i></a>
            <a href="#" target="_blank" className='bg-white p-2 rounded-full h-8 w-8 justify-center' id="tumblrURL"><i class="text-black fa-brands fa-tumblr"></i></a>
            <a href="#" target="_blank" className='bg-white p-2 rounded-full h-8 w-8 justify-center' id="redditURL"><i class="text-black fa-brands fa-reddit"></i></a>
            <a href="#" target="_blank" className='bg-white p-2 rounded-full h-8 w-8 justify-center' id="discordURL"><i class="text-black fa-brands fa-discord"></i></a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
