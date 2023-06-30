import React, { useContext} from "react";
import { useNavigate } from "react-router-dom";

import './leftMenu.styles.scss';
import {ActiveMenuContext, IsDarkContext} from '../../../context/context';


export const LeftMenu = () => {

  const activeMenuContext = useContext(ActiveMenuContext);
  const activeMenu = activeMenuContext?.activeMenu;
  const setActiveMenu = activeMenuContext?.setActiveMenu;

 
  const  isDarkContext = useContext(IsDarkContext);
  const isDark = isDarkContext?.isDark

  const navigate = useNavigate();

  //Import images
  const logo = require('../../../assets/icons/logo.png');
  const dashboard = require( '../../../assets/icons/dashboard.png');
  const users = require( '../../../assets/icons/users.png');
  const games = require( '../../../assets/icons/games.png');
  const analytics = require( '../../../assets/icons/analytics.png');
  const messages = require( '../../../assets/icons/messages.png');
  const calendar = require( '../../../assets/icons/calendar.png');
  const settings = require( '../../../assets/icons/settings.png');


  return (
    <div className={`leftMenu 
      ${activeMenu ? "enable" : ''} 
      ${isDark ? 'isDark' : 'isLight'}`
      } data-testid = "leftMenu">
      <div className={`container `}>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <button 
          className="closeButton" 
          type="button" 
          onClick={() => activeMenu  
          ? setActiveMenu!(false) 
          : setActiveMenu!(true)}
        > X </button> 

        <div className={'icons'}>
          <div onClick={() => { navigate("/dashboard"); setActiveMenu!(false) }}><img src={dashboard} alt="dashboard" /><label>Dashboard</label></div>
          <div onClick={() => { navigate("/users"); setActiveMenu!(false)}}><img src={users} alt="users" /><label>Users</label></div>
          <div onClick={() => { navigate("/"); setActiveMenu!(false) }}><img src={games} alt="games" /><label>Games</label></div>
          <div onClick={() => { navigate("/analytics"); setActiveMenu!(false) }}><img src={analytics} alt="analytics" /><label>Analytics</label></div>
          <div onClick={() => { navigate("/messages"); setActiveMenu!(false) }}><img src={messages} alt="messages" /><label>Messages</label><span>27</span></div>
          <div onClick={() => { navigate("/calendar"); setActiveMenu!(false) }}><img src={calendar} alt="calendar" /><label>Calendar</label></div>
          <div onClick={() => { navigate("/settings"); setActiveMenu!(false) }}><img src={settings} alt="settings" /><label>Settings</label></div>
        </div>


      </div>
    </div>

  )


}