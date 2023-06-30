import React, {useContext, useEffect, useState} from "react";
import { useForm } from 'react-hook-form';


import { checkUrlImage } from "../../../helpers/checkUrlImage";
import Loader from "../../../helpers/Loader/loader";
import { GamesApi } from "../../../services/API/games.api";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './gameModal.styles.scss';
import { IsDarkContext } from "../../../context/context";



interface DataForm {
  name: string;
  category: string;    
  image: string;
  date: string;
  range: string;
}

interface Header {
  method: string;
  headers: {
    Accept: string;
    'Content-Type': string;
  };
  body: string;
}

type SuccessCallback = (response?: any) => void;

type ErrorMessages = {
  [statusCode: number]: string;
};

export const GameModal = (props: any) => {


  const {isOpen, setIsOpen, isResponseOk, setIsResponseOk} = props;
  const data = isOpen[0]?.data;
  const [error, setError] = useState<{
    message?: string;
    empty?: never[];
    image?: string;
    name?: string;
    category?: string;
    date?: Date;
    range?: string;
  }>({
    message: '',
    empty: [],
    image: '',
    name: '',
    category: '',
    date: new Date(), 
    range: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const { isDark } = useContext(IsDarkContext) || { isDark: false };
  const defaultValues = isOpen && isOpen.length > 0 ? {
    'name': isOpen[0].data[0].name,
    'category': isOpen[0].data[0].category,
    'date': isOpen[0].data[0].creation,
    'range': isOpen[0].data[0].ranges,
    'image': isOpen[0].data[0].image
  } : {
    'name': '',
    'category': '',
    'date': '',
    'range': '',
    'image': ''
  };
  
  const {register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues
  })

  const handleCreate = async (dataForm:DataForm) => {

    const validUrl = checkUrlImage(dataForm.image);
  
      if (validUrl) {
        const date = handleDate(dataForm.date);
        const dataToCreate = {
          name: dataForm.name,
          category: dataForm.category,
          image: dataForm.image,
          date,
          range: dataForm.range,
        };
        const header = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToCreate),
        };
        handleApiRequest(header, 200, () => setIsResponseOk({ isResponseOK: true }), {
          500: 'Error registering the game',
          403: 'Ups! We found a communication problem with the server',
          404: 'Ups! internal problems with the create request',
          400: 'Ups! internal problems with the create request',
        });
        
      } else {
        setError({...error, message:'URL is not valid'});
      }
    
  };
  
  const handleEdit = async (dataForm:DataForm) => {
 
      const dataFiltered = Object.entries(dataForm).filter((e) => e[1] !== '');
      const header = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ edit: dataFiltered, id: data[0].id }),
      };
      handleApiRequest(header, 200, () => setIsResponseOk({ isResponseOK: true }), {
        500: 'Error editing the game',
        403: 'Ups! We found a communication problem with the server',
        404: 'Ups! internal problems with the edit request',
        400: 'Ups! internal problems with the edit request',
      });
  };

  const handleDelete = async () => {
    const header = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: data[0].id })
    };
    handleApiRequest(header, 200, () => setIsResponseOk({ isResponseOK: true }), {
      500: 'Error deleting the game',
      403: 'Ups! We found a communication problem with the server',
      404: 'Ups! internal problems with the delete request',
      400: 'Ups! internal problems with the delete request',
    });
  };
  
  const handleApiRequest = async (
    header: Header,
    successStatus: number,
    successCallback: SuccessCallback,
    errorMessages: ErrorMessages
  ) => {
    setLoading(true);
  
    try {
      const response = await GamesApi(header);
      setLoading(false);
  
      if (response.status === successStatus) {
        setIsResponseOk({ isResponseOK: true });
        setError({ empty: [] });
        setTimeout(() => {
          setIsOpen({});
          setIsResponseOk({ isResponseOK: false });
        }, 5000);
        successCallback(response);
      } else {
        setError({ ...error, message: errorMessages[response.status] });
      }
    } catch (error) {
      setLoading(false);
      setError(prevError => {
        if (typeof prevError === 'object' && prevError !== null) {
          return { ...prevError, message: 'Ups! We found a communication problem with the server' };
        } else {
          return { message: 'Ups! We found a communication problem with the server' };
        }
      });
      
    }
    setTimeout(() => {
      setError({ empty: [] });
    }, 5000);
  };

  const handleDate = (date:string) => {
    const dateStr = date.toString().split(' ');
    const dateObj = new Date(date.toString());
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    return `${dateStr[2]}/${month}/${dateStr[3]}`
  }

  useEffect(() => {
    let timer: NodeJS.Timeout | number
    
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
      <div className={`gamesModal-frame ${isOpen[0]?.add ? 'add' : 
        isOpen[0]?.edit ? 'edit' :
        isOpen[0]?.delete ? 'delete' : ''
        }`}
      >
        {isOpen[0]?.add &&
        <form onSubmit={handleSubmit(handleCreate)} className="gamesModal-add">
          <div className="form">
           
              <div className="form-div">
                <input type="text" 
                  placeholder="Name"
                  {...register('name',{
                    required: 'name is required', 
                    minLength: {
                      value: 4,
                      message: "This input must to have at least 4 characters"
                    }
                  })} 
                />
              </div>
              <span className={`${errors.name ? 'error-defined--show' : 'error-defined--hide'}`}>{typeof errors.name === 'string' && errors.name}</span>

              <div className="form-div">
                <select 
                {...register('category', { 
                    required: 'category is required' 
                  }
                )}>
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
              </div>
              <span className={`${errors.category ? 'error-defined--show' : 'error-defined--hide'}`}>{typeof errors.category?.message === 'string' && errors.category.message}</span>

              <div className="form-div">
                <DatePicker
                  showIcon
                  selected={watch('date')}
                  {...register('date', { 
                      required: 'date is required'
                    }
                  )}
                  onChange={(date) => setValue('date', date, { shouldValidate: true })}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Date"
                  id="DatePicker"
                />
              </div>
              <span className={`${errors.date ? 'error-defined--show' : 'error-defined--hide'}`}>{typeof errors.date?.message === 'string' && errors.date.message}</span>

              
              <div className="form-div">
                <select {...register('range', { 
                  required: 'range is required' })}>
                  <option value=""></option>
                  {Array.from(Array(21), (e, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
              <span className={`${errors.range ? 'error-defined--show' : 'error-defined--hide'}`}>{typeof errors.range?.message === 'string' && errors.range.message}</span>

              <div className="form-div">
                <input 
                  type="text" 
                  placeholder="Image URL" 
                  {...register('image', { 
                    required: 'image is required', 
                    pattern: {
                      value: /https?:\/\/.+/i,
                      message: "check the url format."
                    }
                    }
                  )} />
              </div>
              <span className={`${errors.image ? 'error-defined--show' : 'error-defined--hide'}`}>{typeof errors.image?.message === 'string' && errors.image.message}</span>


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

        {isOpen[0].edit &&
        <form onSubmit={handleSubmit(handleEdit)} className="gamesModal-edit">
          <div className="form">
            
            <div className="form-div">
              <input 
                type="text" 
                id="name"  
                placeholder="Name" 
                // onChange={(e) => setValue('name', e.target.value)}
                {...register('name',{
                  required: 'name is required', 
                  minLength: {
                    value: 4,
                    message: "This input must to have at least 4 characters"
                  }
                })} 
              />
            </div>
            <span className={`${errors.name ? 'error-defined--show' : 'error-defined--hide'}`}>{typeof errors.name === 'string' && errors.name}</span>

            <div className="form-div">
              <select 
                {...register('category', { 
                    required: 'category is required' 
                  }
                )}>
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
           
            </div>
            <span className={`${errors.category ? 'error-defined--show' : 'error-defined--hide'}`}>{typeof errors.category === 'string' && errors.category}</span>
            
            <div className="form-div">
              <input
                {...register('date', { 
                  required: 'date is required'
                  }
                )}
              />
            </div>
            <span className={`${errors.date ? 'error-defined--show' : 'error-defined--hide'}`}>{typeof errors.date === 'string' && errors.date}</span>

            <div className="form-div">
              <select {...register('range', { 
                required: 'range is required' })}>
                <option value=""></option>
                {Array.from(Array(21), (e, i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
            <span className={`${errors.range ? 'error-defined--show' : 'error-defined--hide'}`}>{typeof errors.range === 'string' && errors.range}</span>

            <div className="form-div">
              <textarea 
                  placeholder="Image URL" 
                  {...register('image', { 
                    required: 'image is required', 
                    pattern: {
                      value: /https?:\/\/.+/i,
                      message: "check the url format."
                    }
                    }
                  )} 
              />
            </div>
            <span className={`${errors.image ? 'error-defined--show' : 'error-defined--hide'}`}>{typeof errors.image === 'string' && errors.image}</span>
          
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
                  value="Accept"
                />
              </div>
          </div>
        </form>
        }

        {isOpen[0].delete &&
        <div className="gamesModal-delete">

          <div className="info-delete">
            Delete the game?
          <div className="game-toDelete">
            {data[0].name}
            <div><img src={data[0].image} alt={data[0].id} /></div>
          
          </div>
          </div>
          {error.message && <div className={`${error.message ? 'error-message' : '' }`}>{error.message}</div>}
          {isResponseOk && <div className="isOk-message">
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