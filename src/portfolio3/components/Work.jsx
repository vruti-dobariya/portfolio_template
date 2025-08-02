import React, { useEffect, useRef, useState } from 'react';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';
import portfolio2 from '../assets/img/m-portfolio-2.jpg';

const Portfolio = () => {
  const [products, setProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef(null);

  const formatClassName = (text = '') =>
    text.toLowerCase().replace(/\s+/g, '-');

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
        itemSelector: '.grid-item',
        layoutMode: 'masonry',
        percentPosition: true,
        masonry: {
          columnWidth: '.grid-sizer',
        },
      });

      imagesLoaded(containerRef.current, () => {
        iso.layout();
      });

      return () => iso.destroy();
    }
  }, [products]);

  return (
    <section data-scroll-index="3" id="work" className="section bg-gray">
      <div className="container">
        <div className="title">
          <h3>My Portfolio.</h3>
        </div>

        {/* Portfolio Grid */}
        <div
          className="portfolio-content grid-gutter-lg grid-col-3 lightbox-gallery"
          ref={containerRef}
        >
          <div className="grid-sizer"></div>
          {products.map((product, index) => (
            <div
              key={index}
              className={`grid-item ${formatClassName(product.url)}`}
            >
              <div className="portfolio-box-01">
                <div className="portfolio-info">
                  <h5 className="white-color font-weight-bold">
                    {product.name}
                  </h5>
                  <span>{product.description}</span>
                </div>
                <div className="portfolio-img">
                  <a href={product.url} className='block relative overflow-hidden pt-[90%]'>
                    <img
                      className='absolute h-full w-full inset-0 object-cover'
                      src={product.productPath || portfolio2}
                      alt={product.name}
                    />
                  </a>
                  <div className="portfolio-icon">
                    <button
                      className="gallery-link"
                      onClick={() => {
                        setActiveProduct(product);
                        setIsModalOpen(true);
                      }}
                    >
                      <span className="bi-plus"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && activeProduct && (
          <div
            className="work_modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-white p-6 rounded max-w-2xl w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-black text-2xl"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4 text-black">{activeProduct.name}</h2>
              <img
                src={activeProduct.productPath || portfolio2}
                alt={activeProduct.name}
                className="w-full rounded mb-4 object-cover max-h-80 text-black"
              />
              <p className='text-black'>{activeProduct.description}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
