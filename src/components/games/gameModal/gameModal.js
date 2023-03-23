import React, {useContext, useEffect, useState} from "react";
import { checkUrlImage } from "../../../helpers/checkUrlImage";
import Loader from "../../../helpers/Loader/loader";
import { GamesApi } from "../../../services/API/games.api";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './gameModal.styles.scss';
import { IsDarkContext } from "../../../context/context";


export const GameModal = (props) => {

  const fields = {
    name: '', 
    category: '', 
    date: '',
    range: '',
    image: ''
  }
  const {isOpen, setIsOpen, isOk, setIsOk} = props;
  const {data} = isOpen;
  const [toCreate, setToCreate] = useState(fields);
  const [toEdit, setToEdit] = useState(fields);
  const [error, setError] = useState({empty:[]});
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const {isDark} = useContext(IsDarkContext);

  const handleCreate = async () => {
    
    setLoading(true);

    const values = Object.values(toCreate);
    
    if (values.some((value) => !value)) {
      setError({ empty: values.map((value, index) => value ? '' : Object.keys(fields)[index]), message: "Missing fields, Registration Failed." });
      setTimeout(() => {
        setError({ empty: values.map((value, index) => value ? '' : Object.keys(fields)[index])})
      }, 5000)
    } else if(!values.some(e => e === "")){
        
      const validUrl = checkUrlImage(toCreate.image);

      if(validUrl){

     
      const date = handleDate();
        
      const dataToCreate = {
        name: toCreate.name,
        category: toCreate.category,
        image: toCreate.image,
        date,
        range: toCreate.range
      }

      const header = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToCreate)
      };

      try {
        let response = await GamesApi(header)
    
        setLoading(false);
    
        if(response.status === 200) {
          setIsOk(true)
          setError({empty:[]})

          setTimeout(() => {
            setIsOk(false)
            setIsOpen({})
          }, 5000)
        }
        if(response.status === 500) {
          setError({...error,message:'Error registering the game'})
        }
        if(response.status === 403) {
          setError({...error,message:'Ups! We found a communication problem with the server'})
        }
        if(response.status === 404 || response.status === 400) {
          setError({...error,message:'Ups! internal problems with the create request'})
        }
      } catch (error) {
        setLoading(false);
        setError({...error, message:'Ups! We found a communication problem with the server, we can not register the game'})
      }
      setTimeout(() => {
        setError({empty:[]})
      }, 5000)
      } else {
        setError({...error, message:'URL is not valid'});
        setTimeout(() => {
        setError({empty:[]})
        }, 5000)
      } 
  }
}

  const handleEdit = async() => {
    
    setLoading(true);

    const values = Object.values(toEdit);

    if (values.some((value) => value !== "" )) {

      const dataFiltered = Object.entries(toEdit).filter(e => e[1] !== "" )
      const header = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({edit: dataFiltered, id:data.id})
      };
    
      try {
        let response = await GamesApi(header)
    
        setLoading(false);
    
        if(response.status === 200) {
          setIsOk(true)
          setError({empty:[]})

          setTimeout(() => {
            setIsOk(false)
            setIsOpen({})
          }, 5000)
        }
        if(response.status === 500) {
          setError({...error,message:'Error editing the game'})
        }
        if(response.status === 403) {
          setError({...error,message:'Ups! We found a communication problem with the server'})
        }
        if(response.status === 404 || response.status === 400) {
          setError({...error,message:'Ups! internal problems with the edit request'})
        }
      } catch (error) {
        setLoading(false);
        setError({...error, message:'Ups! We found a communication problem with the server, we can not delete the game'})
      }
      setTimeout(() => {
        setError({empty:[]})
      }, 5000)
    } else {
      setError({empty:[], message: "Nothing to Edit"})
      setTimeout(() => {
        setError({empty:[]})
      }, 5000)
    } 
  }

  const handleDelete = async () => {

    setLoading(true);
  
    const header = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:data.id})
    };
  
    try {
      let response = await GamesApi(header)
  
      setLoading(false);
  
      if(response.status === 200) {
        setIsOk(true);
        setError({empty:[]})
        setTimeout(() => {
          setIsOpen({})
          setIsOk(false)
        }, 5000)
      }
      if(response.status === 500) {
        setError({...error, message:'Ups! We have a problems to delete the game'})
      }
      if(response.status === 403) {
        setError({...error, message:'Ups! We found a communication problem with the server'})
      }
      if(response.status === 404 || response.status === 400) {
        setError({...error, message:'Ups! We internal problems with the delete request'})
      }
    } catch (error) {
      setLoading(false);
      setError({...error, message:'Ups! We found a communication problem with the server, we can not delete the game'})
    }
  }

  const handleDate = () => {
    const dateStr = toCreate.date.toString().split(' ');
    const dateObj = new Date(toCreate.date.toString());
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    return `${dateStr[2]}/${month}/${dateStr[3]}`
  }
  useEffect(() => {
    let timer
    
    if(isOk){
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }else{
      timer = 0
    }
    return () => clearTimeout(timer);
  }, [isOk, timeLeft]);

  return (
    <div className={`usersModal-overlay ${isDark && "isDark"}`}>

      {loading && <Loader/>}
      <div className={`gamesModal-frame ${isOpen.add ? 'add' : 
        isOpen.edit ? 'edit' :
        isOpen.delete ? 'delete' : ''
        }`}
      >
        {isOpen.add &&
        <div className="gamesModal-add">
          
          <div className="form">
            <div className={`form-div ${error.empty.includes('name') ? 'error-empty' : '' }`}>
     
              <input 
                type="text" 
                name="name" 
                id="name"  
                placeholder="Name" 
                value={toCreate.name} 
                onChange={(e) => setToCreate({...toCreate, name: e.target.value.toLowerCase()})}  
              />
              <span className="error-empty">{`${ error.empty.includes('name') ? '*' : ''}`}</span>
            </div>
            <div className={`form-div ${error.empty.includes('category') ? 'error-empty' : '' }`}>
         
              <select
              onChange={(e) => setToCreate({...toCreate, category: e.target.value})}
              >
                  <option value="">Category</option>
                  <option value="casino">Casino</option>
                  <option value="board">Board</option>
                  <option value="shooter">Shooter</option>
                  <option value="adventure">Adventure</option>
                  <option value="sandbox">Sandbox</option>
                  <option value="roller">Roller</option>
                  <option value="sport">Sports</option>
                  <option value="racing">Racing</option>
                  <option value="puzzle">Puzzle</option>

              </select>
              <span className="error-empty">{`${ error.empty.includes('category') ? '*' : ''}`}</span>
            </div>
            
            <div className={`form-div ${error.empty.includes('date') ? 'error-empty' : '' }`}>
              <DatePicker
                showIcon
                selected={toCreate.date}
                onChange={(e) => setToCreate({...toCreate, date: e})}
                dateFormat="dd/MM/yyyy"
                placeholderText="Date"
                id="DatePicker"
              />
              <span className="error-empty">{`${ error.empty.includes('date') ? '*' : ''}`}</span>

            </div>
            <div className={`form-div ${error.empty.includes('range') ? 'error-empty' : '' }`}>
      
              <select
              name="range" 
              id="range"  
              placeholder="Range" 
              value={toCreate.range} 
              onChange={(e) => setToCreate({...toCreate, range:(e.target.value)})
              }>
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option> 
                <option value="21">21</option>
              </select> 
                
              <span className="error-empty">{`${ error.empty.includes('range') ? '*' : ''}`}</span>

            </div>
            <div className={`form-div ${error.empty.includes('image') ? 'error-empty' : '' }`}>
         
             <input 
              type="text" 
              name="image" 
              id="image"  
              placeholder="Image URL" 
              value={toCreate.image} 
              onChange={(e) => setToCreate({...toCreate, image: e.target.value})}
            />
             <span className="error-empty">{`${ error.empty.includes('image') ? '*' : ''}`}</span>
            </div>

          </div>
          {error.message && <div className={`${error.message ? 'error-message' : '' }`}>{error.message}</div>}
          {isOk && <div className="isOk-message">
            Created successfully 
            <div> 
              <label>close: </label>
              {timeLeft}
            </div>
          </div>}
          <div className="buttons">
              <div>
                <input
                    type="button"
                    id="button-cancel"
                    value="Cancel"
                    onClick={() => {
                      setIsOpen({});
                    }}
                  />
              </div>
              <div>
                <input
                  type="button"
                  id="button-submit"
                  value="Add"
                  onClick={() => {
                    handleCreate()
                  }}
                />
              </div>
          </div>
        </div>
        }

        {isOpen.edit &&
        <div className="gamesModal-edit">
          <div className="form">
            <div className={`form-div ${error.empty.includes('name') ? 'error-empty' : '' }`}>
     
              <input 
                type="text" 
                name="name" 
                id="name"  
                placeholder="Name" 
                value={toEdit.name || data.name} 
                onChange={(e) => setToEdit({...toEdit, name: e.target.value})}  
              />
              <span className="error-empty">{`${ error.empty.includes('name') ? '*' : ''}`}</span>
            </div>
            <div className={`form-div ${error.empty.includes('category') ? 'error-empty' : '' }`}>
         
              <select
              onChange={(e) => setToEdit({...toEdit, category: e.target.value})}
              value={toEdit.category || data.category }
              >
                  <option value="">Select</option>
                  <option value="casino">Casino</option>
                  <option value="board">Board</option>
                  <option value="shooter">Shooter</option>
                  <option value="adventure">Adventure</option>
                  <option value="sandbox">Sandbox</option>
                  <option value="roller">Roller</option>
                  <option value="sport">Sports</option>
                  <option value="racing">Racing</option>
                  <option value="puzzle">Puzzle</option>

              </select>
              <span className="error-empty">{`${ error.empty.includes('category') ? '*' : ''}`}</span>
            </div>
            <div className={`form-div ${error.empty.includes('date') ? 'error-empty' : '' }`}>
      
              <input 
                type="text" 
                name="date" 
                id="date"  
                placeholder="Date" 
                value={toEdit.date || data.creation}
                onChange={(e) => setToEdit({...toEdit, date: e.target.value})}
              />
              <span className="error-empty">{`${ error.empty.includes('date') ? '*' : ''}`}</span>

            </div>
            <div className={`form-div ${error.empty.includes('range') ? 'error-empty' : '' }`}>
      
              <input 
                type="text" 
                name="range" 
                id="range"  
                placeholder="Range" 
                value={toEdit.ranges || data.ranges} 
                onChange={(e) => setToEdit({...toEdit, range: e.target.value})}
              />
              <span className="error-empty">{`${ error.empty.includes('range') ? '*' : ''}`}</span>

            </div>
            <div className={`form-div ${error.empty.includes('image') ? 'error-empty' : '' }`}>
         
             <textarea
              type="text" 
              name="image" 
              id="image"  
              placeholder="Image URL" 
              value={toEdit.image || data.image} 
              onChange={(e) => setToEdit({...toEdit, image: e.target.value})}
            />
             <span className="error-empty">{`${ error.empty.includes('image') ? '*' : ''}`}</span>
            </div>

          </div>

          {error.message && <div className={`${error.message ? 'error-message' : '' }`}>{error.message}</div>}
          {isOk && <div className="isOk-message">
            Edited successfully 
            <div> 
              <label>close: </label>
              {timeLeft}
            </div>
          </div>}
          <div className="buttons">
              <div>
                <input
                    type="button"
                    id="button-cancel"
                    value="Cancel"
                    onClick={() => {
                      setIsOpen({});
                    }}
                  />
              </div>
              <div>
                <input
                  type="button"
                  id="button-submit"
                  value="Accept"
                  onClick={() => {
                    handleEdit()
                  }}
                />
              </div>
          </div>
        </div>
        }

        {isOpen.delete &&
        <div className="gamesModal-delete">

          <div className="info-delete">
            Delete the game?
          <div className="game-toDelete">
            {data.name}
            <div><img src={data.image} alt={data.id} /></div>
          
          </div>
          </div>
          {error.message && <div className={`${error.message ? 'error-message' : '' }`}>{error.message}</div>}
          {isOk && <div className="isOk-message">
            Deleted successfully 
            <div> 
              <label>close: </label>
              {timeLeft}
            </div>
          </div>}
                <div className="buttons">
                    <div>
                      <input
                          type="button"
                          id="button-cancel"
                          value="Cancel"
                          onClick={() => {
                            setIsOpen({});
                          }}
                        />
                    </div>
                    <div>
                      <input
                        type="button"
                        id="button-submit"
                        value="Delete"
                        onClick={() => {
                          handleDelete()
                        }}
                      />
                    </div>
                </div>
        </div>
        }
      </div>
    </div>
  )
}