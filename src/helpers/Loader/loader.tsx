import React from "react";

import './loader.styles.scss';

const Loader = () => {

  return (
<div className="loader-overlay">
  <div className="loader">
    <div className="spin"></div>
    <div className="text-container">
      <div className="cargando">
        <p>Loading</p>
        <div className="dots-container">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Loader