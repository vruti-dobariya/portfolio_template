import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import noImage from "../assets/blog.jpg";

const Carousel = ({ products = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  useGSAP(() => {
    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        x: `-${currentSlide * 63}vw`,
        duration: 1,
        ease: "power2.inOut",
      });
    }
  }, [currentSlide]);

  return (
    <div className="relative">
      <div className="w-full relative lg:h-[60vh] md:h-[40vh] h-[60vh] overflow-hidden">
        <div className="carousel-gradient-left-box md:w-52 w-16 h-full absolute bottom-0 left-0 z-20" />
        <div className="carousel-gradient-right-box md:w-52 w-16 h-full absolute bottom-0 right-0 z-20" />

        <div className="absolute top-0 left-0 w-full overflow-hidden">
          <div
            className="flex items-center gap-[3vw] transition-transform ease-in-out duration-1000"
            ref={sliderRef}
            style={{ width: `${products.length * 63}vw` }}
          >
            {products.map((product, index) => (
              <div
                key={index}
                className="slider-item w-[60vw] h-[60vh] flex-none relative"
              >
                <img
                  src={product.productPath || noImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute w-full h-20 bottom-0 left-0 bg-black bg-opacity-90 px-5">
                  <div className="w-full h-full flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <p className="md:text-2xl text-white opacity-80">
                        {index + 1}.
                      </p>
                      <p className="md:text-2xl text-white opacity-80">
                        {product.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-5">
                      <p className="text-2xl hidden md:block text-white opacity-80">
                        Preview Project
                      </p>
                      <img
                        src="/images/arrowupright.svg"
                        alt="arrow"
                        className="md:size-10 size-7"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 text-white flex justify-end gap-5 md:-translate-x-32 -translate-x-5">
        <button
          onClick={prevSlide}
          className="rounded-full cursor-pointer bg-blue-500 hover:bg-pink-500 active:scale-90 transition-all w-12 h-12 flex items-center justify-center"
        >
          <img src="/images/CaretLeft.svg" alt="left" className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="rounded-full cursor-pointer bg-blue-500 hover:bg-pink-500 active:scale-90 transition-all w-12 h-12 flex items-center justify-center"
        >
          <img src="/images/CaretRight.svg" alt="right" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
