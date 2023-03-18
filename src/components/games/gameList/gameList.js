import React from "react";
import search from "../../../assets/icons/search.png"

import './gameList.styles.scss'

export const GameList = (props) => {

  const {games} = props;
  return (
    <div className="gameList-main">
        <div>
          <input type="text" className="gameList-search" placeholder="Search ID or Name"/>
          <img src={search} className="gameList-searchIcon" alt="search"/>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Creation Date</th>
                <th>Range</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>           
              {games && games.map(game => {
                return (
                  <tr key={game.id}>
                    <td>{game.id}</td>
                    <td>{`#G-${game.id}`}</td>
                    <td id="name">{game.name}</td>
                    <td id="category">{game.category}</td>
                    <td>{game.creation}</td>
                    <td>{game.ranges}</td>
                    <td>{game.status}</td>
                    <td className="gameList-action">...</td>              
                  </tr>
                )
              })}  
            </tbody>
          </table>
        </div>
    </div>
  )
  }