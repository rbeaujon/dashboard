import React, { useContext } from "react";
import './topMenu.styles.scss';
import {ActiveMenuContext} from '../../../context/context';

import moon from '../../../assets/icons/moon.png';
import notification from '../../../assets/icons/notification.png';
import profilePic from '../../../assets/profiles/3.png';

export const TopMenu = (props) => {

  const {activeMenu, setActiveMenu} = useContext(ActiveMenuContext);
  
  return (
    <div className={`topMenu-container ${activeMenu ? "activeMenu" : ''}`}>

      <button className="hamburger" type="button" onClick={() => activeMenu ? setActiveMenu(false) : setActiveMenu(true)} >
        <span ></span>
        <span ></span>
        <span ></span>
      </button>  


      <label className="title">{props.title}</label>
        <div className="image-container">
          <img src={moon} alt="isDark" className="icons isDark"  />
          <img src={notification} alt="notifications" className="icons notifications" />
          <img src={profilePic} alt="notifications" className="profile-pic"/>  
        </div>
      <div className="profileInfo">
        <div className="profileInfo__name">Ricardo Beaujon</div>
        <div className="profileInfo__level">Admin</div>
      </div>
    </div>
  )

}