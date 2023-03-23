import React, { useContext } from "react";
import './topMenu.styles.scss';
import {ActiveMenuContext, IsDarkContext} from '../../../context/context';

import moon from '../../../assets/icons/moon.png';
import sun from '../../../assets/icons/sun.png';
import notification from '../../../assets/icons/notification.png';
import profilePic from '../../../assets/profiles/3.png';

export const TopMenu = (props) => {

  const {activeMenu, setActiveMenu} = useContext(ActiveMenuContext);
  const {isDark, setIsDark } = useContext(IsDarkContext);
  
  return (
    <div 
    className={`topMenu-container 
    ${activeMenu ? "activeMenu" : ''} 
    ${isDark ? 'isDark' : 'isLight'}`}>

      <button className="hamburger" type="button" onClick={() => activeMenu ? setActiveMenu(false) : setActiveMenu(true)} >
        <span ></span>
        <span ></span>
        <span ></span>
      </button>  


      <label className="title">{props.title}</label>
        <div className="image-container">
          <img 
            src={isDark ? sun : moon} 
            alt="isDark" 
            className="icons isDarkImage"
            onClick={() => isDark ? setIsDark(false) : setIsDark(true)}
            />
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