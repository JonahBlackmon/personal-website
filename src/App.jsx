import { Routes, Route, NavLink } from 'react-router-dom';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact-Me'
import './App.css';
import GooeyBubbles from './GooeyBubbles';


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
      <nav className="global-navbar" ref={navRef}>
        <motion.div
          className="nav-hover-bg"
          animate={hoverStyle}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />

        <NavLink
          to="/"
          onMouseEnter={handleHover}
          onMouseLeave={clearHover}
          className="nav-link"
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          onMouseEnter={handleHover}
          onMouseLeave={clearHover}
          className="nav-link"
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          onMouseEnter={handleHover}
          onMouseLeave={clearHover}
          className="nav-link"
        >
          Projects
        </NavLink>
        <NavLink
          to="/contact-me"
          onMouseEnter={handleHover}
          onMouseLeave={clearHover}
          className="nav-link"
        >
          Contact Me
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact-me" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
