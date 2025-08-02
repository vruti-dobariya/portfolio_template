import React, { useRef, useState, useEffect } from 'react';
import project1 from '../assets/img/projects/project-1.jpg';
import leftArrow from '../assets/img/projects/navigation/left-arrow.png';
import rightArrow from '../assets/img/projects/navigation/right-arrow.png';
import closeButton from '../assets/img/projects/navigation/close-button.png';
import video from '../assets/img/projects/video.mp4';

const Portfolio = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [slideDirection, setSlideDirection] = useState('');
  const [products, setProducts] = useState([]);
  const itemRefs = useRef([]);

  // Handle slide direction reset
  useEffect(() => {
    if (slideDirection) {
      const timer = setTimeout(() => setSlideDirection(''), 300);
      return () => clearTimeout(timer);
    }
  }, [slideDirection]);

  // Get the mouse direction when entering the gallery item
  const getDirection = (el, { x, y }) => {
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const rect = el.getBoundingClientRect();
    const dx = x - (rect.left + w / 2);
    const dy = y - (rect.top + h / 2);
    const direction = Math.round(((Math.atan2(dy, dx) * 180) / Math.PI + 180) / 90 + 3) % 4;
    return direction;
  };

  // Handle mouse enter to add animation
  const handleMouseEnter = (e, ref) => {
    const el = ref;
    const overlay = el.querySelector('.overlay');
    const direction = getDirection(el, { x: e.pageX, y: e.pageY });
    overlay.className = `overlay from-${['top', 'right', 'bottom', 'left'][direction]}`;
    requestAnimationFrame(() => overlay.classList.add('to-center'));
  };

  // Handle mouse leave to remove animation
  const handleMouseLeave = (ref) => {
    const el = ref;
    const overlay = el.querySelector('.overlay');
    overlay.classList.remove('to-center');
  };

  // Handle previous slide click
  const handlePrev = () => {
    setSlideDirection('prev');
    setTimeout(() => {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : products.length - 1));
    }, 300);
  };

  // Handle next slide click
  const handleNext = () => {
    setSlideDirection('next');
    setTimeout(() => {
      setActiveIndex((prev) => (prev < products.length - 1 ? prev + 1 : 0));
    }, 300);
  };

  // Handle close modal click
  const handleClose = () => setActiveIndex(null);

  // Fetch products data
  useEffect(() => {
    fetch('/otherServices/product')
      .then((res) => res.json())
      .then((data) => {
        if (data?.status?.success && Array.isArray(data.data?.productDetailDTOList)) {
          const fetchedItems = data.data.productDetailDTOList.map((item) => ({
            title: item.name || 'Untitled',
            image: item.productPath || project1,
            type: 'image',
            client: item.url || 'Unknown',
            link: item.url || '#',
            description: item.description || 'No description available', // Ensure description is set
          }));
          setProducts(fetchedItems);
        }
      })
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  return (
    <div className="w-full">
       <div className="mx-auto w-full relative py-80 text-center xs:px-25 xs:pt-16 xs:pb-14 xs:bg-black-3 xs:border-b xs:border-black-4 xs:fixed xs:left-0 xs:right-0 xs:top-0 xs:z-20">
          <h2 className="text-fs-56 font-black font-Poppins uppercase dark:text-white text-black-6 m-0 xs:text-fs-26  xs:leading-lh-1.2 text-center">
            my <span className="text-accent">portfolio</span>
          </h2>
          <span className="text-fs-110 absolute left-0 right-0 top-1/2 tracking-10 leading-lh-0.7 font-extrabold text-light-grey-2 dark:text-muted  -translate-y-1/2 uppercase xs:hidden">
            works
          </span>
      </div>

      <div className="-mt-15 pb-60 xs:pb-20 portfolio">
        <div id="grid-gallery" className="xl:max-w-1140 custom-md-3:max-w-[calc(100%-195px)] md:max-w-720 sm:max-w-540 xs:max-w-full mx-auto slideshow-open">
          <div className="grid-wrap mx-auto mb-25">
            <ul className="gridlist">
              {products.map((item, index) => {
                return (
                  <li
                    className="relative overflow-hidden rounded-lg cursor-pointer group w-1/3 down-lg:w-1/2 xs:w-full float-left p-15 xs:px-0"
                    key={index}
                    ref={(el) => (itemRefs.current[index] = el)}
                    onMouseEnter={(e) => handleMouseEnter(e, itemRefs.current[index])}
                    onMouseLeave={() => handleMouseLeave(itemRefs.current[index])}
                    onClick={() => setActiveIndex(index)}
                  >
                    <a href={item.url} className="block grid_gallery transition duration-300 rounded-5 relative overflow-hidden pt-[80%]">
                      <img
                        className="block w-full rounded-5 transition duration-300 w-full absolute h-full w-full inset-0 object-cover"
                        src={item.image || project1}
                        alt={item.title}
                      />
                      <div className="overlay">
                        <span className="uppercase text-fs-18 text-white">{item.title}</span>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* === Slideshow Modal === */}
          {activeIndex !== null && (
            <div className="slideshow fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
              <ul className="flex items-center">
                <li className="w-660 max-w-full mx-auto p-4 current">
                  <div className={`fade-slide ${slideDirection === 'next' ? 'fade-in' : 'slide-prev fade-in'}`}>
                    <figure className="w-full h-full bg-black-3 p-30 overflow-auto rounded-10">
                      <figcaption className="mb-15">
                        <h3 className="uppercase leading-lh-1.2 text-accent pt-10 pb-28 font-bold text-center text-fs-33">
                          {products[activeIndex]?.title}
                        </h3>
                        <div className="flex flex-wrap font-Open-sans text-fs-15">
                          <p className="discription">{products[activeIndex]?.description}</p>
                        </div>
                      </figcaption>
                      <div className="relative overflow-hidden pt-[60%]">
                        {products[activeIndex]?.type === 'video' ? (
                          <video controls className="w-full rounded w-full absolute h-full w-full inset-0 object-cover">
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img
                            src={products[activeIndex]?.image || project1}
                            alt="Project preview"
                            className="w-full rounded w-full absolute h-full w-full inset-0 object-cover"
                          />
                        )}
                      </div>
                    </figure>
                  </div>
                </li>
              </ul>

              {/* Navigation Buttons */}
              <nav className="down-lg:fixed down-lg:top-0 down-lg:w-full down-lg:h-102 down-lg:bg-black-3 down-lg:z-10 down-lg:border-b down-lg:border-solid down-lg:border-b-black-4 xs:h-62">
                <button onClick={handlePrev} className="nav-prev fixed cursor-pointer py-200 px-30 top-1/2 down-lg:top-35 from-lg:-translate-y-1/2 from-lg:left-0 down-lg:left-30 xs:w-20 xs:top-21">
                  <img src={leftArrow} alt="Previous" className="block" />
                </button>
                <button onClick={handleClose} className="nav-close fixed cursor-pointer from-lg:top-30 down-lg:top-35 from-lg:right-30 down-lg:left-0 down-lg:right-0 down-lg:mx-auto down-lg:block down-lg:w-32 xs:w-20 xs:top-21">
                  <img src={closeButton} alt="Close" className="block" />
                </button>
                <button onClick={handleNext} className="nav-next fixed cursor-pointer py-200 px-30 top-1/2 down-lg:top-35 from-lg:-translate-y-1/2 from-lg:right-0 down-lg:right-30 xs:w-20 xs:top-21">
                  <img src={rightArrow} alt="Next" className="block" />
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
