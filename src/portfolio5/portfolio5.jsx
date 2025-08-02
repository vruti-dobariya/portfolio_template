// App.jsx
import React, { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Portfolio from './components/Portfolio.jsx';
import Blog from './components/Blog.jsx';
import Contact from './components/Contact.jsx';
import Preloader from './components/Preloader.jsx';
import './assets/css/style.css';
import './assets/css/component.css';
import './assets/css/circle.css';
import './assets/css/styleswitcher.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [prevPage, setPrevPage] = useState(null);
  const [direction, setDirection] = useState('top');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleChangePage = (id) => {
    if (id === activePage) return;
    setPrevPage(activePage);
    setActivePage(id);
  };

  return (
    <>
      {loading && <Preloader />}
      {!loading && (
        <>
          <Header
            activePage={activePage}
            setActivePage={handleChangePage}
            setDirection={setDirection}
          />
          <div className="w-full h-full pages overflow-hidden">
            {['home', 'about', 'portfolio', 'contact', 'blog'].map((page) => (
              <div
                key={page}
                id={page}
                className={`page ${
                  page === activePage
                    ? `page--current ripple-effect page--animate-${direction}`
                    : page === prevPage
                    ? 'page--prev'
                    : ''
                }`}
              >
                {page === 'home' && <Home />}
                {page === 'about' && <About />}
                {page === 'portfolio' && <Portfolio />}
                {page === 'contact' && <Contact />}
                {page === 'blog' && <Blog />}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default App;

