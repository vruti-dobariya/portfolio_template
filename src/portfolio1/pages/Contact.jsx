import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs'; // ✅ used to encode form data
import ScrollTop from '../components/ScrollTop.jsx';
import Designation from '../components/Designation.jsx';

function Contact() {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);

  const username = 'hailey';

  useEffect(() => {
    fetch('/admin/getBasicDetails')
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setUserData(data.data);
        }
      })
      .catch((err) => console.error('Error fetching basic details:', err));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setIsSuccess(false);
      setStatusMessage('Please fill all required fields.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8085/contactUs/${username}`, {
        name, email, message
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data?.status === 'success' || response.status === 200) {
        setIsSuccess(true);
        setStatusMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setIsSuccess(false);
        setStatusMessage('Failed to send message.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setIsSuccess(false);
      setStatusMessage('Error submitting form.');
    }
  };

  return (
    <>
      <main className="main__content_wrapper inner__page--content">
        <div className="page__heading">
          <h1 className="page__heading--title">CONTACT ME</h1>
          <h2 className="page__heading--subtitle">CONTACT <span>ME</span></h2>
        </div>

        <section className="contact__section contact__page--style section--padding">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="contact__left">
                  <div className="section__heading mb-50">
                    <span className="section__heading--subtitle text__secondary">CONTACT</span>
                    <h2 className="section__heading--title mb-10">Get in touch</h2>
                    <p className="section__heading--desc">
                      Fill out the form and we’ll respond shortly.
                    </p>
                  </div>

                  <form className="contact__form" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 mb-30">
                        <input
                          className="contact__input--field"
                          name="name"
                          type="text"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 mb-30">
                        <input
                          className="contact__input--field"
                          name="email"
                          type="email"
                          placeholder="Your email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <textarea
                      className="contact__textarea--field"
                      name="message"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                    <button type="submit" className="contact__button primary__btn">Send Request</button>

                    {statusMessage && (
                      <p style={{ marginTop: '15px', color: isSuccess ? 'green' : 'red', fontWeight: 'bold' }}>
                        {statusMessage}
                      </p>
                    )}
                  </form>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="contact__info">
                  <div className="contact__info--items d-flex align-items-center">
                    <span className="contact__info--icon"><i className="fa fa-phone" style={{ fontSize: '22px' }}></i></span>
                    <div className="contact__info--content">
                      <h3 className="contact__info--title">Call Me</h3>
                      <p className="contact__info--desc">
                        <a href={`tel:${userData?.primaryContact}`}>{userData?.primaryContact}</a><br />
                        <a href={`tel:${userData?.secondaryContact}`}>{userData?.secondaryContact}</a>
                      </p>
                    </div>
                  </div>

                  <div className="contact__info--items d-flex align-items-center">
                    <span className="contact__info--icon"><i className="fa fa-envelope" style={{ fontSize: '22px' }}></i></span>
                    <div className="contact__info--content">
                      <h3 className="contact__info--title">Email Us</h3>
                      <p className="contact__info--desc">
                        <a href={`mailto:${userData?.primaryMail}`}>{userData?.primaryMail}</a><br />
                        <a href={`mailto:${userData?.secondaryMail}`}>{userData?.secondaryMail}</a>
                      </p>
                    </div>
                  </div>

                  <div className="contact__info--items d-flex align-items-center">
                    <span className="contact__info--icon"><i className="fa fa-map-marker" style={{ fontSize: '22px' }}></i></span>
                    <div className="contact__info--content">
                      <h3 className="contact__info--title">Address</h3>
                      <p className="contact__info--desc">{userData?.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Designation />
        </section>

        <div className="contact__map--area contact__page--map section--padding pt-0">
          <div className="container">
            {userData?.locationUrl ? (
              <iframe
                className="contact__map--iframe"
                src={userData.locationUrl}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            ) : (
              <p>Loading map...</p>
            )}
          </div>
        </div>
      </main>
      <ScrollTop />
    </>
  );
}

export default Contact;
