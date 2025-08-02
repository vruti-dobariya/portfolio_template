// App.jsx (updated)
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Work from './pages/Work.jsx';
import Resume from './pages/Resume.jsx';
import Contact from './pages/Contact.jsx';
import Blog from './pages/Blog.jsx';
import Preloader from './components/Preloader.jsx';
import './assets/css/tailwind.css';
import './assets/css/custom.css';
import 'aos/dist/aos.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { initGA, logPageView } from './analytics';

function AppWrapper() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Google Analytics only once
  useEffect(() => {
    initGA();
  }, []);

  // Log pageview on route change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    logPageView(location.pathname); // Track page view

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="bg-homeBg min-h-screen dark:bg-homeBg-dark bg-no-repeat bg-center bg-cover bg-fixed md:pb-16 w-full">
      <div className="z-50">
        <div className="container">
          <Header />
          {isLoading && <Preloader />}
          {!isLoading && (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/work" element={<Work />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          )}
        </div>
      </div>
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
