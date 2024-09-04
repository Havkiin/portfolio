import React from 'react';
import { useState } from 'react';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import { ProgrammingProject, programmingProjects, ProgrammingProjectType } from '../data/Data';
import '../styles/ProjectCatalog.css';

function Projects ({ projects } : { projects : ProgrammingProject[] }) {
  const [isAnimated, setIsAnimated] = useState(projects.map(() => false));

  const getStillName = (name : string) => {
    const stillName = name.replace('.gif', '.png');
    return stillName;
  }

  const setAnimationState = (index : number, newValue : boolean) => {
    const newIsAnimated = [...isAnimated];
    newIsAnimated[index] = newValue;
    setIsAnimated(newIsAnimated);
  }

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
                src={isAnimated[project.id] ? project.banner : getStillName(project.banner)}
                onMouseOver={() => setAnimationState(project.id, true)}
                onMouseLeave={() => setAnimationState(project.id, false)}
              />
          </div>
          </a>
        </div>
      ))}
    </div>
  )
}

function LanguageOptions ({ projects } : { projects : ProgrammingProject[] }) {
  let options : ProgrammingProjectType[] = [];

  projects.forEach((p) => {
    if (!options.includes(p.type)) {
      options.push(p.type);
    }
  });

  // Sort options alphabetically
  options.sort((a, b) => a.localeCompare(b));

  const finalOptions = options.map((type, i) => (
    <option value={type} key={i}>{type}</option>
  ));

  return <>{finalOptions}</>;
}

function ProgrammingPage () {
  const [displayedProjects, setDisplayedProjects] = useState<ProgrammingProject[]>(programmingProjects);
 
  function FilterProjects (type : string) {
    if (type === ProgrammingProjectType.All) {
      return setDisplayedProjects(programmingProjects);
    }
    else {
      return setDisplayedProjects(programmingProjects.filter((p) => p.type === type));
    }
  }

  const finalDisplayed = [...displayedProjects].reverse();

  return (
    <div className="App">
      <AppHeader />
      <div className="ProjectContent">
        <div className="ProjectsRoot">
          {/* <div className="Filters">
            <p>Project Type </p>
            <select name="languages" className="LanguageSelect" onChange={(e) => FilterProjects(e.target.value)}>
              <option value="All">All</option>
              <LanguageOptions projects = {programmingProjects} />
            </select>
          </div> */}
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