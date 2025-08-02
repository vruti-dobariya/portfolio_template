import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import avatar from '../assets/images/about/avatar.jpg';
import dowanload from '../assets/images/icons/dowanload.png';
import Designation from '../components/Designation.jsx';
import defaultBanner from '../assets/images/user_placeholder.jpg';
import { generateVCard } from '../utils/generateVCard';

const Sidebar = () => {
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
    // Generate QR code once user data is available
    if (userData?.firstName && userData?.lastName) {
        const qrText = `Name: ${userData.firstName} ${userData.lastName}, Email: ${userData.primaryMail}`;
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
        <div className="col-span-12 lg:col-span-4 hidden lg:block h-fit sticky top-44">
            <div
                className="w-full mb-6 lg:mb-0 mx-auto relative bg-white text-center dark:bg-[#111111] px-6 rounded-[20px] mt-[180px] md:mt-[220px] lg:mt-0">

                <img src={bannerImg}
                    className="w-[240px] absolute left-[50%] transform -translate-x-[50%] h-[240px] drop-shadow-xl mx-auto rounded-[20px] -mt-[140px]"
                    alt="about" />
                <div className="pt-[100px] pb-8">
                    <h2 className="mt-6 mb-1 text-[26px] font-semibold dark:text-white"> 
                        <span className="firstName" id='firstName'></span> <span className='lastName'></span> 
                    </h2>
                    <h3
                        className="mb-4 text-[#7B7B7B] inline-block dark:bg-[#1D1D1D] px-5 py-1.5 rounded-lg dark:text-[#A6A6A6] jobTitle">
                        Ui/Ux Designer </h3>
                    <div className="flex gap-3 justify-center flex-wrap">
                        <Link target="_blank" id="webURL" to="#">
                            <span className="socialbtn text-[#1773EA]">
                                <i className="fa fa-globe"></i>
                            </span>
                        </Link>
                        <Link  target="_blank" id="fbUrl" to="#">
                            <span className="socialbtn text-[#1C9CEA]">
                                <i className="fa-brands fa-facebook-f"></i>
                            </span>
                        </Link>
                        <Link target="_blank" id="twitterURL" to="#">
                            <span className="socialbtn text-[#e14a84]">
                                <i className="fa-brands fa-twitter"></i>
                            </span>
                        </Link>
                        <Link target="_blank" id="instaURL" to="#">
                            <span className="socialbtn text-[#0072b1]">
                                <i className="fa-brands fa-instagram"></i>
                            </span>
                        </Link>
                        <Link target="_blank" id="linkedInURL" to="#">
                            <span className="socialbtn text-[#0072b1]">
                                <i className="fa-brands fa-linkedin-in"></i>
                            </span>
                        </Link>
                        <Link target="_blank" id="whatsappURL" to="#">
                            <span className="socialbtn text-[#0072b1]">
                                <i className="fa-brands fa-whatsapp"></i>
                            </span>
                        </Link>
                        <Link target="_blank" id="ytURL" to="#">
                            <span className="socialbtn text-[#0072b1]">
                                <i className="fa-brands fa-youtube"></i>
                            </span>
                        </Link>
                        <Link target="_blank" id="pintrestURL" to="#">
                            <span className="socialbtn text-[#0072b1]">
                                <i class="fa-brands fa-pinterest-p"></i>
                            </span>
                        </Link>
                        <Link target="_blank" id="threadURL" to="#">
                            <span className="socialbtn text-[#0072b1]">
                                <i className="fa-brands fa-threads"></i>
                            </span>
                        </Link>
                       <Link target="_blank" id="tumblrURL" to="#">
                            <span className="socialbtn text-[#0072b1]">
                                <i class="fa-brands fa-tumblr"></i>
                            </span>
                        </Link>
                        <Link target="_blank" id="redditURL" to="#">
                            <span className="socialbtn text-[#0072b1]">
                                <i class="fa-brands fa-reddit"></i>
                            </span>
                        </Link>
                        <Link target="_blank" id="discordURL" to="#">
                            <span className="socialbtn text-[#0072b1]">
                                <i class="fa-brands fa-discord"></i>
                            </span>
                        </Link>
                    </div>
                    <div className="p-7 rounded-2xl mt-7 bg-[#F3F6F6] dark:bg-[#1D1D1D]">
                        <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] pb-2.5">
                            <span className="socialbtn px-2.5 bg-white dark:bg-black text-[#E93B81] shadow-md">
                                <i className="fa-solid fa-mobile-screen-button"></i>
                            </span>
                            <div className="text-left ml-2.5">
                                <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]"> Phone </p>
                                <p className="dark:text-white primaryContact">+123 456 7890</p>
                            </div>
                        </div>
                        <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">
                            <span className="socialbtn px-2.5 bg-white dark:bg-black text-[#6AB5B9] shadow-md">
                                <i className="fa-solid fa-envelope-open-text"></i>
                            </span>
                            <div className="text-left ml-2.5">
                                <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]"> Email </p>
                                <p className="dark:text-white primaryMail break-all">example@mail.com</p>
                            </div>
                        </div>
                        <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">
                            <span className="socialbtn px-2.5 bg-white dark:bg-black text-[#FD7590] shadow-md">
                                <i className="fa-solid fa-location-dot"></i>
                            </span>
                            <div className="text-left ml-2.5 flex-1">
                                <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]"> Location </p>
                                <p className="dark:text-white address break-all">Hong kong china</p>
                            </div>
                        </div>
                        <div className="flex py-2.5">
                            <span className="socialbtn px-2.5 bg-white dark:bg-black text-[#C17CEB] shadow-md">
                                <i className="fa-solid fa-calendar-days"></i>
                            </span>
                            <div className="text-left ml-2.5">
                                <p className="text-xs text-[#44566C] dark:text-[#A6A6A6]"> Birthday </p>
                                <p className="dark:text-white dateOfBirth break-all">May 27, 1990</p>
                            </div>
                        </div>
                    </div>
                    <Designation />
                    <button className="dowanload-btn mb-5" onClick={handleDownloadVCF}>
                        <img className="mr-3" src={dowanload} alt="icon" /> Save Contact
                     </button>
                    {qrCodeUrl && (
                        <div className="text-center">
                            <img src={qrCodeUrl} alt="QR Code" className="w-[70px] h-[70px] rounded-md border m-auto" />
                        </div>
                    )}
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default Sidebar
