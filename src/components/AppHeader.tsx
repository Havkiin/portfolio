import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Routes } from '../routes/Routes';

function AppHeader () {
  const location = useLocation();

  const pages : Routes[] = [
    Routes.home,
    Routes.programming,
    Routes.visuals,
    Routes.music,
  ]
  
  function DisplayPages({ pages } : { pages : Routes[] }) {
    return pages.map((item, index) => {
      const isCurrentPage = location.pathname === `${pages[index].toLowerCase()}`;
      const classes = "HeaderItem" + (isCurrentPage ? " orange" : "");
      return (
        <div className={classes} key={index}>
          <Link to = {pages[index]}>{item.charAt(1).toUpperCase() + item.slice(2)}</Link>
        </div>
    )});
  }

  return (
    <div className="AppHeader">
        <DisplayPages pages = {pages}/>
    </div>
  );
}

export default AppHeader;