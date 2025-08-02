import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import './App.css';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import {
  About,
  Contact,
  Footer,
  Hero,
  NavBar,
  Projects,
  Sidebar,
  TechStack,
} from "./sections";

const MainContent = () => (
  <>
    <NavBar />
    <Sidebar />
    <Hero />
    <About />
    <TechStack />
    <Projects />
    <Contact />
    <Footer />
  </>
);

const Portfolio8 = () => {
  return (
    <Router>
      <div className="bg-black-100">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Portfolio8;
