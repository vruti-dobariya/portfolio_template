import React, { useState, useEffect } from 'react';
import Designation from '../components/Designation.jsx';

const Contact = () => {
  const sendMail = () => {
    // You can add actual sending logic here later
    document.getElementById('suce_message').style.display = 'block';
    document.getElementById('err_message').style.display = 'none';
  };

  const [userData, setUserData] = useState(null);

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

  return (
    <section data-scroll-index="5" id="contactus" className="section bg-gray">
      <div className="container">
        <div className="grid grid-cols-12 gap-y-7 gap-2.5">
          {/* Contact Info */}
          <div className="col-span-12 lg:col-span-5 xl:col-span-4">
            <div className="contact-info">
              <h4>What’s your story? Get in touch</h4>
              <p>
                Always available for freelancing if the right project comes along,
                Feel free to contact me.
              </p>
              <ul>
                <li className="media">
                  <i className="bi-map"></i>
                  <span className="media-body address">
                   {userData?.address}
                  </span>
                </li>
                <li className="media">
                  <i className="bi-envelope"></i>
                  <span>
                    <a href={`mailto:${userData?.primaryMail}`} className="media-body">{userData?.primaryMail}</a>
                  </span>
                </li>
                <li className="media">
                  <i className="bi-phone"></i>
                  <span>
                    <a href={`tel:${userData?.primaryContact}`} className="media-body">{userData?.primaryContact}</a>
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-span-12 lg:col-span-7 xl:col-span-8">
            <div className="contact-form">
              <h4>Say Something</h4>
              <form id="contact-form" method="POST">
                <div className="grid grid-cols-12 gap-5">
                  <div className="col-span-12 md:col-span-6">
                    <div className="form-group">
                      <input
                        name="Name"
                        id="name"
                        placeholder="Name *"
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <div className="form-group">
                      <input
                        name="Email"
                        id="email"
                        placeholder="Email *"
                        className="form-control"
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="form-group">
                      <input
                        name="Subject"
                        id="subject"
                        placeholder="Subject *"
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="form-group">
                      <textarea
                        name="message"
                        id="message"
                        placeholder="Your message *"
                        rows="5"
                        className="form-control"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="send">
                      <button
                        className="px-btn px-btn-white"
                        type="button"
                        onClick={sendMail}
                      >
                        Send Message
                      </button>
                    </div>
                    <span id="suce_message" className="text-success" style={{ display: 'none' }}>
                      Message Sent Successfully
                    </span>
                    <span id="err_message" className="text-danger" style={{ display: 'none' }}>
                      Message Sending Failed
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Google Map */}
          <div className="col-span-12">
            <div className="google-map border-[5px] border-white shadow-md">
               {userData?.locationUrl ? (
                  <iframe
                    className="w-full aspect-[16/6]"
                    src={userData.locationUrl}
                    allowFullScreen
                    loading="lazy"
                    title="Google Map"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                ) : (
                  <p>Loading map...</p>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
