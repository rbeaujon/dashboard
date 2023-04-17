import React, { useContext, useEffect, useState } from 'react';
import searchIcon from "../../../assets/icons/find.png"
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


  const sortByCategory = (a, b) => {
    return sortedOrder === 'ASC' 
      ? a.category.localeCompare(b.category)
      : b.category.localeCompare(a.category);
  }
  const sortByCreation = (a, b) => {
    const dateA = a.creation.split('/').reverse();
    const dateB = b.creation.split('/').reverse();
    return sortedOrder === 'ASC' 
      ? new Date(dateA[0], dateA[1] - 1, dateA[2]) - new Date(dateB[0], dateB[1] - 1, dateB[2])
      : new Date(dateB[0], dateB[1] - 1, dateB[2]) - new Date(dateA[0], dateA[1] - 1, dateA[2]);
  }

  const sortByRanges = (a, b) => {
    return sortedOrder === 'ASC' 
      ? a.ranges - b.ranges
      : b.ranges - a.ranges;
  }
  
  const sortData = (sortBy) => {
    let sorted = [...sortedGames];
    if (sortBy === "category") {
      sorted.sort(sortByCategory);
    } else if (sortBy === "creation") {
      sorted.sort(sortByCreation);
    } else if (sortBy === "ranges") {
      sorted.sort(sortByRanges);
    } else if (search.length > 0) {
      if ((/^[0-9]+$/).test(search)) {
        sorted = games.filter(elem => String(elem.id).includes(String(search))); 
      } else if (!(/^[0-9]+$/).test(search)) {
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
    <div className={`${isDark ? 'isDark' : ''}`} >
      <img src={add} className="gameList-add" onClick={() => setIsOpen({add: true})}/> 
      <input 
        type="text" 
        className="gameList-search" 
        placeholder="Search ID or Name"
        data-testid="search"
        onChange={(e) => setSearch( e.target.value)}
      />
      <img src={searchIcon} className="gameList-searchIcon" alt="search"/>
      <div className="gameList-main"  data-testid="game-list">
        <div className="gameList-container">
          <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th data-testid={'game-row'}>ID</th>
                  <th>Name</th>
                  <th>
                    <div className='sortCategory' data-testid='category' >
                      Category  
                      <img src={sort} alt='sortCategory'
                        onClick={() => {
                        setSortedOrder(sortedOrder === "ASC" ? "DESC" : "ASC")
                        sortData("category")}}
                      />
                    </div> 
                  </th>
                  <th>
                    <div className='sortDate'>
                      Creation Date  
                      <img src={sort} alt='sortDate'
                        onClick={() => {
                        setSortedOrder(sortedOrder === "ASC" ? "DESC" : "ASC")
                        sortData("creation")}}
                      />
                    </div>
                  </th>
                  <th>
                    <div className='sortRange'>
                      Range
                      <img src={sort} alt='sortRange'
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