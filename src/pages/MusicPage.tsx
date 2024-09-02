import React from 'react';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import { MusicProject, musicProjects } from '../components/Data';
import '../styles/MusicPage.css';

function MusicProjects ( { projects } : { projects : MusicProject[] }) {
  return (
    <div className = "ProjectMosaicContainer">
      {projects.map((project) => (
        <div className = "ProjectMosaicElement" key={project.id}>
          <iframe
            src={project.source}
            width="100%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            name={project.name}>
          </iframe>
        </div>
      ))}
    </div>
  );
}

function MusicPage () {
  return (
    <div className="App">
      <AppHeader />
      <div className = "ProjectContent">
        <div className = "ProjectsRoot">
          <h1 className="ArtistName Roboto orange">CLM</h1>
          <div className="ArtistBio Roboto greywhite">
            is a techno & hard techno project, exploring the brutality and industrialness of a dark universe filled with frenzied melodies.
          </div>
          <MusicProjects projects = {musicProjects} />
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

export default MusicPage;