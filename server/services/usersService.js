const { query } = require('../lib/db');


exports.getUsersService = async () => {

  try {
    let sqlGetUsers = `SELECT * FROM users`
    const resultGetUsers = await query(sqlGetUsers);
    
    return {
      err: null,
      result: {resultGetUsers}
    };
  } catch (err) {
    return { err: 'Users List FAILED', result: null };
  }
};

exports.postUsersService = async (address,email,image,level,name) => {
  


  try {

    let sqlPostUser = `
    INSERT INTO 
    users 
    (name, email, address, pic, level, status) 
    VALUES 
    ('${name}','${email}','${address}','${image}','${level}', 1)` 


     
    const resultPostUser = await query(sqlPostUser);
  
    return {
      err: null,
      result: {resultPostUser}
    };
  } catch (err) {
    return { err: 'User Registration FAILED', result: null };
  }
};

exports.putUsersService = async (id,name,email,address,level,image) => {
  
  try {

    let sql = 'UPDATE users SET ';
    let add =[];

    console.log(`Edit IMAGEN: ${image} `)

    if(name){
      add = [...add, `name='${name}'`]
    }else if(email){
      add = [...add,  `email='${email}'`]
    }else if(image){
      add = [...add, `pic='${image}'`]
    }else if(address){
      add = [...add,  `address='${address}'`] 
    }else if (level){
      add = [...add,  `level=${level}`] 
    }
      
    let sqlEditUsers = sql + add + ` WHERE id= ${id}`;
      
      console.log(`SQL: ${sqlEditUsers}`)

      await query(sqlEditUsers);

    return {
      err: null,
      result: 'Edited successfully'
    };
  } catch (err) {
    return { err: 'Editing User, FAILED', result: null };
  }
};

exports.deleteUsersService = async (id) => {
  try {
    let sqldeleteUser = `DELETE FROM users WHERE id=${id}` 
    await query(sqldeleteUser);
    
    return {
      err: null,
      result: 'Deleted successfully'
    };
  } catch (err) {
    return { err: 'Deleting Residencias, FAILED', result: null };
  }
};


