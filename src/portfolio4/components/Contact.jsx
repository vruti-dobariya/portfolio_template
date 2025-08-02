import React from 'react';
import title4 from '../assets/img/title-4.jpg'; // import your image properly
import Designation from './Designation.jsx';

const Contact = () => {
  return (
    <section  className="page bg-white" id="contact">
      <div className="p-0">
        <div className="grid grid-cols-12">
          <div
            className="col-span-12 lg:col-span-3 xl:col-span-4 page-title"
            style={{ backgroundImage: `url(${title4})` }}
          >
            <div className="min-h-full flex items-end">
              <h2>Contact Me</h2>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9 xl:col-span-8">
            <div className="page-scroll">
              <div className="page-content">
                <div className="section-titel">
                  <h6>Get In Touch</h6>
                  <div className="st-title">
                    <h2>Contact Me</h2>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="contact-form" id="contact-form">
                  <h4>Say Something</h4>
                  <form className="contactform" method="post">
                    <div className="grid gap-6 grid-cols-12">
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
                            rows="3"
                            className="form-control"
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-span-12">
                        <div className="send">
                          <button
                            className="px-btn px-btn-theme"
                            type="button"
                            value="Send"
                          >
                            Send Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Contact Info */}
                <div className="grid gap-6 grid-cols-12 mt-[35px]">
                  <div className="col-span-12 md:col-span-6 lg:col-span-4">
                    <div className="contact-info">
                      <i className="ti-location-pin"></i>
                      <h6>Our Address</h6>
                      <p className='address'>123 Street New York City, USA 750065.</p>
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-6 lg:col-span-4">
                    <div className="contact-info">
                      <i className="ti-mobile"></i>
                      <h6>Our Phone</h6>
                      <p>
                        Office: <span className='primaryContact'></span><br />
                        Mobile: <span className='secondaryContact'></span>
                      </p>
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-6 lg:col-span-4">
                    <div className="contact-info">
                      <i className="ti-email"></i>
                      <h6>Our Email</h6>
                      <p>
                        <span className='primaryMail'></span><br />
                        <span className='secondaryMail'></span>
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <Designation />
        </div>
      </div>
    </section>
  );
};

export default Contact;
