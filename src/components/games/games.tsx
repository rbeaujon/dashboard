import React, { useEffect, useState } from "react";
import { LeftMenu } from "../menu/leftMenu/leftMenu";
import { TopMenu } from "../menu/topMenu/topMenu";
import { Slider } from "./slider/slider";
import { GameList } from "./gameList/gameList";
import { GamesApi } from "../../services/API/games.api";
import Loader from "../../helpers/Loader/loader";
import {GameModal} from './gameModal/gameModal';

// import defaultImage  from '../../assets/games/default.png'

import './games.styles.scss';

interface OpenItem {
  data: any[];
  add?: boolean;
  delete?: boolean;
  edit?: boolean;
}

interface GameModalProps {
  isOpen: OpenItem[];
  setIsOpen: React.Dispatch<React.SetStateAction<{ add?: boolean; edit?: boolean; delete?: boolean; data?: any[] }>>; // Corregir el tipo aquí
  isResponseOk: boolean;
  setIsResponseOk: React.Dispatch<React.SetStateAction<{ isResponseOK: boolean }>>;
}



export const Games = () => {

  const defaultImage = require ('../../assets/games/default.png')
  const[games, setGames] = useState([]);
  const[error, setError] = useState({});
  const[loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState<OpenItem[]>([]);
  
  const[isResponseOk, setIsResponseOk] = useState(false);
  const[selectedGame, setSelectedGame] = useState({image: defaultImage});



  const getGames = async () => {

    setLoading(true);
  
    const header = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
  
    try {
      let response = await GamesApi(header)
  
      setLoading(false);
  
      if(response.status === 200) {
        setGames(response.data);
        setSelectedGame(response.data[0])
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
    } catch (error) {
      setLoading(false);
      setError({getGames:'Ups! We found a communication problem with the server, we are no able to show the slider game'})
    }
  
  }

  useEffect(() => {
    getGames();
  },[isResponseOk])

  return (
    <div className="games-main">
      {(Object.entries(isOpen)).length > 0 && <GameModal isOpen={isOpen} setIsOpen={setIsOpen} isResponseOk={isResponseOk} setIsResponseOk={setIsResponseOk}  /> }
      {loading && <Loader/>}
      <TopMenu title="Games"/>
      <LeftMenu/>
      <Slider 
        games={games} 
        error={error} 
        selectedGame={selectedGame} 
        setSelectedGame={setSelectedGame}
      />
      <GameList
        games={games} 
        setIsOpen ={setIsOpen}
      />


    </div>
  )
  }