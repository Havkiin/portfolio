import React, { useRef, useEffect, useState } from 'react';
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter';
import { VisualProject, visualProjects } from '../components/Data';
import '../styles/ProjectCatalog.css';
import '../styles/VisualsPage.css';

function Visuals ({ visuals, vidRef } : { visuals : VisualProject[], vidRef : React.RefObject<HTMLVideoElement> }) {
  const [currentVisual, setCurrentVisual] = useState(0);
  const [animationDirection, setAnimationDirection] = useState('');

  const handleVisualChange = (direction: 'next' | 'prev') => {
    // Set the animation class based on direction
    setAnimationDirection(direction === 'next' ? 'enter-up' : 'enter-down');

    if (direction === 'next') {
      setCurrentVisual(currentVisual + 1);
    } else {
      setCurrentVisual(currentVisual - 1);
    }

    setTimeout(() => setAnimationDirection(''), 500);
  };

  useEffect(() => {
    if (vidRef.current) {
      vidRef.current.src = visuals[currentVisual].source;
      vidRef.current.load();
      vidRef.current.play();
    }
  }, [currentVisual, vidRef, visuals]);

  return (
    <div className = "VideoRoot">
      <video width='100%' height='100%' ref={vidRef} loop>
        <source src={visuals[currentVisual].source} type='video/mp4'/>
      </video>
      {visuals[currentVisual].id > 0 &&
        <a href='#' onClick={() => handleVisualChange('prev')}><div className="prevVideo">↑</div></a>
      }
      <div className={`VideoTitle Roboto ${animationDirection}`}>
        {visuals[currentVisual].name}
      </div>
      <div className="VideoDescription greywhite">
      <p dangerouslySetInnerHTML={{ __html: visuals[currentVisual].description}} />
      </div>
      {currentVisual < visuals.length - 1 &&
        <a href='#' onClick={() => handleVisualChange('next')}><div className="nextVideo">↓</div></a>
      }
    </div>
  );
}

function VisualsPage () {
  const vidRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="App black-background">
      <AppHeader />
      <div className="ProjectContent">
        <Visuals visuals={visualProjects} vidRef={vidRef} />
      </div>
      <AppFooter />
    </div>
  );
}

export default VisualsPage;