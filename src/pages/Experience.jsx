import './Experience.css'
import React from 'react';
import { useState, useCallback, useEffect, useRef  } from "react";
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from "framer-motion";
import Contact from '../Contact';
function throttle(func, delay) {
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    return func(...args);
  };
}

export const TiltEffect = ({ children }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    throttle((e) => {
      const card = e.currentTarget;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 2;
      const centerY = box.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      setRotate({ x: rotateX, y: rotateY });
    }, 100),
    []
  );

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

function ProjectCard({ imageSrc, title, githubUrl, description, delay, bgColor}) {
  return (
    <TiltEffect>
      <div
        className="project-card"
        style={{ animationDelay: `${delay}s`, '--bg-color': bgColor  }}
      >
        <div className="project-image-container">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
            <img src={imageSrc} alt={`${title} screenshot`} className="project-image" />
          </a>
        </div>
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
      </div>
    </TiltEffect>
  );
}

function WorkCard({ title, description, dateRange, width, idx, color }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start end`, `end start`]
  });

  const staggerFactor = 0.1;
  const startOffset = idx * staggerFactor;

  const y = useTransform(
    scrollYProgress, 
    [0, startOffset, 0.3 + startOffset, 1], 
    [150, 50, 0, 0]
  );

  const gridColumn = width === "100%" ? "span 2" : "span 1";

  return (
    <motion.div
      ref={ref}
      className="work-card"
      style={{
        gridColumn,
        y: y,
        background: color
      }}
    >
      <div className="work-header">
        <h1 className="work-title">{title}</h1>
        <h3 className="dateRange">{dateRange}</h3>
      </div>
      <p className="work-description">{description}</p>
    </motion.div>
  );
}


function Work({ items }) {
  return (
    <div className="work-grid">
      {items.map((item, idx) => (
        <WorkCard key={idx} idx={idx} {...item} />
      ))}
    </div>
  )
}

function TechItem({columnTitle, columnElements}) {
  return (
    <div className="tech-item">
      <p className="tech-title">{columnTitle}</p>
      <ul className="tech-list">
        {columnElements.map((el, idx) => (
          <li key={idx} className="tech-element">{el}</li>
        ))}
      </ul>
    </div>
  )
}

function TechStack({items}) {
  return (
    <div className="tech-grid">
      {items.map((item, idx) => (
        <TechItem key={idx} idx={idx} {...item} />
      ))}
    </div>
  )
}

function IconRow({items}) {
  return (
    <div className="icon-row">
      {items.map((item, idx) => (
        <Icon key={idx} idx={idx} {...item} />
      ))}
    </div>
  );
}

function Icon({ imageSrc, URL }) {
  return (
    <a href={URL} target="_blank" rel="noopener noreferrer">
      <img src={imageSrc} alt="icon" className="icon-button" />
    </a>
  );
}

function Experience() {

  const projects = [
    {
      imageSrc: './images/ur5-arm.png',
      title: 'UR5 Greeting and Imitation',
      githubUrl: 'https://github.com/JonahBlackmon/ur5-greeting-imitation',
      description: 'Human-robot interaction framework in ROS fascilitating gesture recognition and real-time imitation of user movements',
      bgColor: "#ACF39D"
    },
    {
      imageSrc: './images/QuoteIt-logo.png',
      title: 'QuoteIt Social Media App',
      githubUrl: 'https://github.com/JonahBlackmon/QuoteIt',
      description: 'Full-stack social media app developed and published to the App Store. Automatic transcription and posting of the last 20 seconds of conversation retroactively',
      bgColor: "#F2C6DE"
    },
    {
      imageSrc: './images/mars-icon.png',
      title: 'Mars Weather Forecasting',
      githubUrl: 'https://github.com/JonahBlackmon/mars-weather-predictor',
      description: 'Linear Regression model trained on Curiosity rover data to forecast future weather conditions at the Gale Crater',
      bgColor: "#FFB140"
    },
    {
      imageSrc: './images/cube-icon.png',
      title: 'Text-to-3D Model Generator',
      githubUrl: 'https://github.com/JonahBlackmon/3d-render-engine',
      description: 'Pipeline that transforms user prompts into animated 3D models with custom implementations of projection matrices and a vertex connectivity algorithm',
      bgColor: "#B4E1FF"
    }
  ];

  const work = [
    {
      title: "Autonomous Intelligent Robotics Research",
      description: "Member of UT Austin’s Freshman Research Initiative (FRI) program with a focus on autonomous intelligent robotics and their role in human-robot interaction. Led the development of gesture-based interaction models for industrial robots, exploring social signaling and autonomous behavior in shared workspaces",
      dateRange: "Jan 2025 - Present",
      width: "100%",
      color: "#B4E1FF"
    },
    {
      title: "IT-Integrations",
      description: "Led the digital migration of healthcare facilities that support 150+ users to a new network system, ensuring smooth deployment and minimal downtime. Provided on-site troubleshooting and real-time support to resolve hardware and software issues during transition",
      dateRange: "May 2025 - August 2025",
      width: "50%",
      color: "#ACF39D"
    },
    {
      title: "Levinson Foundation",
      description: "Appointed to youth board researching and funding activism initiatives; responsible for the disbursement of $100,000 of funding to organizations, as well as attending national conferences and climate advocacy events",
      dateRange: "Jun 2023 - Present",
      width: "50%",
      color: "#F2C6DE"
    },
    {
      title: "Education",
      description: "University of Texas at Austin Bachelors of Science in Computer Science\nRelevant Coursework: Computer Architecture, Data Structures and Algorithms, Probability, Autonomous Robotics, Discrete Mathematics, Calculus",
      dateRange: "Aug 2024 - Present",
      width: "100%",
      color: "#FFB140"
    }
  ];

  const tech = [
    {
      columnTitle: "Languages",
      columnElements: ["Java", "Python", "Swift", "C", "C++", "HTML", "Assembly"]
    },
    {
      columnTitle: "Tools and Frameworks",
      columnElements: ["ROS", "Firebase", "SwiftUI", "Git", "Linux", "OpenCV", "AVFoundation"]
    },
    {
      columnTitle: "Design",
      columnElements: ["CAD", "Blender", "Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Figma", "React"]
    }
  ];

  const icons = [
    {
      imageSrc: './images/github-icon.png',
      URL: 'https://github.com/JonahBlackmon'
    },
    {
      imageSrc: './images/linkedin-icon.png',
      URL: 'https://linkedin.com/in/jonahkblackmon'
    }
  ];

  return (
    <>
      <div className="experience-text">
      <div className="about-me">
        <h1 className="my-name">Jonah Blackmon</h1>
        <p className="welcome-section">CS Student at UT Austin | Robotics AI & Automation</p>
        <div className="header-subrow">
          <IconRow items={icons} />
          <button
            onClick={() => window.open('./images/Jonah Blackmon - College Resume.pdf', '_blank')}
            className="resume-button"
          >
            View My Resume
          </button>
        </div>
      </div>
      <section id="projects">
      <h1 className="experience-title">Projects</h1>
      </section>
      <div className="projects-container">
      <div className="projects-grid">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} delay={idx * 0.1} {...project} />
        ))}
      </div>
      </div>
      <section id="experience">
      <h1 className="work-experience">Experience</h1>
      </section>
      <Work items={work} />
      <h1 className="tech-stack">Tech Stack</h1>
      <TechStack items={tech} />
      <section id="contact">
      <h1 className="contact">Contact Me</h1>
      </section>
      <Contact />
      </div>
    </>
  );
}

export default Experience