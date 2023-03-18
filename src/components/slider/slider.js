import React, { useEffect, useState } from "react";
import { GetGamesApi } from "../../services/API/games.api";
import defaultImage  from '../../assets/games/default.png'
import next  from '../../assets/icons/next.png'
import prev  from '../../assets/icons/previous.png'

import './slider.styles.scss';

export const Slider = () => {

  const[games, setGames] = useState([]);
  const[error, setError] = useState({});

  const [currentIndex, setCurrentIndex] = useState(0);

  const getGames = async () => {

    const header = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    let response = await GetGamesApi(header); 
      if(response.status === 200) {
       setGames(response.data);
      }
      if(response.status === 500) {
        setError({getGames:'Ups! We have a problems getting the games list'})
      }
      if(response.status === 403) {
        setError({getGames:'Ups! We found a communication problem with the server'})
      }
      if(response.status === 404) {
        setError({getGames:'Ups! We didn\'t find the correct link to get the games list'})
      }
  }

  useEffect(() => {
    getGames();
  },[])

  const getImageUrl = (imageNumber) => {

    let image;
    try {
      image = require(`../../assets/games/${imageNumber}.png`);
    } catch (error) {
      image = defaultImage;
    }

    return <img src={image} alt={imageNumber} />;


  }

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
    <div className="slider-container">
      
      <img src={prev} alt="prev" className="prev" onClick={prevImage} />

      <div className="slider-grid">
        {games.slice(currentIndex, currentIndex + 6).map((game) => {
          return (
            <div key={game.id} className="slider">
              <div>
                <img src={getImageUrl(game.image).props.src} alt={game.name} />
              </div>
              
            </div>
          );
        })}
      </div>
      
      <img src={next} alt="next" className="next" onClick={nextImage}/>
    
    </div>

  )
  }