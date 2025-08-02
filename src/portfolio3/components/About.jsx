import React, { useEffect, useState } from 'react';
import aboutMeImg from '../assets/img/about-me.jpg';
import award1 from '../assets/img/a1.png';
import award2 from '../assets/img/a2.png';
import award3 from '../assets/img/a3.png';
import team1 from '../assets/img/team-1.jpg';
import team2 from '../assets/img/team-2.jpg';
import team3 from '../assets/img/team-3.jpg';
import defaultBanner from '../assets/img/user_placeholder.jpg';
import Designation from './Designation.jsx';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const About = () => {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bannerImg, setBannerImg] = useState(defaultBanner);

  useEffect(() => {
    const fetchServices = fetch('/otherServices')
      .then((res) => res.json())
      .then((data) => {
        if (data?.status?.success && data?.data?.serviceDTOList) {
          setServices(data.data.serviceDTOList);
        }
      });

    const fetchTestimonials = fetch('/otherServices/testimonial')
      .then((res) => res.json())
      .then((data) => {
        if (data?.status?.success && data?.data?.testimonialDetailDTOList) {
          setTestimonials(data.data.testimonialDetailDTOList);
        }
      });

    Promise.all([fetchServices, fetchTestimonials]).finally(() => setLoading(false));
  }, []);

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
    }, []);

  const settings = {
    dots: true,
    arrows: false,
    // autoplay: true,
    // autoplaySpeed: 4000,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }]
  };

  if (loading) return <p className="text-gray-500 text-center py-10">Loading content...</p>;

  return (
    <section id="about" className="section bg-gray">
      <div className="container">

        {/* About Image & Bio */}
        <div className="grid grid-cols-12 md:gap-7 gap-y-7 items-center">
          <div className="col-span-12 lg:col-span-4">
            <div className="about-me">
              <div className="img">
                <div className="img-in">
                  <img src={bannerImg} alt="About" />
                </div>
                <div className="social-icons flex justify-center">
                  <Link target="_blank" id="webURL" to="#">
                          <i className="fa fa-globe"></i>
                  </Link>
                  <Link  target="_blank" id="fbUrl" to="#">
                            <i className="fa-brands fa-facebook-f"></i>
                  </Link>
                  <Link target="_blank" id="twitterURL" to="#">
                          <i class="fa-brands fa-twitter"></i>
                  </Link>
                  <Link target="_blank" id="instaURL" to="#">
                            <i className="fa-brands fa-instagram"></i>
                  </Link>
                  <Link target="_blank" id="linkedInURL" to="#">
                          <i className="fa-brands fa-linkedin-in"></i>
                  </Link>
                  <Link target="_blank" id="whatsappURL" to="#">
                            <i className="fa-brands fa-whatsapp"></i>
                  </Link>
                  <Link target="_blank" id="ytURL" to="#">
                            <i className="fa-brands fa-youtube"></i>
                  </Link>
                  <Link target="_blank" id="pintrestURL" to="#">
                          <i class="fa-brands fa-pinterest-p"></i>
                  </Link>
                  <Link target="_blank" id="threadURL" to="#">
                            <i className="fa-brands fa-threads"></i>
                  </Link>
                  <Link target="_blank" id="tumblrURL" to="#">
                       <i class="fa-brands fa-tumblr"></i>
                  </Link>
                  <Link target="_blank" id="redditURL" to="#">
                      <i class="fa-brands fa-reddit"></i>
                  </Link>
                   <Link target="_blank" id="discordURL" to="#">
                      <i class="fa-brands fa-discord"></i>
                  </Link>
                </div>
              </div>
              <div className="info text-center">
                <p className='jobTitle'>Ux/Ui Designer</p>
                <h3 className=''><span className='firstName'></span> <span className='lastName'></span> </h3>
              </div>
            </div>
          </div>

          <Designation />

          <div className="col-span-12 lg:col-span-8">
            <div className="about-info">
              <div className="title"><h3>Biography</h3></div>
              <div className="about-text">
                <p>I'm a Freelancer Front-end Developer with over 3 years of experience. I'm from San Francisco...</p>
                <p>I code and create web elements for amazing people around the world. I like working with new people. New people, new experiences.</p>
              </div>
              <div className="info-list grid sm:grid-cols-2 gap-7">
                <ul>
                  <li><label>Name: </label><span className='firstName'></span> <span className='lastName'></span></li>
                  <li><label>Birthday: </label><span className='dateOfBirth'>4th April 1994</span></li>
                  <li><label>Address: </label><span className='address'>San Francisco</span></li>
                </ul>
                <ul>
                  <li><label>Phone: </label><span className='primaryContact'>(+38) 469 2344 2364</span></li>
                  <li><label>Email: </label><span className='primaryMail'>info@domainname.com</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="separated my-10"></div>

        {/* Services */}
        <div className="title"><h3>What I do?</h3></div>
        <div className="grid grid-cols-12 md:gap-7 gap-y-7">
          {services.length > 0 ? services.map(service => (
            <div key={service.id} className="col-span-12 lg:col-span-4">
              <div className="feature-box-01 p-4 rounded shadow-sm bg-white">
                <div className="icon mb-3"><i className="icon theme-bg bi-triangle"></i></div>
                <div className="feature-content">
                  <h5 className="font-semibold text-lg">{service.name}</h5>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            </div>
          )) : <p className="col-span-12 text-gray-500">No services found.</p>}
        </div>

        <div className="separated my-10"></div>

        {/* Testimonials */}
        <div className="title"><h3>Testimonials</h3></div>
        <Slider {...settings}>
          {testimonials.map(t => {
            const imgSrc = t.testimonialPath || t.testimonialUrl || defaultBanner;
            return (
              <div key={t.id} className="px-3">
                <div className="testimonial-01 bg-white p-4 rounded shadow flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-full object-cover">
                    <img src={imgSrc} alt={t.name} className="w-16 h-16 rounded-full object-cover" />
                  </div>
                  <div className="media-body">
                    <p className="text-gray-600 italic">"{t.description}"</p>
                    <h6 className="font-bold mt-2">{t.name}</h6>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>

      </div>
    </section>
  );
};

export default About;