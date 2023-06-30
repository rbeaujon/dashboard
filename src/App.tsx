import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ActiveMenuContext, IsDarkContext } from "./context/context";

import { Analytics } from './components/analytics';
import { Calendar } from './components/calendar/calendar';
import { Dashboard } from './components/dashboard/dashboard';
import { Games } from './components/games/games';
import { Messages } from './components/messages/messages';
import { Settings } from './components/settings/settings';
import { Users } from './components/users/users';
import './App.scss';


const App = () => {
  const [activeMenu, setActiveMenu] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const body = document.querySelector('body');
    body?.classList.toggle('isDark', isDark);
  }, [isDark]);

  return (
    <ActiveMenuContext.Provider value={{ activeMenu, setActiveMenu }}>
      <IsDarkContext.Provider value={{ isDark, setIsDark }}>
        <div className="not-allowed">
          <span>Access not allowed</span>
        </div>
        <BrowserRouter>
          <div  className={`${isDark ? 'isDark' : ''}`}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Games />} />
              <Route path="/users" element={<Users />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </BrowserRouter>
      </IsDarkContext.Provider>
    </ActiveMenuContext.Provider>
  );
}

export default App;
