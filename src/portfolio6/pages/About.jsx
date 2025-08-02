import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import Designation from '../components/Designation.jsx';
import Footer from '../components/Footer.jsx';

import about from '../assets/images/about/about.jpg';
import brand from '../assets/images/slider/brand.png';
import brand1 from '../assets/images/slider/brand1.png';
import brand2 from '../assets/images/slider/brand2.png';
import brand3 from '../assets/images/slider/brand3.png';
import brand4 from '../assets/images/slider/brand4.png';
import defaultIcon from '../assets/images/icons/icon.svg';
import defaultBanner from '../assets/images/user_placeholder.jpg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function About() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bannerImg, setBannerImg] = useState(defaultBanner);

  useEffect(() => {
    fetch('/admin/getImages')
      .then(res => res.json())
      .then(data => {
        if (data?.status?.success) {
          const path = data.data?.profilePhotoPath;
          if (path) {
            setBannerImg(path);
          }
        }
      })
      .catch(() => {
        setBannerImg(defaultBanner); 
      });
  }, []);

  const brandSliderSettings = {
    dots: false,
    infinite: true,
    speed: 2000,
    autoplaySpeed: 0,
    autoplay: true,
    cssEase: 'linear',
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 },
      },
    ],
  };

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
  }, []);

  return (
    <div className="container lg:rounded-2xl bg-white dark:bg-[#111111]">
      <div className="px-4 sm:px-5 md:px-10 lg:px-20">
        <div data-aos="fade" className="aos-init aos-animate">
          {/* About Section */}
          <div className="py-12">
            <h2 className="after-effect after:left-52 mt-12 lg:mt-0"> About Me </h2>
            <div className="grid grid-cols-12 md:gap-10 pt-4 md:pt-[40px] items-center">
              <div className="col-span-12 md:col-span-4">
                <img className="w-full md:w-[330px] md:h-[400px] object-cover overflow-hidden rounded-[35px] mb-3 md:mb-0" src={bannerImg} alt="about" />
              </div>
              <div className="col-span-12 md:col-span-8 space-y-2.5">
                <div className="md:mr-12 xl:mr-16">
                  <h3 className="text-4xl font-medium dark:text-white mb-2.5"> Who am I? </h3>
                  <p className="text-gray-lite dark:text-color-910 leading-7 description" id='description'> I'm Creative Director and UI/UX Designer from Sydney, Australia, working in web development and print media. I enjoy turning complex problems into simple, beautiful and intuitive designs. </p>
                </div>

                {/* Personal Info */}
                <div>
                  <h3 className="text-4xl font-medium my-5 dark:text-white"> Personal Info </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="flex items-center">
                      <span className="text-oriange dark:bg-color-990 shadow-icon mr-2.5 flex items-center justify-center rounded-md text-2xl w-12 p-2.5">
                        <i className="fa-solid fa-mobile-screen-button"></i>
                      </span>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-lite dark:text-color-910">Phone</p>
                        <h6 className="font-medium dark:text-white primaryContact" id='primaryContact'>+123 456 7890</h6>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center">
                      <span className="text-oriange-lite dark:bg-color-990 shadow-icon mr-2.5 flex items-center justify-center rounded-md text-2xl w-12 p-2.5">
                        <i className="fa-solid fa-location-dot"></i>
                      </span>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-lite dark:text-color-910">Location</p>
                        <h6 className="font-medium dark:text-white address" id='address'>Hong Kong, China</h6>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center">
                      <span className="text-green dark:bg-color-990 shadow-icon mr-2.5 flex items-center justify-center rounded-md text-2xl w-12 p-2.5">
                        <i className="fa-solid fa-envelope-open-text"></i>
                      </span>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-lite dark:text-color-910">Email</p>
                        <h6 className="font-medium dark:text-white primaryMail" id='primaryMail'>example@mail.com</h6>
                      </div>
                    </div>

                    {/* Birthday */}
                    <div className="flex items-center">
                      <span className="text-color-50 dark:bg-color-990 shadow-icon mr-2.5 flex items-center justify-center rounded-md text-2xl w-12 p-2.5">
                        <i className="fa-solid fa-calendar-days"></i>
                      </span>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-lite dark:text-color-910">Birthday</p>
                        <h6 className="font-medium dark:text-white dateOfBirth" id='dateOfBirth'>May 27, 1990</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Designation />

          {/* What I Do Section */}
          <div className="pb-12">
            <h3 className="text-[35px] dark:text-white font-medium pb-5">What I do!</h3>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {!loading && services.length > 0 ? (
                services.map((service, index) => {
                  const bgClass = index % 2 === 0 ? 'bg-[#fcf4ff]' : 'bg-[#fefaf0]';
                  const iconSrc = service.serviceIconPath || defaultIcon;
                  return (
                    <div key={service.id} className={`about-box dark:bg-transparent ${bgClass}`}>
                      <img className="w-10 h-10 object-contain block" src={iconSrc} alt="icon" />
                      <div className="space-y-2">
                        <h3 className="dark:text-white text-2xl font-semibold">{service.name || 'No Name'}</h3>
                        <p className="leading-8 text-gray-lite dark:text-[#A6A6A6]">
                          {service.description || 'No description available.'}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500">Loading services...</p>
              )}
            </div>
          </div>

        </div>
      </div>
      <Footer />
      
    </div>
  );
}
