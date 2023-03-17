import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import './leftMenu.styles.scss';
import {ActiveMenuContext} from '../../../context/context';

import logo from '../../../assets/icons/logo.png';
import dashboard from '../../../assets/icons/dashboard.png';
import users from '../../../assets/icons/users.png';
import games from '../../../assets/icons/games.png';
import analytics from '../../../assets/icons/analytics.png';
import messages from '../../../assets/icons/messages.png';
import calendar from '../../../assets/icons/calendar.png';
import settings from '../../../assets/icons/settings.png';

export const LeftMenu = () => {

  const {activeMenu, setActiveMenu} = useContext(ActiveMenuContext);
  const navigate = useNavigate();

  return (
    <div className={`leftMenu ${activeMenu ? "activeMenu" : ''}`}>
      <div className="container">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <button 
          className="closeButton" 
          type="button" 
          onClick={() => activeMenu  
          ? setActiveMenu(false) 
          : setActiveMenu(true)}
        > X </button> 

        <div className={'icons'}>
          <div onClick={() => navigate("/")} ><img src={dashboard} alt="dashboard" /><label>Dashboard</label></div>
          <div onClick={() => navigate("/users")} ><img src={users} alt="users" /><label>Users</label></div>
          <div onClick={() => navigate("/games")} ><img src={games} alt="games" /><label>Games</label></div>
          <div onClick={() => navigate("/analytics")} ><img src={analytics} alt="analytics" /><label>Analytics</label></div>
          <div onClick={() => navigate("/messages")} ><img src={messages} alt="messages" /><label>Messages</label></div>
          <div onClick={() => navigate("/calendar")} ><img src={calendar} alt="calendar" /><label>Calendar</label></div>
          <div onClick={() => navigate("/settings")} ><img src={settings} alt="settings" /><label></label></div>
        </div>

      </div>
    </div>

  )


}