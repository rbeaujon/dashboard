import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import {ActiveMenuContext, ModeContext} from "./context/context";

import { Analytics } from './components/analytics';
import { Calendar } from './components/calendar/calendar';
import { Dashboard } from './components/dashboard/dashboard';
import { Games } from './components/games';
import { Messages } from './components/messages';
import { Settings } from './components/settings';
import { Users } from './components/users';


function App() {

  const[activeMenu, setActiveMenu] = useState(false);
  const[isDark, setIsDark] = useState('light');
  

  return (
    <ActiveMenuContext.Provider value={{ activeMenu, setActiveMenu }}>
      <ModeContext.Provider value={{ isDark, setIsDark }}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/games" element={<Games />} />
            <Route exact path="/users" element={<Users />} />
            <Route exact path="/analytics" element={<Analytics />} />
            <Route exact path="/messages" element={<Messages />} />
            <Route exact path="/calendar" element={<Calendar />} />
            <Route exact path="/settings" element={<Settings />} />   
          </Routes>
        </BrowserRouter>
      </ModeContext.Provider>
    </ActiveMenuContext.Provider>
  );
}

export default App;
