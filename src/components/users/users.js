import React, { useEffect, useState } from "react";
import { LeftMenu } from "../menu/leftMenu";
import { TopMenu } from "../menu/topMenu";
import { UsersApi } from "../../services/API/users.api";
import Loader from "../../helpers/Loader/loader";

import add from "../../assets/icons/add.png"
import edit from "../../assets/icons/edit.png"
import trash from "../../assets/icons/trash.png"
import sort from "../../assets/icons/sort.png"
import searchIcon from "../../assets/icons/search.png"

import './users.styles.scss';
import { UsersModal } from "./usersModal";

export const Users = () => {

  const[users, setUsers] = useState([])
  const[search, setSearch] = useState('');
  const[error, setError] = useState({});
  const[loading, setLoading] = useState(false);
  const[isOpen, setIsOpen] = useState({}) 
  const[isOk, setIsOk] = useState(false);
  const [sortedUsers, setSortedUsers] = useState(users);
  const [sortedOrder, setSortedOrder] = useState('ASC');

  const getUsers = async () => {

    setLoading(true);
  
    const header = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
  
    try {
      let response = await UsersApi(header)
  
      setLoading(false);
  
      if(response.status === 200) {
        setUsers(response.data);
      }
      if(response.status === 500) {
        setError({message:'Ups! We have a problems getting the users list'})
      }
      if(response.status === 403) {
        setError({message:'Ups! We found a communication problem with the server'})
      }
      if(response.status === 404) {
        setError({message:'Ups! We didn\'t find the correct link to get the users list'})
      }
    } catch (error) {
      setLoading(false);
      setError({message:'Ups! We found a communication problem with the server, we are no able to show the slider game'})
    }
  }

  useEffect(() => {
    getUsers()

    const decodedProfileImageUsers = users.map(user => {
      const imageUrl = user.pic; 
      const blob = new Blob([imageUrl], { type: 'image/jpeg' }); 
      const imageUrlObject = URL.createObjectURL(blob); 
      user.pic = imageUrlObject; 
      return user;
    });

    setUsers(decodedProfileImageUsers);
  },[isOk])

  const sortData = (sortBy) => {

    let sorted = [...sortedUsers];
    
    if (sortBy === "email") {
      sortedOrder === 'ASC' 
      ? sorted.sort((a, b) => a.category.localeCompare(b.category))
      : sorted.sort((b, a) => a.category.localeCompare(b.category))
    } else if (sortBy === "status") {
      sortedOrder === 'ASC' 
      ? sorted.sort((a, b) => a.ranges - b.ranges)
      : sorted.sort((b, a) => a.ranges - b.ranges)
    } else if(search.length > 0) {

      if((/^[0-9]+$/).test(search) ){
        sorted = users.filter(elem =>  String(elem.id).includes(String(search))); 
      } else if(!(/^[0-9]+$/).test(search) ){
        sorted = users.filter(elem => elem.name.toLowerCase().includes(search.toLowerCase()))
      }

    } else {
      sorted = [...users];
    }
    setSortedUsers(sorted);
  }

  useEffect(() => {
    sortData()
  },[users, search])

  return (
    <div>
      <TopMenu title="Users"/>
      <LeftMenu/>
      {loading && <Loader/>}
      {(Object.entries(isOpen)).length > 0 && <UsersModal isOpen={isOpen} setIsOpen={setIsOpen} isOk={isOk} setIsOk={setIsOk}  /> }
      <img src={add} className="usersList-add" onClick={() => setIsOpen({add: true})}/> 
      <input 
            type="text" 
            className="users-search" 
            placeholder="Search ID or Name"
            onChange={(e) => setSearch( e.target.value)}
          />
      <img src={searchIcon} className="users-searchIcon" alt="search"/>
      <div className="users-main">
        <div className="users-container">

        <div className="user-table">
            <table>
              <thead>
                <tr>
                  <th>Pic</th>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email
                  <img src={sort} alt='sort'
                    onClick={() => {
                      setSortedOrder(sortedOrder === "ASC" ? "DESC" : "ASC")
                      sortData("email")}}
                    /> 
                  </th>
                  <th>Address</th>
                  <th>Status
                  <img src={sort} alt='sort'
                    onClick={() => {
                      setSortedOrder(sortedOrder === "ASC" ? "DESC" : "ASC")
                      sortData("status")}}
                    /> 
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>           
                {sortedUsers && sortedUsers.map(user => {
                  return (
                    <tr key={user.id}>
                      <td className="profile-pic-main">
                        <div className="profile-pic-container">
                          <img
                            src={user.pic}
                            alt="profile pic"
                          />
                          <div className={`img-info ${user.level === 'ux/ui' ? 'ux-ui' : user.level}`}>{user.level}</div>
                        </div>
                      </td>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td id="email">{user.email}</td>
                      <td>{user.address}</td>
                      <td>{user.status}</td>
                      <td className='users-action'>
                        <img src={edit} onClick={() => setIsOpen({edit: true, data: user})} />
                        <img src={trash} onClick={() => setIsOpen({delete: true, data: user})} />
                    
                      </td>   
                    </tr>
                      
                  )
                })}
                
              </tbody>

            </table>
        </div>
        </div>
      </div>
    </div>
  )
  }