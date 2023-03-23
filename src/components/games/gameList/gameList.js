import React, { useContext, useEffect, useState } from 'react';
import searchIcon from "../../../assets/icons/search.png"
import add from "../../../assets/icons/add.png"
import edit from "../../../assets/icons/edit.png"
import trash from "../../../assets/icons/trash.png"
import sort from "../../../assets/icons/sort.png"

import './gameList.styles.scss'
import { IsDarkContext } from '../../../context/context';

export const GameList = (props) => {

  const {games, setIsOpen} = props;
  const [sortedGames, setSortedGames] = useState(games);
  const [sortedOrder, setSortedOrder] = useState('ASC');
  const[search, setSearch] = useState('');
  const {isDark } = useContext(IsDarkContext);

  const sortData = (sortBy) => {
    let sorted = [...sortedGames];
    if (sortBy === "category") {
      sortedOrder === 'ASC' 
      ? sorted.sort((a, b) => a.category.localeCompare(b.category))
      : sorted.sort((b, a) => a.category.localeCompare(b.category))
    } else if (sortBy === "creation") {
      sortedOrder === 'ASC' 
      ? sorted.sort((a, b) => {
        const dateA = a.creation.split('/').reverse();
        const dateB = b.creation.split('/').reverse();
        return new Date(dateA[0], dateA[1] - 1, dateA[2]) - new Date(dateB[0], dateB[1] - 1, dateB[2]);
      })
      : sorted.sort((b, a) => {
        const dateA = a.creation.split('/').reverse();
        const dateB = b.creation.split('/').reverse();
        return new Date(dateA[0], dateA[1] - 1, dateA[2]) - new Date(dateB[0], dateB[1] - 1, dateB[2]);
      });
    } else if (sortBy === "ranges") {
      sortedOrder === 'ASC' 
      ? sorted.sort((a, b) => a.ranges - b.ranges)
      : sorted.sort((b, a) => a.ranges - b.ranges)
    } else if(search.length > 0) {

      if((/^[0-9]+$/).test(search) ){
        sorted = games.filter(elem =>  String(elem.id).includes(String(search))); 
      } else if(!(/^[0-9]+$/).test(search) ){
        sorted = games.filter(elem => elem.name.toLowerCase().includes(search.toLowerCase()))
      }

    } else {
      sorted = [...games]
    }
    setSortedGames(sorted);
  }

  useEffect(() => {
    sortData();
  },[games])

  useEffect(() => {
    sortData()
  },[search])

  
  return (
    <div className={`${isDark ? 'isDark' : 'isLight'}`}>
      <img src={add} className="gameList-add" onClick={() => setIsOpen({add: true})}/> 
      <input 
        type="text" 
        className="gameList-search" 
        placeholder="Search ID or Name"
        onChange={(e) => setSearch( e.target.value)}
      />
      <img src={searchIcon} className="gameList-searchIcon" alt="search"/>
      <div className="gameList-main">
        <div className="gameList-container">
          <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>
                    <div className='sortCategory'>
                      Category  
                      <img src={sort} alt='sort'
                        onClick={() => {
                        setSortedOrder(sortedOrder === "ASC" ? "DESC" : "ASC")
                        sortData("category")}}
                      />
                    </div> 
                  </th>
                  <th>
                    <div className='sortDate'>
                      Creation Date  
                      <img src={sort} alt='sort'
                        onClick={() => {
                        setSortedOrder(sortedOrder === "ASC" ? "DESC" : "ASC")
                        sortData("creation")}}
                      />
                    </div>
                  </th>
                  <th>
                    <div className='sortRange'>
                      Range
                      <img src={sort} alt='sort'
                        onClick={() => {
                        setSortedOrder(sortedOrder === "ASC" ? "DESC" : "ASC")
                        sortData("ranges")}}
                      />
                      </div> 

                  </th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>           
                {sortedGames && sortedGames.map(game => {
                return (
                  <tr key={game.id}>
                    <td>{game.id}</td>
                    <td>{`#G-${game.id}`}</td>
                    <td id="name">{game.name}</td>
                    <td id="category">{game.category}</td>
                    <td>{game.creation}</td>
                    <td>{game.ranges}</td>
                    <td>{game.status}</td>
                    <td className='gameList-action' >
                      <img src={edit} onClick={() => setIsOpen({edit: true, data: game})} />
                      <img src={trash} onClick={() => setIsOpen({delete: true, data: game})} />  
                    </td>              
                  </tr>
                )
              })}  
              </tbody>
          </table>
          
        </div>
        {Object.values(games).length === 0 && <div className={`${Object.values(games).length === 0  ? 'GameListError-message' : '' }`}>No games to show at this moment</div>}
      </div>
  </div>
  )
}