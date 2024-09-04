import React from 'react';
import { useState } from 'react';
import headshot from '/headshot.jpg';
import { Link } from 'react-router-dom';
import { Routes } from '../data/Data';
import { resume, ResumeItem } from '../data/Data';
import AppFooter from '../components/AppFooter';
import '../styles/App.css';
import '../styles/Home.css';
import AppHeader from '../components/AppHeader';
import i18next from '../data/Translations';

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
          i18next.t(hoveredItem.description)
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
                {i18next.t('home:bio:intro')} <Link to={Routes.programming} className="textLink orange">{i18next.t('home:bio:programming')}</Link> {i18next.t('home:bio:gamesAndWeb')} <Link to={Routes.visuals} className="textLink orange">{i18next.t('home:bio:visuals')}</Link>, {i18next.t('home:bio:and')} <Link to={Routes.music} className="textLink orange">{i18next.t('home:bio:musicProduction')}</Link>.
              </p>
            </div>
          </div>
        </div>
        <div className = "ScrollPage">
          <h1 className = "ResumeTitle Roboto orange">{i18next.t('home:resume:career')}</h1>
          <DisplayResumeItems items = {resume} />
        </div>
        <div className = "ScrollPage">
          <h1 className = "ResumeTitle Roboto orange">{i18next.t('home:contact:hi')} :)</h1>
          <div className = "ContactContainer greywhite">
            <p>{i18next.t('home:contact:description')}</p>
            <a className = "Email Roboto" href="mailto:clement.hennebelle@hotmail.fr">clement.hennebelle@hotmail.fr</a>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}

export default HomePage;