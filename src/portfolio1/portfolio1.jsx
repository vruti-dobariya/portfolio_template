import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomeHeader from './components/HomeHeader.jsx'; // special header for home
import Header from './components/Header.jsx';         // common header
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Service from './pages/Service.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Contact from './pages/Contact.jsx';
import Blog from './pages/Blog.jsx';
import Preloader from './components/Preloader.jsx';
import './asset/css/plugins/swiper-bundle.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './asset/css/style.css';
import './asset/css/dark.css';
import './asset/css/rtl.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function AppWrapper() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, [location.pathname]); 

  return (
    <div className={isHomePage ? 'home2__hero--bg' : 'bg-dark_primary_bg'}>
      {isHomePage ? <HomeHeader /> : <Header />}
      {isLoading && <Preloader />}
      {!isLoading && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      )}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
