import React, {useContext, useEffect, useState} from "react";
import Loader from "../../../helpers/Loader/loader";
import { UsersApi } from "../../../services/API/users.api";

import "react-datepicker/dist/react-datepicker.css";

import './usersModal.styles.scss';
import { verifyEmail } from "../../../helpers/verifyEmail";
import { IsDarkContext } from "../../../context/context";


export const UsersModal = (props) => {

  const fields = {
    name: '', 
    email: '', 
    address: '',
    level: '',
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


const handleResponse = (response, successCallback, errorCallback) => {
  setLoading(false);
  if (response.status === 200) {
    successCallback();
    setError({ empty: [] });
    setTimeout(() => {
      setIsOpen({});
      setIsOk(false);
    }, 5000);
  } else if (response.status === 500) {
    setError({ ...error, message: 'Ups! delete failed' });
    errorCallback();
  } else if (response.status === 403) {
    setError({ ...error, message: 'Ups! we had a communication problem ' });
    errorCallback();
  } else if (response.status === 404 || response.status === 400) {
    setError({ ...error, message: 'Ups! Internal problem deleting the request' });
    errorCallback();
  }
};

  const handleCreate = async () => {

    setLoading(true);
    const values = Object.values(toCreate);

    if (values.some((value) => !value)) {
      setError({ empty: values.map((value, index) => (value ? '' : Object.keys(fields)[index])), message: 'Missing fields, Registration Failed.' });
      setTimeout(() => {
        setError({ empty: values.map((value, index) => (value ? '' : Object.keys(fields)[index])) });
      }, 5000);
    } else if (!values.some((e) => e === '')) {
      const emailIsOk = verifyEmail(toCreate.email);
      if (emailIsOk) {
        const header = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(toCreate),
        };
        try {
          const response = await UsersApi(header);
          handleResponse(response, () => setIsOk(true), () => setError({ ...error, message: 'Ups! We found a communication problem with the server, we can not register the user' }));
        } catch (error) {
          setLoading(false);
          setError({ ...error, message: 'Ups! We found a communication problem with the server, we can not register the user' });
        }
        setTimeout(() => {
          setError({ empty: [] });
        }, 5000);
      } else {
        setError({ ...error, message: 'The email is not valid' });
        setTimeout(() => {
          setError({ empty: ['email'] });
        }, 5000);
      }
    }
  };

  const handleEdit = async () => {

    setLoading(true);
  
    const dataToEdit = {
      id: data.id,
      name: toEdit.name,
      email: toEdit.email,
      address: toEdit.address,
      level: toEdit.level,
      image: toEdit.image
    }
    const values = Object.values(toEdit);
  
    if (values.some((value) => value !== "" )) {
      const header = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToEdit)
      };
  
      try {
        let response = await UsersApi(header);
  
        handleResponse(response, () => {
          setIsOk(true);
          setError({ empty: [] });
          setTimeout(() => {
            setIsOk(false);
            setIsOpen({});
          }, 5000);
        }, () => {
          setError({ ...error, message: 'Error editing the game' });
        });
  
      } catch (error) {
        setLoading(false);
        setError({ ...error, message: 'Ups! We found a communication problem with the server, we can not delete the game' });
      }
      setTimeout(() => {
        setError({ empty: [] });
      }, 5000);
    } else {
      setError({ empty: [], message: "Nothing to Edit" });
      setTimeout(() => {
        setError({ empty: [] });
      }, 5000);
    }
  };

  const handleDelete = async () => {

    setLoading(true);
  
    const header = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: data.id })
    };
  
    try {
      let response = await UsersApi(header);
  
      handleResponse(response, () => {
        setIsOk(true);
        setError({ empty: [] });
        setTimeout(() => {
          setIsOpen({});
          setIsOk(false);
        }, 5000);
      }, () => {
        setError({ ...error, message: 'Ups! delete failed' });
      });
  
    } catch (error) {
      setLoading(false);
      setError({ ...error, message: 'Ups! We found a communication problem with the server, we could not delete the user' });
    }
  };
  

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
      <div className={`usersModal-frame ${isOpen.add ? 'add' : 
        isOpen.edit ? 'edit' :
        isOpen.delete ? 'delete' : ''
        }`}
      >
      {isOpen.add &&
        <div className="usersModal-add">
          
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
            <div className={`form-div ${error.empty.includes('email') ? 'error-empty' : '' }`}>
              <input 
                type="text" 
                name="email" 
                id="email"  
                placeholder="email" 
                value={toCreate.email} 
                onChange={(e) => setToCreate({...toCreate, email: e.target.value.toLowerCase()})}  
              />
              <span className="error-empty">{`${ error.empty.includes('email') ? '*' : ''}`}</span>
            </div>
            <div className={`form-div ${error.empty.includes('address') ? 'error-empty' : '' }`}>
              <input 
                type="text" 
                name="address" 
                id="address"  
                placeholder="Address" 
                value={toCreate.address}
                onChange={(e) => setToCreate({...toCreate, address: e.target.value.toLowerCase()})}
              />
              <span className="error-empty">{`${ error.empty.includes('address') ? '*' : ''}`}</span>

            </div>
            <div className={`form-div ${error.empty.includes('level') ? 'error-empty' : '' }`}>
              <select
                name="level" 
                id="level"  
                placeholder="Level" 
                value={toCreate.level} 
                onChange={(e) => setToCreate({...toCreate, level: e.target.value.toLowerCase()})}
              >
                <option value="">Level</option>
                <option value="admin">admin</option>
                <option value="dev">dev</option>
                <option value="ux/ui">UX/UI</option>
                <option value="user">user</option>
              </select>
              <span className="error-empty">{`${ error.empty.includes('level') ? '*' : ''}`}</span>

            </div>
            <div className={`form-div ${error.empty.includes('image') ? 'error-empty' : '' }`}>
            <input
              type="file"
              name="image"
              id="image"
              accept="*/*"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                setToCreate({...toCreate, image: reader.result});
                };
              }}
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
        <div className="usersModal-edit">
    
          <div className="edit-pic-container">
            <img
              src={data.pic}
              alt="profile pic"
             />
            <div className={`edit-imgInfo ${data.level === 'ux/ui' ? 'ux-ui' : data.level}`}>{data.level}</div>
          </div>
    
          <div className="form edit">
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
            <div className={`form-div ${error.empty.includes('email') ? 'error-empty' : '' }`}>
              <input 
                type="text" 
                name="email" 
                id="email"  
                placeholder="email" 
                value={toEdit.email || data.email} 
                onChange={(e) => setToEdit({...toEdit, email: e.target.value})}  
              />
              <span className="error-empty">{`${ error.empty.includes('email') ? '*' : ''}`}</span>
            </div>
            <div className={`form-div ${error.empty.includes('address') ? 'error-empty' : '' }`}>
              <input 
                type="text" 
                name="address" 
                id="address"  
                placeholder="Address" 
                value={toEdit.address || data.address}
                onChange={(e) => setToEdit({...toEdit, address: e.target.value})}
              />
              <span className="error-empty">{`${ error.empty.includes('address') ? '*' : ''}`}</span>

            </div>
            <div className={`form-div ${error.empty.includes('level') ? 'error-empty' : '' }`}>

              <select
                name="level" 
                id="level"  
                placeholder="Level" 
                value={toEdit.level || data.level} 
                onChange={(e) => setToEdit({...toEdit, level: e.target.value})}
              >
                <option value="">Level</option>
                <option value="admin">admin</option>
                <option value="dev">dev</option>
                <option value="ux/ui">UX/UI</option>
                <option value="user">user</option>
              </select>
              <span className="error-empty">{`${ error.empty.includes('range') ? '*' : ''}`}</span>

            </div>
            <div className={`form-div ${error.empty.includes('image') ? 'error-empty' : '' }`}>
            <input
              type="file"
              name="image"
              id="image"
              accept="*/*"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  setToEdit({...toEdit, image: reader.result});
                };
              }}
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
                  value="Save"
                  onClick={() => {
                    handleEdit()
                  }}
                />
              </div>
          </div>
        </div>
      }

      {isOpen.delete &&
        <div className="usersModal-delete">

          <div className="usersModal-infoDelete">
            delete the user?
            <div className="user-toDelete">
              <div id="user-toDeleteName">{data.name}</div>
              <div>
                <div className="profile-pic-main" >
                  <div className="profile-pic-container">
                    <img
                      src={data.pic}
                    alt="profile pic"
                    />
                    <div className={`img-info ${data.level === 'ux/ui' ? 'ux-ui' : data.level}`}>{data.level}</div>
                    </div>
                </div>  
              </div>
          
          </div>
        </div>
          {error.message && <div className={`${error.message ? 'userError-message' : '' }`}>{error.message}</div>}
          {isOk && <div className="user-isOk-message">
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