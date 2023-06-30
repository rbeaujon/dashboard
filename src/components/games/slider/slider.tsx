import React, { useState } from "react";

import './slider.styles.scss';

interface SliderProps {
  games: Array<any>, 
  error: any
  selectedGame: any,  
  setSelectedGame: any
}

export const Slider = (props: SliderProps) => {

  const {games, error, selectedGame,  setSelectedGame} = props;
  const[currentIndex, setCurrentIndex] = useState(0);
  const[showInfo, setShowInfo] = useState(false);
  const next = require('../../../assets/icons/next.png');
  const prev = require('../../../assets/icons/previous.png');
  const defaultImage = require('../../../assets/games/default.png');

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
                    onClick={() => setSelectedGame(game)}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = defaultImage;
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
        && 
        <div className="game-selected-main">
          <img 
            src={selectedGame.image}
            alt={selectedGame.name}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '../../../assets/games/default.png';
            }}
            
          />
          <div className={`game-selected-infoContainer 
          ${showInfo ? 'showInfo' : 'hideInfo'}`}
          onClick={() => showInfo ? setShowInfo(false): setShowInfo(true)}
          >
            <span>^</span>
            <div className="game-selected-info">
              <div><label>Name:</label> {selectedGame.name}</div>
              <div><label>Range:</label> {selectedGame.ranges}+</div>
              <div><label>Category:</label> {selectedGame.category}</div>
              <div><label>Creation Date:</label> {selectedGame.creation}</div>
            </div>
          </div>
        </div>
      }
       
      </div>
    </div>
  )
  }