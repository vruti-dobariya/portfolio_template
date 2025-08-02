import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/images/about/avatar.jpg';
import dowanload from '../assets/images/icons/dowanload.png';
import Designation from '../components/Designation.jsx';
import { generateVCard } from '../utils/generateVCard';
import defaultBanner from '../assets/images/user_placeholder.jpg';

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
      {/* Hidden data for vCard generation */}
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

      <div className="flex flex-col items-center justify-center h-[100vh] aos-init aos-animate lg:mt-0 mt-[50px]"  data-aos="fade">
        <img
          className="rounded-full w-[200px] h-[200px] 2xl:w-[280px] 2xl:h-[280px] object-cover"
          src={bannerImg}
          alt="User Avatar"
        />

        <h3 className="mt-6 mb-1 text-5xl font-semibold dark:text-white">
          {userData?.firstName || ''} {userData?.lastName || ''}
        </h3>
        <p className="mb-4 text-[#7B7B7B]">{userData?.jobTitle || 'UI/UX Designer'}</p>

        <div className="flex gap-3 flex-wrap justify-center">
          {[
            { id: 'webURL', icon: 'fa-globe', url: 'https://mywebsite.com' },
            { id: 'fbUrl', icon: 'fa-facebook-f', url: 'https://facebook.com/myprofile' },
            { id: 'twitterURL', icon: 'fa-twitter', url: 'https://twitter.com/myprofile' },
            { id: 'instaURL', icon: 'fa-instagram', url: 'https://instagram.com/myprofile' },
            { id: 'linkedInURL', icon: 'fa-linkedin-in', url: 'https://linkedin.com/in/myprofile' },
            { id: 'whatsappURL', icon: 'fa-whatsapp', url: 'https://wa.me/1234567890' },
            { id: 'ytURL', icon: 'fa-youtube', url: 'https://youtube.com/mychannel' },
            { id: 'pintrestURL', icon: 'fa-pinterest-p', url: 'https://pinterest.com/myprofile' },
            { id: 'tumblrURL', icon: 'fa-tumblr', url: 'https://tumblr.com/myprofile' },
            { id: 'redditURL', icon: 'fa-reddit-alien', url: 'https://reddit.com/u/myprofile' },
            { id: 'threadURL', icon: 'fa-threads', url: '#' },
            { id: 'discordURL', icon: 'fa-discord', url: 'https://discord.com/' }
          ].map((social, idx) => (
            <Link key={idx} to={social.url} target="_blank" id={social.id}>
              <span className="socialbtn text-[#0072b1]">
                <i className={`fa-brands ${social.icon}`}></i>
              </span>
            </Link>
          ))}
        </div>

        <Designation />

        <button className="dowanload-btn mt-6 flex items-center gap-2" onClick={handleDownloadVCF}>
          <img src={dowanload} alt="Download Icon" className="w-5 h-5" />
         Save Contact
        </button>

        {qrCodeUrl && (
          <div className="mt-4">
            <img src={qrCodeUrl} alt="QR Code" className="w-[100px] h-[100px] rounded-md border" />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
