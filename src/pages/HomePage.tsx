import React from 'react';
import { useState } from 'react';
import headshot from '/headshot.jpg';
import { Link } from 'react-router-dom';
import { Routes } from '../routes/Routes';
import { resume, ResumeItem } from '../components/Data';
import AppFooter from '../components/AppFooter';
import '../styles/App.css';
import '../styles/Home.css';
import AppHeader from '../components/AppHeader';

function DisplayResumeItems({ items } : { items : ResumeItem[] }) {
  const [hoveredItem, setHoveredItem] = useState<ResumeItem | null>(null);
  const itemsCount = items.length;

  return (
    <div className = "Resume">
      <div className = "ResumeItems">
        {items.map((item, index) => (
          <div className = "ResumeSquareAndSeparator" key = {index}>
            <div className = "ResumeSquare" onMouseEnter = {() => setHoveredItem(item)}>
              <div className = "ResumeSquareImageRoot">
                <a href = {item.link}>
                  <img src={item.image} className = "ResumeSquareImage"/>
                </a>
              </div>
              <div className = "ResumeSquareTitleRoot">
                <span className = "ResumeSquareTitle">{item.title}</span>
                <span className = "ResumeSquareTitle">{item.years}</span>
              </div>
            </div>
            {index < itemsCount - 1 && <hr className = "ResumeSquareSeparator" />}
          </div>
        ))}
      </div>
      <div className = "ResumeItemDescription">
        {hoveredItem && <p>{
          hoveredItem.description
        }</p>}
      </div>
    </div>
  );
}
    
function HomePage () {
  return (
    <div className="App">
      <AppHeader />
      <div className="Content">
        <div className="ScrollPage">
          <div className="IntroRoot">
            <div className="HeadshotRoot blog-shadow-dreamy">
              <img src={headshot} className="HeadshotImage" alt="logo" />
            </div>
            <div className="BioRoot">
              <p className="BioContent">
                Hi ! My name is Clément Hennebelle, and I'm a programmer and artist. My works include <Link to={Routes.programming} className="textLink orange">programming</Link> (games & web), <Link to={Routes.visuals} className="textLink orange">visuals</Link>, and <Link to={Routes.music} className="textLink orange">music production</Link>.
              </p>
            </div>
          </div>
        </div>
        <div className = "ScrollPage">
          <h1 className = "ResumeTitle Roboto orange">CAREER</h1>
          <DisplayResumeItems items = {resume} />
        </div>
        <div className = "ScrollPage">
          <h1 className = "ResumeTitle Roboto orange">SAY HI :)</h1>
          <div className = "ContactContainer greywhite">
            <p>I am currently looking for a new challenge! If you think we'd be a good fit working together, or have any questions, you can reach me here.</p>
            <a className = "Email Roboto" href="mailto:clement.hennebelle@hotmail.fr">clement.hennebelle@hotmail.fr</a>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

export default HomePage;