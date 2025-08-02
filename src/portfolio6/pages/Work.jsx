import React, { useEffect, useRef, useState } from 'react';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';
import fallbackImg from '../assets/images/work_images/small/1.jpg';
import fallbackLargeImg from '../assets/images/work_images/1.jpg';
import Footer from '../components/Footer.jsx';

const Work = () => {
  const [isotope, setIsotope] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [products, setProducts] = useState([]);
  const containerRef = useRef(null);

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

  return (
    <div className="bg-white dark:bg-[#111111] lg:rounded-2x flex flex-col">
      <div className="container mb-8 px-4 sm:px-5 md:px-10 lg:px-[60px]">
        <div className="py-12">
          <h2 className="after-effect after:left-48 mt-12 lg:mt-0">Portfolio</h2>
        </div>

        <div
          className="portfolio-container mymix portfolio_list-two three-col relative"
          ref={containerRef}
        >
          <div className="grid-sizer w-1/3 float-left"></div>

          {products.map((item) => {
            const categoryClass = item.url?.replace(/\s+/g, '-').toLowerCase() || 'logo';
            return (
              <div
                key={item.id}
                className={`portfolio_list-two-items isotop-item w-1/3 float-left ${categoryClass}`}
              >
                <div className="rounded-lg bg-[#fff0f0] dark:bg-transparent dark:border-[2px] border-[#212425] p-6">
                  <div className="overflow-hidden rounded-lg relative overflow-hidden pt-[60%]">
                    <img
                      src={item.productPath || fallbackImg}
                      alt={item.name}
                      onClick={() => setActiveModal(item.id)}
                      className="w-full cursor-pointer transform hover:scale-110 transition duration-300 rounded-lg absolute h-full w-full inset-0 object-cover"
                    />
                  </div>
                  <span className="pt-5 text-[14px] font-normal text-gray-lite block dark:text-[#A6A6A6]">
                    Product
                  </span>
                  <h2 className="font-medium text-xl mt-2 dark:text-white">
                    <button onClick={() => setActiveModal(item.id)} className="hover:text-[#FA5252]">
                      {item.name}
                    </button>
                  </h2>
                </div>

                {activeModal === item.id && (
                  <div
                    className="fixed inset-0 bg-[rgba(0,0,0,0.75)] flex items-center justify-center z-50"
                    onClick={(e) => {
                      if (e.target.classList.contains('modal-overlay')) {
                        setActiveModal(null);
                      }
                    }}
                  >
                    <div className="modal-overlay absolute inset-0 cursor-pointer"></div>
                    <div className="relative z-10 md:p-8 p-4 bg-white dark:bg-[#111111] rounded-lg max-w-3xl w-full max-h-full">
                      <div className="overflow-y-scroll scroll-hide-1700 max-h-[60vh] lg:max-h-[80vh] bg-white dark:bg-[#111111] rounded-lg">
                        <h2 className="text-[#ef4060] dark:hover:text-[#FA5252] text-4xl text-center font-bold">
                          {item.name} Project
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 my-6 pr-3">
                          <div className="space-y-2">
                            <p className="dark:text-white flex items-center text-[15px] sm:text-lg">
                              <i className="fa-regular fa-file-lines sm:text-lg hidden sm:block mr-4 md:text-xl"></i>
                              Project :&nbsp;<span className="font-medium">Website</span>
                            </p>
                            <p className="dark:text-white flex items-center text-[15px] sm:text-lg">
                              <i className="fa-solid fa-code text-lg mr-2 hidden sm:block"></i>
                              Languages :&nbsp;<span className="font-medium">React, API</span>
                            </p>
                          </div>

                          <div className="space-y-2">
                            <p className="dark:text-white flex items-center mt-2 lg:mt-0 text-[15px] sm:text-lg">
                              <i className="fa-regular fa-user text-lg mr-2 hidden sm:block"></i>
                              Client :&nbsp;<span className="font-medium">N/A</span>
                            </p>
                            <p className="dark:text-white flex items-center text-[15px] sm:text-lg">
                              <i className="fa-solid fa-arrow-up-right-from-square text-lg mr-2 hidden sm:block"></i>
                              Preview :&nbsp;
                              <span className="font-medium transition-all duration-300 ease-in-out hover:text-[#ef4060]">
                                <a
                                  href={item.productUrl || '#'}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {item.productUrl ? 'View Product' : 'N/A'}
                                </a>
                              </span>
                            </p>
                          </div>
                        </div>

                        <p className="dark:text-white text-2line font-normal text-[15px] sm:text-sm">
                          {item.description || 'No description provided.'}
                        </p>

                        <div className="pr-3 relative overflow-hidden pt-[60%]">
                          <img
                            src={item.productPath || fallbackLargeImg}
                            alt="portfolio large"
                            className="w-full md:h-[450px] h-auto object-cover rounded-xl mt-6 absolute h-full w-full inset-0 object-cover"
                          />
                        </div>

                        <a onClick={() => setActiveModal(null)} className="close bg-close-light dark:bg-close-dark cursor-pointer">
                          Close
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Work;
