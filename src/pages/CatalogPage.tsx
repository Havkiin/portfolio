import React from 'react';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import { ProgrammingProjectType, programmingProjects } from '../data/Data';
import '../styles/CatalogPage.css';

function Projects ({ projects } : { projects : ProgrammingProjectType[] }) {
  return (
    <div className = "ProjectMosaicContainer">
      {projects.map((project) => (
        <div className="ProjectMosaicElement" key = {project.id}>
          <a href = {`/programming/${project.name}`}>
          <span className = "ProjectMosaicTitle">{project.name}</span>
          <div className = "ProjectMosaicSquare" key={project.id}>
              <img
                className = "MosaicImage"
                key={project.id}
                src={project.banner}
              />
          </div>
          </a>
        </div>
      ))}
    </div>
  )
}

function ProgrammingPage () {

  const finalDisplayed = [...programmingProjects].reverse();

  return (
    <div className="App">
      <AppHeader />
      <div className="ProjectContent">
        <div className="ProjectsRoot">
          <div>
            <Projects projects = {finalDisplayed} />
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

export default ProgrammingPage;