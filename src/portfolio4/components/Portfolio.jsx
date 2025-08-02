import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';

import project1 from '../assets/img/project-1.jpg';
import project2 from '../assets/img/project-2.jpg';
import project3 from '../assets/img/project-3.jpg';
import project4 from '../assets/img/project-4.jpg';
import project5 from '../assets/img/project-5.jpg';
import project6 from '../assets/img/project-6.jpg';
import avatar2 from '../assets/img/avatar-2.jpg';
import avatar3 from '../assets/img/avatar-3.jpg';
import avatar4 from '../assets/img/avatar-4.jpg';
import title3 from '../assets/img/title-3.jpg';
import userImage from '../assets/img/user_placeholder.jpg';
import blog from '../assets/img/blog.jpg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Portfolio = () => {
  const [products, setProducts] = useState([]);
  const [isotope, setIsotope] = useState(null);
  const containerRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  useEffect(() => {
    fetch('/otherServices/product')
      .then((res) => res.json())
      .then((data) => {
        if (data?.status?.success && Array.isArray(data.data?.productDetailDTOList)) {
          setProducts(data.data.productDetailDTOList);
        }
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  useEffect(() => {
    fetch('/otherServices/testimonial')
      .then((res) => res.json())
      .then((data) => {
        if (data?.status?.success && data?.data?.testimonialDetailDTOList) {
          setTestimonials(data.data.testimonialDetailDTOList);
        }
      })
      .catch((err) => console.error('Error fetching testimonials:', err));
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const iso = new Isotope(containerRef.current, {
        itemSelector: '.isotop-item',
        layoutMode: 'masonry',
        percentPosition: true,
        masonry: {
          columnWidth: '.grid-sizer',
        },
      });

      imagesLoaded(containerRef.current, () => {
        iso.layout();
      });

      setIsotope(iso);
      return () => iso.destroy();
    }
  }, [products]);

  const getCategoryClass = (url) => {
    return (url || 'uncategorized').toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <section className="page bg-white" id="portfolio">
      <div className="p-0">
        <div className="grid grid-cols-12">
          <div
            className="col-span-12 lg:col-span-3 xl:col-span-4 page-title"
            style={{ backgroundImage: `url(${title3})` }}
          >
            <div className="min-h-full flex items-end">
              <h2>My Projects</h2>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9 xl:col-span-8">
            <div className="page-scroll">
              <div className="page-content">
                <div className="section-titel">
                  <h6>Latest Work</h6>
                  <div className="st-title">
                    <h2>My Projects</h2>
                  </div>
                </div>

                {/* Portfolio Items (No filter tabs) */}
                <div className="portfolio-content mb-6">
                  <ul className="portfolio-cols portfolio-cols-3" ref={containerRef}>
                    <div className="grid-sizer"></div>
                    {products.map((product, idx) => {
                      const category = getCategoryClass(product.url);
                      return (
                        <li
                          key={idx}
                          className={`portfolio-item isotop-item ${category}`}
                        >
                          <div className="portfolio-col">
                            <div className="portfolio-img relative overflow-hidden pt-[90%]">
                              <a href={product.url} className=''>
                                <img className='absolute h-full w-full inset-0 object-cover' src={product.productPath || blog} alt={product.name} />
                              </a>
                              <div className="hover">
                                <div className="action-btn">
                                  <a className="lightbox-gallery" href={product.productPath || blog}>
                                    <i className="fas fa-expand"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="portfolio-info">
                              <h5>{product.name}</h5>
                              <span>{product.description}</span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Testimonials */}
                <div className="testimonial-section mt-[30px]">
                  <div className="sub-title mb-[30px]">
                    <h2>What People Say?</h2>
                  </div>

                  <Slider {...sliderSettings}>
                    {testimonials.map((t) => {
                      const imgSrc = t.testimonialPath || t.testimonialUrl || userImage;
                      return (
                        <div key={t.id} className="testimonial-col px-4">
                          <div className="say bg-white shadow p-6 rounded">
                            <p>{t.description}</p>
                          </div>
                          <div className="user flex items-center gap-4 mt-4">
                            <div className="img w-16 h-16 overflow-hidden rounded-full">
                              <img src={imgSrc} alt={t.name} />
                            </div>
                            <div className="name">
                              <span className="font-bold">{t.name}</span>
                              <label className="text-sm text-gray-500 block">Client</label>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
