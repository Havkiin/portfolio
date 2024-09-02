import React from 'react';
import HomePage from './pages/HomePage.tsx';
import ProgrammingPage from './pages/ProgrammingPage.tsx';
import MusicPage from './pages/MusicPage.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import VisualsPage from './pages/VisualsPage.tsx';
import ProjectPage from './pages/ProjectPage.tsx';
import { programmingProjects } from './components/Data';
import { Routes } from './routes/Routes';
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
    path: Routes.default,
    element: <HomePage />,
  },
  {
    path: Routes.home,
    element: <HomePage />,
  },
  {
    path: Routes.programming,
    element: <ProgrammingPage />,
  },
  ...projectPages,
  {
    path: Routes.visuals,
    element: <VisualsPage />,
  },
  {
    path: Routes.music,
    element: <MusicPage />,
  }
  ]);

  return (
    <RouterProvider router = {router}></RouterProvider>
  )
}

export default App;
