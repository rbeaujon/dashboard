import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import {ActiveMenuContext, IsDarkContext} from "./context/context";

import { Analytics } from './components/analytics';
import { Calendar } from './components/calendar/calendar';
import { Dashboard } from './components/dashboard/dashboard';
import { Games } from './components/games';
import { Messages } from './components/messages';
import { Settings } from './components/settings';
import { Users } from './components/users';
import './App.scss'

function App() {

  const[activeMenu, setActiveMenu] = useState(false);
  const[isDark, setIsDark] = useState(false);
  

  useEffect(() => {
    const body = document.querySelector('body');
    body.classList.toggle('isDark', isDark);
  }, [isDark]);

  return (
    <ActiveMenuContext.Provider value={{ activeMenu, setActiveMenu }}>
      <IsDarkContext.Provider value={{ isDark, setIsDark }}>
          <div className="not-allowed">
            <span>Access not allowed</span>
          </div>
          <BrowserRouter className={`${isDark ? 'isDark' : ''}`}>
            <Routes>
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/" element={<Games />} />
              <Route exact path="/users" element={<Users />} />
              <Route exact path="/analytics" element={<Analytics />} />
              <Route exact path="/messages" element={<Messages />} />
              <Route exact path="/calendar" element={<Calendar />} />
              <Route exact path="/settings" element={<Settings />} />   
            </Routes>
          </BrowserRouter>
      </IsDarkContext.Provider>
    </ActiveMenuContext.Provider>
  );
}

export default App;
