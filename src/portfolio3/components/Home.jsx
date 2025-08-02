import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bannerImage from '../assets/img/home-banner.png';
import Designation from './Designation.jsx';
import { generateVCard } from '../utils/generateVCard';

const Home = () => {
    const [bannerImg, setBannerImg] = useState(bannerImage); // fallback banner
    const [userData, setUserData] = useState(null);
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    useEffect(() => {
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

            <section id="home" data-scroll-index="0" className="home-banner">
                <div className="hb-top-fixed hidden lg:flex">
                    <div className="hb-info">
                        <label className='primaryContact'>{userData?.primaryContact || '+04 6545-9535-6515'}</label>
                        <label className='primaryMail'>{userData?.primaryMail || 'nairobi-designer@domain.com'}</label>
                    </div>
                    <div className="hb-lang hidden">
                        <ul className="flex list-none">
                            <li className="active"><Link to="/">EN</Link></li>
                            <li><Link to="/">FR</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="container">
                    <div className="grid grid-cols-12 min-h-screen items-center">
                        <div className="col-span-12 lg:col-span-8">
                            <div className="type-box">
                                <h6>👋 Hello, My name is</h6>
                                <h1 className="font-alt">
                                    <span className='firstName'>{userData?.firstName}</span>{' '}
                                    <span className='lastName'>{userData?.lastName}</span>
                                </h1>
                                <h3>I'm a <span id="type-it">{userData?.jobTitle}</span></h3>
                                <p className="desc description">
                                    I design and develop services for customers of all sizes, specializing in creating stylish, modern websites, web services and online stores.
                                </p>
                                <div className="btn-bar" onClick={handleDownloadVCF}>
                                    <Link className="font-alt" to="/">Save Contact</Link>
                                </div>
                                {qrCodeUrl && (
                                    <div className="text-center mt-4">
                                        <img src={qrCodeUrl} alt="QR Code" className="w-[70px] h-[70px] rounded-md border" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <Designation />

                <div
                    className="hb-me"
                    style={{ backgroundImage: `url(${bannerImage})` }}
                ></div>
            </section>
        </>
    );
};

export default Home;
