import React from 'react';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import { Link } from 'react-router-dom';
import { Routes } from '../data/Data';
import { ProgrammingProject } from '../data/Data';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../styles/ProgrammingProject.css';
import i18next from 'i18next';

function DisplayContent ({ project } : { project : ProgrammingProject }) {
  const maxLength = Math.max(project.texts.length, project.codeblocks.length, project.images.length);

  return (
    <div>
      {Array.from({ length: maxLength }).map((_, index) => (
        <div key={index} className="TextContent">
          {index < project.texts.length && (
            <div><p dangerouslySetInnerHTML={{ __html: i18next.t(project.texts[index])}} className="ProjectDescription"/></div>
          )}
          {index < project.codeblocks.length && (
            <div>
              <SyntaxHighlighter language="cpp" wrapLines={true} wrapLongLines={true} style={tomorrow} className="CodeBlock">
                {project.codeblocks[index]}
              </SyntaxHighlighter>
            </div>
          )}
          {index < project.images.length && (
            <div>
              <img src={project.images[index]} className="ImageBlock"/>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
    
function ProjectPage ({ project } : { project : ProgrammingProject }) {
  return (
    <div className="App">
      <AppHeader />
      <div className="ProjectContent">
        <div className="BannerContainer">
          <span className= {"ProjectTitle Roboto orange"}>
            {project.name}
          </span>
          <div className="ProjectBanner">
              <img className="Banner" src={project.banner}/>
          </div>
        </div>
        <DisplayContent project={project} />
        <div><button className="BackButton"><Link to={Routes.programming}>{i18next.t('programming:backToProjects')}</Link></button></div>
      </div>
      <AppFooter />
    </div>
  );
}

export default ProjectPage;