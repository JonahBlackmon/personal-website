// import { Routes, Route, NavLink } from 'react-router-dom';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Experience from './pages/Experience';
import './App.css';


function App() {
  const navRef = useRef(null);
  
  const [hoverStyle, setHoverStyle] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  const handleHover = (e) => {
    const link = e.currentTarget;
    const nav = navRef.current;

    const linkRect = link.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    setHoverStyle({
      x: linkRect.left - navRect.left,
      y: linkRect.top - navRect.top,
      width: linkRect.width,
      height: linkRect.height,
      opacity: 1,
    });
  };

  const clearHover = () => {
    setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <>
    <div className="page-container">
      <div className="projects-section">
          <nav className="global-navbar" ref={navRef}>
            <motion.div
              className="nav-hover-bg"
              animate={hoverStyle}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onMouseEnter={handleHover}
              onMouseLeave={clearHover}
              className="nav-link"
            >
              Home
            </a>
            <a href="#projects" onMouseEnter={handleHover} onMouseLeave={clearHover} className="nav-link">Projects</a>
            <a href="#experience" onMouseEnter={handleHover} onMouseLeave={clearHover} className="nav-link">Experience</a>
            <a href="#contact" onMouseEnter={handleHover} onMouseLeave={clearHover} className="nav-link">Contact Me</a>
          </nav>
        </div>
        <Experience />
      </div>
    </>
  );
}

export default App;
