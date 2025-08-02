import React, { useEffect } from 'react';

function ScrollTop() {
  useEffect(() => {
    const scrollTop = document.getElementById("scroll__top");

    const handleScroll = () => {
      if (window.scrollY > 300) {
        scrollTop.classList.add("active");
      } else {
        scrollTop.classList.remove("active");
      }
    };

    const handleClick = () => {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    };

    if (scrollTop) {
      scrollTop.addEventListener("click", handleClick);
      window.addEventListener("scroll", handleScroll);
    }

    // Clean up on unmount
    return () => {
      if (scrollTop) {
        scrollTop.removeEventListener("click", handleClick);
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <button id="scroll__top" className="scroll__top">
      <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="48"
          d="M112 244l144-144 144 144M256 120v292"
        />
      </svg>
    </button>
  );
}

export default ScrollTop;
