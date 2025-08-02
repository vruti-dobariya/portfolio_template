import React, { useEffect, useState } from 'react';
import './assets/css/main.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/vendor/font-awesome/css/all.min.css';
import './assets/vendor/magnific/magnific-popup.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Header from './components/Header';
import Home from './components/Home.jsx';
import Work from './components/Work.jsx';
import About from './components/About.jsx';
import Blog from './components/Blog.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Resume from './components/Resume.jsx';

function Portfolio3() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Page Loader */}
      {loading && (
        <div id="loading">
          <div className="load-circle"><span className="one"></span></div>
        </div>
      )}

      {!loading && (
        <>
          {/* Headers */}
          <Header />

          {/* Sections */}
          <main className="wrapper main-left">
            <Home />
            <About />
            <Resume />
            <Work />
            <Blog />
            <Contact />
            <Footer />
          </main>
        </>
      )}
    </div>
  );
}

export default Portfolio3;
