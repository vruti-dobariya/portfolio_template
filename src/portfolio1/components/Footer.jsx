import React, { useState, useEffect } from 'react';
import PolicyModal from './PolicyModal';

function Footer() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [privacyData, setPrivacyData] = useState({ privacy: '', tc: '' });

  useEffect(() => {
    fetch('/privacy') // Adjust to your actual endpoint
      .then(res => res.json())
      .then(data => {
        if (data?.status?.success) {
          setPrivacyData(data.data);
        }
      })
      .catch(err => console.error('Privacy fetch error:', err));
  }, []);

  // Decode \u003C style escaped characters to actual HTML
  const decodeHtml = (encodedString) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = encodedString;
    return txt.value;
  };

  const openModal = (type) => {
    setModalTitle(type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions');
    const rawHtml = type === 'privacy' ? privacyData.privacy : privacyData.tc;
    setModalContent(decodeHtml(rawHtml)); // Decode before sending to modal
    setModalOpen(true);
  };

  return (
    <footer className="footer footer__section2">
      <div className="container">
        <div className="main__footer d-flex justify-content-between align-items-center">
          <p className="copyright__content mb-0">
            Developed with <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.78-7.78a5.5 5.5 0 0 0 0-7.78z" /></svg>
            </span> by <span><a className="text__secondary" href="https://iconictap.com/">Iconic Tap</a></span> © 2025
          </p>
          <ul className="footer__menu d-flex align-items-center justify-content-center">
            <li><button className="footer__menu--link btn-link" onClick={() => openModal('tc')}>Terms & Conditions</button></li>
            <li><button className="footer__menu--link btn-link" onClick={() => openModal('privacy')}>Privacy Policy</button></li>
          </ul>
        </div>
      </div>

      <PolicyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        content={modalContent}
        title={modalTitle}
      />
    </footer>
  );
}

export default Footer;
