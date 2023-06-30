import React, { useContext } from "react";
import './topMenu.styles.scss';
import {ActiveMenuContext, IsDarkContext} from '../../../context/context';

const moon = require ('../../../assets/icons/moon.png');
const sun = require ('../../../assets/icons/sun.png');
const notification = require ('../../../assets/icons/notification.png');
const profilePic = require ('../../../assets/profiles/3.png');


interface TopMenuProps{
  title: string
}

export const TopMenu = (props:TopMenuProps) => {

  const activeMenuContext = useContext(ActiveMenuContext);
  const activeMenu = activeMenuContext?.activeMenu;
  const setActiveMenu = activeMenuContext?.setActiveMenu;

 
  const  isDarkContext = useContext(IsDarkContext);
  const isDark = isDarkContext?.isDark
  const setIsDark = isDarkContext?.setIsDark


  return (
    <div 
    className={`topMenu-container 
    ${activeMenu ? "activeMenu" : ''} 
    ${isDark ? 'isDark' : 'isLight'}`}>

      <button className="hamburger" type="button" onClick={() => activeMenu ? setActiveMenu!(false) : setActiveMenu!(true)} >
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
            onClick={() => isDark ? setIsDark!(false) : setIsDark!(true)}
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