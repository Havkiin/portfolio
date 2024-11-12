import React from 'react';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import { Link } from 'react-router-dom';
import { GameProgrammingProjectType, RouteEnums, WebProgrammingProjectType } from '../data/Data';
import { ProgrammingProjectType } from '../data/Data';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../styles/ProjectPage.css';
import i18next from 'i18next';
import { isOfType } from '../utils/utils';

const DisplayGitHubContainer = ({languages, githubLink} : {languages : string[], githubLink : string}) => {
  return <div className="GitHubContainer">
    <p className="Languages">{languages.map((el, idx) => (el + ((idx < languages.length - 1) ? ', ' : '')))}</p>
    <a href={githubLink}>
      <img src="/GitHub_logo.png"/>
      <p>{i18next.t('projects:sourceCode')}</p>
    </a>
  </div>
}

function DisplayContent ({ project } : { project : ProgrammingProjectType }) {
  if (isOfType<GameProgrammingProjectType>(project, 'intro')) {
    return (
      <div>
        <div className="BannerContainer">
          <span className= {"ProjectTitle Roboto orange"}>
            {project.name}
          </span>
          <div className="ProjectBanner">
              <img className="Banner" src={project.banner}/>
          </div>
        </div>
        <DisplayGitHubContainer languages={project.languages} githubLink={project.github} />
        <div className="IntroContainer"><p className="ProjectDescription">{i18next.t(project.intro)}</p></div>
        {project.projectParts.map((el, index) => (
          <div key={index} className="TextContent">
              <div><h1 className="PartTitle">- {i18next.t(el.title)} -</h1></div>
              {el.codeSnippets.map((cs, idx) => (
                <div key={idx}>
                  <div><p className="ProjectDescription">{i18next.t(cs.text)}</p></div>
                  {el.codeSnippets[idx].codeblock.length > 0 &&<div>
                    <SyntaxHighlighter language="cpp" wrapLines={true} wrapLongLines={true} style={tomorrow} className="CodeBlock">
                      {cs.codeblock}
                    </SyntaxHighlighter>
                  </div>}
                </div>
              ))}
            {el.image && (
              <div>
                <img src={el.image} className="ImageBlock"/>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
  
  if (isOfType<WebProgrammingProjectType>(project, 'source')) {
    return (
      <>
        {project.source}
        <DisplayGitHubContainer languages={project.languages} githubLink={project.github} />
      </>
    );
  }
}
    
function ProjectPage ({ project } : { project : ProgrammingProjectType }) {
  return (
    <div className="App">
      <AppHeader />
      <div className="ProjectContent">
        <DisplayContent project={project} />
        <div><button className="BackButton"><Link to={RouteEnums.projects}>{i18next.t('projects:backToProjects')}</Link></button></div>
      </div>
      <AppFooter />
    </div>
  );
}

export default ProjectPage;