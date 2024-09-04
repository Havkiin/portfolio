import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Route, routes } from '../data/Data';
import i18next from 'i18next';

function AppHeader () {
  const location = useLocation();

  const changeLanguage = () => {
    const lng = i18next.resolvedLanguage === 'en' ? 'fr' : 'en';;

    i18next.changeLanguage(lng);
  }
  
  function DisplayPages({ pages } : { pages : Route[] }) {
    return pages.map((_, index) => {
      const isCurrentPage = location.pathname === `${pages[index].path.toLowerCase()}`;
      const classes = "HeaderItem" + (isCurrentPage ? " orange" : "");
      return (
        <div className={classes} key={index}>
          <Link to = {pages[index].path}>{i18next.t(pages[index].translateKey)}</Link>
        </div>
    )});
  }

  return (
    <div className="AppHeader">
        <DisplayPages pages = {routes}/>
        <div className="LanguageSelect"><a href='' onClick={() => changeLanguage()}>{i18next.resolvedLanguage?.toUpperCase()}</a></div>
    </div>
  );
}

export default AppHeader;