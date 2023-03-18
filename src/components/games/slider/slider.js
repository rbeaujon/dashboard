import React, { useEffect, useState } from "react";

import next  from '../../../assets/icons/next.png'
import prev  from '../../../assets/icons/previous.png'
import defaultImage  from '../../../assets/games/default.png'

import './slider.styles.scss';

export const Slider = (props) => {

  const {games, error, selectedGame,  setSelectedGame} = props;
  const[currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex - 6 < 0 ? 0 : currentIndex === 0 ? games.length - 6 : currentIndex- 6
    );
  };

  const nextImage = () => {
    setCurrentIndex((currentIndex) =>
      currentIndex + 6 > games.length ? currentIndex : currentIndex + 6
    );
  };

  return (
    <div className="slider-main">
    
      <div className="slider-container"> 
        {error && <span className="slider-error">{error.getGames}</span> }
        <img src={prev} alt="prev" className="prev" onClick={prevImage} />
        <div className="slider-grid">
          {games && games.slice(currentIndex, currentIndex + 6).map((game) => {
            return (
              <div key={game.id} className="slider">
                <div className="image-container">
                  <div className="image-frame">
                    <div>{game.name}</div>
                  </div>
                  <img 
                    src={game.image}
                    alt={game.name} 
                    onClick={() => setSelectedGame(game.image)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultImage; 
                    }}
                  />
                </div>           
              </div>
            );
          })}
        </div>
        <img src={next} alt="next" className="next" onClick={nextImage}/>
      </div>
      <div className="game-selected">
        {games.length > 0
        && <img 
        src={selectedGame}
        alt={selectedGame}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultImage; 
        }}
      /> }
      </div>
    </div>


  )
  }