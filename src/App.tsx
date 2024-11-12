import React from 'react';
import HomePage from './pages/HomePage.tsx';
import ProgrammingPage from './pages/CatalogPage.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProjectPage from './pages/ProjectPage.tsx';
import { programmingProjects, RouteEnums } from './data/Data';
import './styles/App.css';

function App () {
  const projectPages = programmingProjects.map((p, i) => {
    return ({
      path: `/programming/${p.name.toLowerCase()}`,
      element: <ProjectPage project={programmingProjects[i]}/>,
    })
  });

  const router = createBrowserRouter ([
  {
    path: RouteEnums.default,
    element: <HomePage />,
  },
  {
    path: RouteEnums.home,
    element: <HomePage />,
  },
  {
    path: RouteEnums.projects,
    element: <ProgrammingPage />,
  },
  ...projectPages
  ]);

  return (
    <RouterProvider router = {router}></RouterProvider>
  )
}

export default App;
