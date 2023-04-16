import React, {useContext, useEffect, useState} from "react";
import { useForm, Controller } from 'react-hook-form';

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
  const {isOpen, setIsOpen, isResponseOk, setIsResponseOk} = props;
  const {data} = isOpen;
  const [error, setError] = useState({empty:[]});
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const {isDark} = useContext(IsDarkContext);
  const defaultValues = data ? {
    'id': data.id,
    'name': data.name,
    'email': data.email,
    'address': data.address,
    'level': data.level,
    'image': data.image
  } : {};
  const {register, handleSubmit, control, setValue, formState: { errors } } = useForm({
    defaultValues
  })


  const handleResponse = (response, successCallback, errorCallback) => {
    setLoading(false);
    if (response.status === 200) {
      successCallback();
      setError({ empty: [] });
      setTimeout(() => {
        setIsOpen({});
        setIsResponseOk(false);
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

  const handleCreate = async (dataForm) => {

    setLoading(true);

    const header = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataForm),
    };
    try {
      const response = await UsersApi(header);
      handleResponse(response, () => setIsResponseOk(true), () => setError({ ...error, message: 'Ups! We found a communication problem with the server, we can not register the user' }));
    } catch (error) {
      setLoading(false);
      setError({ ...error, message: 'Ups! We found a communication problem with the server, we can not register the user' });
    }
    setTimeout(() => {
      setError({ empty: [] });
    }, 5000);
  } 

  const handleEdit = async (dataForm) => {

    setLoading(true);

    const header = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataForm)
    };
  
    try {
       let response = await UsersApi(header);
  
       handleResponse(response, () => {
        setIsResponseOk(true);
        setError({ empty: [] });
         setTimeout(() => {
           setIsResponseOk(false);
           setIsOpen({});
         }, 5000);
       }, () => {
          setError({ ...error, message: 'Error editing the user' });
        });
  
    }
    catch (error) {
        setLoading(false);
        setError({ ...error, message: 'Ups! We found a communication problem with the server, we can not delete the game' });
    }
    setTimeout(() => {
      setError({ empty: [] });
    }, 5000);
  } 

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
        setIsResponseOk(true);
        setError({ empty: [] });
        setTimeout(() => {
          setIsOpen({});
          setIsResponseOk(false);
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
    
    if(isResponseOk){
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }else{
      timer = 0
    }
    return () => clearTimeout(timer);
  }, [isResponseOk, timeLeft]);

  return (
    <div className={`usersModal-overlay ${isDark && "isDark"}`}>

      {loading && <Loader/>}
      <div className={`usersModal-frame ${isOpen.add ? 'add' : 
        isOpen.edit ? 'edit' :
        isOpen.delete ? 'delete' : ''
        }`}
      >
      {isOpen.add &&
        <form onSubmit={handleSubmit(handleCreate)} className="usersModal-add">
          
          <div className="form">

            <div className="form-div">
              <input type="text" 
                  placeholder="Name"
                  onChange={(e) => setValue('name', e.target.value.toLowerCase())}  
                  {...register('name',{
                    required: 'name is required',
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "This input is letters only."
                    }, 
                    minLength: {
                      value: 4,
                      message: "This input must to have at least 4 characters"
                    }
                  })} 
                />
            </div>
            <span className={`${errors.name ? 'error-defined--show' : 'error-defined--hide'}`}>{errors.name && errors.name.message}</span>
            
            <div className="form-div">
            <input type="text" 
                  placeholder="Email"
                  onChange={(e) => setValue('email', e, e.target.value.toLowerCase())}  
                  {...register('email',{
                    required: 'email is required', 
                    pattern: {
                      value:  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "The email is not validas."
                    },
                    minLength: {
                      value: 4,
                      message: "This input must to have at least 4 characters"
                    }
                  })} 
                />
            </div>
            <span className={`${errors.email ? 'error-defined--show' : 'error-defined--hide'}`}>{errors.email && errors.email.message}</span>

            <div className="form-div">
              <input type="text" 
                placeholder="Address"
                {...register('address',{
                  required: 'address is required',
                  minLength: {
                    value: 4,
                    message: "This input must to have at least 4 characters"
                  }
                })} 
              />
            </div>
            <span className={`${errors.address ? 'error-defined--show' : 'error-defined--hide'}`}>{errors.address && errors.address.message}</span>

            <div className="form-div">
              <select 
                {...register('level', { 
                    required: 'level is required' 
                  }
                )}>
                <option value="">Level</option>
                <option value="admin">admin</option>
                <option value="dev">dev</option>
                <option value="ux/ui">UX/UI</option>
                <option value="user">user</option>
              </select>
            </div>
            <span className={`${errors.level ? 'error-defined--show' : 'error-defined--hide'}`}>{errors.level && errors.level.message}</span>

            <div className="form-div">
 
              <Controller
                name="image"
                control={control}
                rules={{ required: 'Image is required' }}
                render={({ field: { onChange } }) => (
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
                        onChange(reader.result);
                      };
                    }}
                  />
                )}
              />

            </div>
            <span className={`${errors.image ? 'error-defined--show' : 'error-defined--hide'}`}>{errors.image && errors.image.message}</span>

          </div>
          {error.message && <div className={`${error.message ? 'error-message' : '' }`}>{error.message}</div>}
          {isResponseOk && <div className="isOk-message">
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
                  type="submit"
                  id="button-submit"
                  value="Add"
                />
              </div>
          </div>
        </form>
      }

      {isOpen.edit &&
        <form onSubmit={handleSubmit(handleEdit)}  className="usersModal-edit">
    
          <div className="edit-pic-container">
            <img
              src={data.pic}
              alt="profile pic"
             />
            <div className={`edit-imgInfo ${data.level === 'ux/ui' ? 'ux-ui' : data.level}`}>{data.level}</div>
          </div>
    
          <div className="form edit">
           
          <div className="form-div">
              <input type="text" 
                  placeholder="Name"
                  onChange={(e) => setValue('name', e.target.value.toLowerCase())}  
                  {...register('name',{
                    required: 'name is required',
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "This input is letters only."
                    }, 
                    minLength: {
                      value: 4,
                      message: "This input must to have at least 4 characters"
                    }
                  })} 
                />
            </div>
            <span className={`${errors.name ? 'error-defined--show' : 'error-defined--hide'}`}>{errors.name && errors.name.message}</span>
            
            <div className="form-div">
            <input type="text" 
                  placeholder="Email"
                  onChange={(e) => setValue('email', e, e.target.value.toLowerCase())}  
                  {...register('email',{
                    required: 'email is required', 
                    pattern: {
                      value:  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "The email is not valid."
                    },
                    minLength: {
                      value: 4,
                      message: "This input must to have at least 4 characters"
                    }
                  })} 
                />
            </div>
            <span className={`${errors.email ? 'error-defined--show' : 'error-defined--hide'}`}>{errors.email && errors.email.message}</span>

            <div className="form-div">
              <input type="text" 
                placeholder="Address"
                {...register('address',{
                  required: 'address is required',
                  minLength: {
                    value: 4,
                    message: "This input must to have at least 4 characters"
                  }
                })} 
              />
            </div>
            <span className={`${errors.address ? 'error-defined--show' : 'error-defined--hide'}`}>{errors.address && errors.address.message}</span>

            <div className="form-div">
              <select 
                {...register('level', { 
                    required: 'level is required' 
                  }
                )}>
                <option value="">Level</option>
                <option value="admin">admin</option>
                <option value="dev">dev</option>
                <option value="ux/ui">UX/UI</option>
                <option value="user">user</option>
              </select>
            </div>
            <span className={`${errors.level ? 'error-defined--show' : 'error-defined--hide'}`}>{errors.level && errors.level.message}</span>

            <div className="form-div">
 
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange } }) => (
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
                        onChange(reader.result);
                      };
                    }}
                  />
                )}
              />

            </div>
            <span className={`${errors.image ? 'error-defined--show' : 'error-defined--hide'}`}>{errors.image && errors.image.message}</span>


          </div>

          {error.message && <div className={`${error.message ? 'error-message' : '' }`}>{error.message}</div>}
          {isResponseOk && <div className="isOk-message">
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
                  type="submit"
                  id="button-submit"
                  value="Save"
                />
              </div>
          </div>
        </form>
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
          {isResponseOk && <div className="user-isOk-message">
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