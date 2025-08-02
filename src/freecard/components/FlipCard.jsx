import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoImg from '../assets/images/logo-white.jpeg';
import Designation from './Designation.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const FlipCard = () => {
  const [userData, setUserData] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    fetch('admin/getBasicDetails')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setUserData(data.data);
        }
      });
  }, []);

  useEffect(() => {
    if (userData?.firstName && userData?.lastName) {
      const baseUrl = window.location.origin; // auto-detect host
      const profilePath = `/`; 
      const qrText = `${baseUrl}${profilePath}`;
      const encodedText = encodeURIComponent(qrText);
      const url = `/generateQRCode?text=${encodedText}`;
      setQrCodeUrl(url);
    }
  }, [userData]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flip-card hover-trigger"
      >
        <div className="flip-card-inner">
          {/* Front */}
          <div className="flip-card-front">
            <img src={logoImg} alt="Logo" className="w-20 h-10 rounded-full mb-2" />
            <h1 className="text-xl font-bold">
              <span className="firstName">{userData?.firstName}</span>{' '}
              <span className="lastName">{userData?.lastName}</span>
            </h1>
            <p className="text-sm text-gray-600 jobTitle">{userData?.jobTitle}</p>
          </div>

          {/* Back */}
          <div className="flip-card-back relative overflow-hidden rounded-xl shadow-xl text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-700 to-blue-400 opacity-90 backdrop-blur-md clip-diagonal z-0"></div>

            <div className="relative z-10 text-white w-2/3 ml-4 mt-6">
              <h2 className="text-xl font-bold mb-3 tracking-wider">{userData?.cardName || 'Iconic Tap'}</h2>
              <div className="space-y-2 text-sm font-medium leading-tight">
                <p>
                  <FontAwesomeIcon icon={faPhone} className="text-white mr-2 w-4" />
                  +91-{userData?.primaryContact}
                </p>
                <p>
                  <FontAwesomeIcon icon={faEnvelope} className="text-white mr-2 w-4" />
                  {userData?.primaryMail}
                </p>
                <p className="truncate max-w-[180px]">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white mr-2 w-4" />
                  {userData?.address}
                </p>
              </div>
            </div>

            {qrCodeUrl && (
              <div className="absolute bottom-4 right-4 z-10">
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  className="w-16 h-16 rounded shadow-lg border border-white"
                />
              </div>
            )}

            <div className="absolute bottom-4 left-6 z-10 text-white text-xs uppercase font-semibold tracking-widest">
              Ahmedabad, India
            </div>
          </div>
        </div>
      </motion.div>
      <Designation />
    </div>
  );
};

export default FlipCard;
