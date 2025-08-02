import React, { useEffect, useState } from 'react';
import aboutImage from '../assets/img/about-me.jpg'; 
import titleImage from '../assets/img/title-1.jpg';
import Designation from './Designation.jsx';
import defaultBanner from '../assets/img/user_placeholder.jpg';

const About = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bannerImg, setBannerImg] = useState(defaultBanner);

  useEffect(() => {
    fetch('/otherServices')
      .then((res) => res.json())
      .then((data) => {
        if (data?.status?.success && data?.data?.serviceDTOList) {
          setServices(data.data.serviceDTOList);
        } else {
          console.error('Unexpected data format', data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setLoading(false);
      });

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
  }, []);

  return (
    <section className="page about-section bg-white" id="about">
      <div className="p-0">
        <div className="grid grid-cols-12">
          <div
            className="col-span-12 lg:col-span-3 xl:col-span-4 page-title"
            style={{ backgroundImage: `url(${titleImage})` }}
          >
            <div className="min-h-full flex items-end">
              <h2>About Me</h2>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9 xl:col-span-8">
            <div className="page-scroll">
              <div className="page-content">
                <div className="section-titel">
                  <h6>WHO I AM</h6>
                  <div className="st-title">
                    <h2>ABOUT</h2>
                  </div>
                </div>
                <div className="grid gap-5 grid-cols-12">
                  <div className="col-span-12 lg:col-span-4">
                    <img src={bannerImg} alt="About Me" />
                  </div>
                  <div className="col-span-12 lg:col-span-8">
                    <div className="about-text pb-[40px]">
                      <h3>
                        I'm <span className="firstName">Alexis</span> <span className="lastName">Larten</span>
                      </h3>
                      <p className="m-0px description">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                      </p>
                    </div>

                    <div className="grid gap-8 grid-cols-12">
                      {!loading && services.length > 0 ? (
                        services.map((service, i) => (
                          <div key={service.id || i} className="col-span-12 md:col-span-6">
                            <div className="feature-box">
                              <i className="icon dark-color theme-after ti-image"></i>
                              <div className="feature-content">
                                <h5>{service.name || 'No Name'}</h5>
                                <p>{service.description || 'No description available.'}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">Loading services...</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="counter-row mt-[50px] pt-[50px] border-t border-gray-200 hidden">
                  <div className="grid gap-5 grid-cols-12">
                    {[
                      { icon: "ti-face-smile", count: 375, label: "Happy Clients" },
                      { icon: "ti-headphone", count: 375, label: "Telephonic Talk" },
                      { icon: "ti-camera", count: 625, label: "Photo Capture" },
                      { icon: "ti-thumb-up", count: 150, label: "Projects" },
                    ].map((item, i) => (
                      <div className="col-span-12 md:col-span-3 sm:col-span-6" key={i}>
                        <div className="counter-box">
                          <div className="icon">
                            <i className={item.icon}></i>
                          </div>
                          <div className="counter-data">
                            <div className="count">{item.count}</div>
                            <h6>{item.label}</h6>
                          </div>
                        </div>
                      </div>
                    ))}
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

export default About;