import React, { useEffect, useRef, useState } from 'react';
import defaultImage from '../asset/images/other/portfolio1.png';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';
import ScrollTop from '../components/ScrollTop.jsx';

function Portfolio() {
  const [products, setProducts] = useState([]);
  const gridRef = useRef(null);
  const iso = useRef(null);

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
    if (gridRef.current && products.length > 0) {
      imagesLoaded(gridRef.current, () => {
        iso.current = new Isotope(gridRef.current, {
          itemSelector: '.element-item',
          percentPosition: true,
          masonry: {
            columnWidth: '.element-item',
          },
        });
      });
    }

    return () => {
      iso.current?.destroy();
    };
  }, [products]);

  return (
    <>
      <main className="main__content_wrapper inner__page--content">
        <div className="page__heading">
          <h1 className="page__heading--title">MY PORTFOLIO</h1>
          <h2 className="page__heading--subtitle">
            MY <span>PORTFOLIO</span>
          </h2>
        </div>

        <section className="portfolio__section section--padding">
          <div className="container">
            <div className="portfolio__section--inner">

              <div className="portfolio__grid mb--n30" ref={gridRef}>
                {products.map((product) => {
                  const imageUrl = product.productPath || product.productUrl || defaultImage;
                  return (
                    <div className="element-item" key={product.id}>
                      <div className="portfolio__card">
                        <a
                          href={product.url}
                          className="popup-modal--open display-block"
                          data-bs-toggle="modal"
                          data-bs-target="#portfolioModal"
                        >
                          <div className="portfolio__image--card relative overflow-hidden pt-[60%]">
                            <img
                              src={imageUrl}
                              className="absolute h-full w-full inset-0 object-cover"
                              alt={product.name || 'Portfolio Item'}
                            />
                          </div>
                          <div className="portfolio__content">
                            <span className="portfolio__zoom text-white">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                              </svg>
                            </span>
                            <h3 className="portfolio__title text-white">{product.name}</h3>
                            <p className="portfolio__desc text-white">
                              {product.description || 'No description.'}
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <ScrollTop />
    </>
  );
}

export default Portfolio;
