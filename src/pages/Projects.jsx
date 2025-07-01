import './Projects.css'
import React from 'react';
import LiquidGlass from 'liquid-glass-react'

function ProjectCard({ imageSrc, title, githubUrl, description }) {
  return (
    <div className="project-card">
      <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
        <img src={imageSrc} alt={`${title} screenshot`} className="project-image" />
      </a>
      <h3 className="project-title">{title}</h3>
      <p className="project-description">{description}</p>
    </div>
  )
}

function Projects() {

  const projects = [
    {
      imageSrc: '../images/project1.png',
      title: 'Project One',
      githubUrl: 'https://github.com/yourusername/project-one',
      description: 'Brief description of project one.',
    }
  ];


  return (
    <div className="projects-grid">
      {projects.map((project, idx) => (
        <ProjectCard key={idx} {...project} />
      ))}
    </div>
  );
}

export default Projects