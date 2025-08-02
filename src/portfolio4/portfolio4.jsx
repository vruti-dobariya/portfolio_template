import React, { useEffect, useState } from 'react';
import './assets/css/main.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/vendor/font-awesome/css/all.min.css';
import './assets/vendor/magnific/magnific-popup.css';
import './assets/vendor/nav/css/component.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/vendor/themify-icons/themify-icons.css';

import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Portfolio from './components/Portfolio.jsx';
import Resume from './components/Resume.jsx';

import usePageStack from './hooks/usePageStack';

function Portfolio4() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  usePageStack(menuOpen, loading, currentPageIndex);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading && (
        <div id="loading">
          <div className="load-circle">
            <span className="one"></span>
          </div>
        </div>
      )}

      {!loading && (
        <>
          <Header
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            setCurrentPageIndex={setCurrentPageIndex}
          />
          <div className={`pages-stack ${menuOpen ? 'pages-stack--open' : ''}`}>
            <Home />
            <About />
            <Resume />
            <Portfolio />
            <Contact />
          </div>
        </>
      )}
    </div>
  );
}

export default Portfolio4;
