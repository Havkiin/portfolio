import React from 'react';
import HomePage from './pages/HomePage.tsx';
import YisstPage from './pages/YisstPage.tsx';
import MoonPage from './pages/MoonPage.tsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavigationProvider } from './hooks/NavigationContext.tsx';
import NavigationTracker from './components/NavgationTracker.tsx'
import './styles/App.css';

export enum Pages {
  Home = '/',
  Yisst = '/yisst',
  Moon = '/moon'
}

const App: React.FC = () => {
  return (
    <Router>
        <NavigationProvider>
          <NavigationTracker/>
          <Routes>
            <Route path={Pages.Home} element={<HomePage />} />
            <Route path={Pages.Yisst} element={<YisstPage />} />
            <Route path={Pages.Moon} element={<MoonPage />} />  
          </Routes>
        </NavigationProvider>
    </Router>
  );
};

export default App;
