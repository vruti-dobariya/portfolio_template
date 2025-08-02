import React, { useState, useEffect } from 'react';
import profileImage from '../asset/images/hero/profile-image.png';
import { Link } from 'react-router-dom';
import Designation from '../components/Designation.jsx';
import user_placeholder from '../asset/images/user_placeholder.jpg';
import { generateVCard } from '../utils/generateVCard';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Home() {
    const [bannerImg, setBannerImg] = useState(user_placeholder);
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
        .catch(() => setBannerImg(user_placeholder));

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
      // Check if user data is available
      if (!userData) return;

      // Prepare the vCard data
      const vCard = `
  BEGIN:VCARD
  VERSION:3.0
  FN:${userData.firstName} ${userData.lastName}
  ORG:${userData.cardName || 'My Company'}
  TEL;TYPE=CELL:${userData.primaryContact}
  TEL;TYPE=HOME:${userData.secondaryContact}
  EMAIL:${userData.primaryMail}
  EMAIL;TYPE=SECONDARY:${userData.secondaryMail}
  ADR;TYPE=HOME:${userData.address}
  BDAY:${userData.dateOfBirth}
  PHOTO;VALUE=URI:${bannerImg}
  END:VCARD
      `;

      // Create a Blob object with the vCard data
      const blob = new Blob([vCard], { type: 'text/vcard' });

      // Create an invisible download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${userData.firstName}-${userData.lastName}.vcf`;  // Set the file name
      document.body.appendChild(link); // Append the link to the body
      link.click();  // Trigger the download
      document.body.removeChild(link); // Clean up the DOM
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
      <main className="main__content_wrapper">
        <div className="hero__section">
          <div className="container">
            <div className="hero__section--inner2 d-flex align-items-center justify-content-center">
              <div className="hero__section--left d-flex align-items-center">
                <div className="hero__profile position__relative">
                  <div className="hero__profile--topbar position__relative">
                    <div className="hero__profile--thumbnail">
                      <img className="hero__profile--thumbnail__media" id="profilePhotoPath" src={bannerImg} alt="img" />
                    </div>
                    <div className="hero__profile--text">
                      <h2 className="hero__profile--title">
                        <span className="firstName" id="firstName"></span> <span className="lastName" id="lastName"></span>
                      </h2>
                      <span className="hero__profile--subtitle jobTitle" id="jobTitle"></span>
                    </div>
                  </div>
                  <ul className="hero__profile--info position__relative">
                    <li className="hero__profile--info__list">
                      <span className="hero__profile--info__icon"><svg className="max-w-5" width="16" height="34" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"></path></svg></span>
                      <a className="hero__profile--info__text primaryContact" id="primaryContact" href="tel:+01215656855">+01215656855</a>
                    </li>
                    <li className="hero__profile--info__list">
                      <span className="hero__profile--info__icon"><svg className="max-w-5" xmlns="http://www.w3.org/2000/svg" width="16" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></span>
                      <a className="hero__profile--info__text primaryMail" id="primaryMail" href="mailto:example@gmail.com">example@gmail.com</a>
                    </li>
                    <li className="hero__profile--info__list">
                      <span className="hero__profile--info__icon"><svg className="max-w-5" width="16" height="34" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"></path></svg></span>
                      <span className="hero__profile--info__text address" id="address">fulbariFranciso,4200.</span>
                    </li>
                  </ul>
                </div>
                <div className="hero__content hero__profile--content">
                  <span className="hero__content--subtitle text__secondary mb-10">HELLO  I'M</span>
                  <h2 className="hero__content--title mb-15">
                    <span className="firstName"></span> <span className="lastName"></span>
                  </h2>
                  <h3 className="hero__content--subtitle2 mb-20 occupation" id="occupation">UX/UI Designer and Developer</h3>
                  <p className="hero__content--desc mb-30 description" id="description">test There are many variations of sum availabled in alley of type and scrambled it some.</p>
                       
                  <div className="social__share style2 d-flex align-items-center mb-5 flex-wrap">
                    <span className="social__share--title">Follow Me: </span>
                    <div className="social__share--wrapper d-flex flex-wrap">
                      <a className="social__share--link fa-icon fa-icon-2x" id="webURL" href="#" title="">
                        <i className="fa fa-globe"></i>
                      </a>
                      <a className="social__share--link fa-icon fa-icon-2x" id="fbUrl" href="#" title="">
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>
                      <a className="social__share--link fa-icon fa-icon-2x" id="twitterURL" href="#" title="">
                        <i className="fa-brands fa-twitter"></i>
                      </a>
                      <a className="social__share--link fa-icon fa-icon-2x" id="instaURL" href="#" title="">
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                      <a className="social__share--link fa-icon fa-icon-2x" id="linkedInURL" href="#" title="">
                        <i className="fa-brands fa-linkedin-in"></i>
                      </a>
                      <a className="social__share--link fa-icon fa-icon-2x" id="whatsappURL" href="#" title="">
                        <i className="fa-brands fa-whatsapp"></i>
                      </a>
                      <a className="social__share--link fa-icon fa-icon-2x" id="ytURL" href="#" title="">
                        <i className="fa-brands fa-youtube"></i>
                      </a>
                      <a className="social__share--link fa-icon fa-icon-2x" id="pintrestURL" href="#" title="">
                        <i class="fa-brands fa-pinterest-p"></i>
                      </a>
                      <a className="social__share--link fa-icon fa-icon-2x" id="threadURL" href="#" title="">
                        <i className="fa-brands fa-threads"></i>
                      </a>
                      <a className="social__share--link fa-icon fa-icon-2x" id="tumblrURL" href="#" title="">
                        <i class="fa-brands fa-tumblr"></i>
                      </a>
                      <a className="social__share--link fa-icon fa-icon-2x" id="redditURL" href="#" title="">
                       <i class="fa-brands fa-reddit"></i>
                      </a>
                      <a className="social__share--link fa-icon fa-icon-2x" id="discordURL" href="#" title="">
                       <i class="fa-brands fa-discord"></i>
                      </a>
                    </div>
                  </div>

                  <button className="primary__btn download__btn mb-30" onClick={handleDownloadVCF}>
                      <svg className="download__btn--svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                      Save Contact
                  </button>

                  {qrCodeUrl && (
                    <div className="text-center qrcode">
                        <img src={qrCodeUrl} alt="QR Code" className="w-[70px] h-[70px] rounded-md borde" />
                    </div>
                  )}

                  <Designation />
                </div>
              </div>
               <div className="home__navigation--menu">
                  <nav>
                      <ul className="home__navigation--menu__wrapper">
                          <li className="home__navigation--menu__items">
                              <Link to="/" className="home__navigation--menu__link">
                                  <span className="home__navigation--menu__text">HOME</span>
                                  <span className="home__navigation--menu__icon"><svg width="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"></path></svg></span>
                              </Link>
                          </li>
                          <li className="home__navigation--menu__items">
                              <Link to="/about" className="home__navigation--menu__link">
                                  <span className="home__navigation--menu__text">ABOUT</span>
                                  <span className="home__navigation--menu__icon"><svg className="text-accent1" width="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg></span>
                              </Link>
                          </li>
                          <li className="home__navigation--menu__items">
                              <Link to="/service" className="home__navigation--menu__link">
                                  <span className="home__navigation--menu__text">SERVICES</span>
                                  <span className="home__navigation--menu__icon"><svg className="text-accent1" width="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z"></path></svg></span>
                              </Link>
                          </li>
                          <li className="home__navigation--menu__items">
                              <Link to="/portfolio" className="home__navigation--menu__link">
                                  <span className="home__navigation--menu__text">PORTFOLIO</span>
                                  <span className="home__navigation--menu__icon"><svg className="text-accent1" width="16" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z"></path></svg></span>
                              </Link>
                          </li>
                          <li className="home__navigation--menu__items">
                              <Link to="/blog" className="home__navigation--menu__link">
                                  <span className="home__navigation--menu__text">BLOG</span>
                                  <span className="home__navigation--menu__icon"><svg className="text-accent1" width="16" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M446.6 222.7c-1.8-8-6.8-15.4-12.5-18.5-1.8-1-13-2.2-25-2.7-20.1-.9-22.3-1.3-28.7-5-10.1-5.9-12.8-12.3-12.9-29.5-.1-33-13.8-63.7-40.9-91.3-19.3-19.7-40.9-33-65.5-40.5-5.9-1.8-19.1-2.4-63.3-2.9-69.4-.8-84.8.6-108.4 10C45.9 59.5 14.7 96.1 3.3 142.9 1.2 151.7.7 165.8.2 246.8c-.6 101.5.1 116.4 6.4 136.5 15.6 49.6 59.9 86.3 104.4 94.3 14.8 2.7 197.3 3.3 216 .8 32.5-4.4 58-17.5 81.9-41.9 17.3-17.7 28.1-36.8 35.2-62.1 4.9-17.6 4.5-142.8 2.5-151.7zm-322.1-63.6c7.8-7.9 10-8.2 58.8-8.2 43.9 0 45.4.1 51.8 3.4 9.3 4.7 13.4 11.3 13.4 21.9 0 9.5-3.8 16.2-12.3 21.6-4.6 2.9-7.3 3.1-50.3 3.3-26.5.2-47.7-.4-50.8-1.2-16.6-4.7-22.8-28.5-10.6-40.8zm191.8 199.8l-14.9 2.4-77.5.9c-68.1.8-87.3-.4-90.9-2-7.1-3.1-13.8-11.7-14.9-19.4-1.1-7.3 2.6-17.3 8.2-22.4 7.1-6.4 10.2-6.6 97.3-6.7 89.6-.1 89.1-.1 97.6 7.8 12.1 11.3 9.5 31.2-4.9 39.4z"></path></svg></span>
                              </Link>
                          </li>
                          <li className="home__navigation--menu__items">
                              <Link to="/contact" className="home__navigation--menu__link">
                                  <span className="home__navigation--menu__text">CONTACT</span>
                                  <span className="home__navigation--menu__icon"><svg className="text-accent1" width="16" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM208 288h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H144c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm96-96c0 35.3-28.7 64-64 64s-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z"></path></svg></span>
                              </Link>
                          </li>
                      </ul>
                  </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
