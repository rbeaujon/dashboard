const {
  getUsersService, 
  postUsersService,
  deleteUsersService,
  putUsersService
}  = require('../services/usersService');

exports.getUsers =  async (req, res) => {

  const resultUsers =  await getUsersService();

  if(resultUsers){
    const {err, result} =  resultUsers

      if(err){
        res
        .set('Content-Type', 'application/json')
        .status(500)
        .json(`Internal server error, the request return ${err}`)
        console.log(`Internal server error, the request return, ${err}.`)
      } else {
        res
        .set('Content-Type', 'application/json')
        .status(200)
        .json(result.resultGetUsers)
        console.log(`RESULT = ${result}`)
      }
  }
}
exports.postUsers =  async (req, res) => {

  const {address,email,image,level,name} = req.body;
  const resultPostUsers =  await postUsersService(address,email,image,level,name);

  if(resultPostUsers){
    const {err, result} =  resultPostUsers

      if(err){
        res
        .set('Content-Type', 'application/json')
        .status(500)
        .json(`Internal server error, the request return ${err}`)
        console.log(`Internal server error, the request return, ${err}.`)
      } else {
        res
        .set('Content-Type', 'application/json')
        .status(200)
        .json(result)
      }
  }
}
exports.deleteUsers =  async (req, res) => {
  const {id} = req.body;
  const resultDeleteUser =  await deleteUsersService(id);

  if(resultDeleteUser){
    const {err, result} =  resultDeleteUser

      if(err){
        res
        .set('Content-Type', 'application/json')
        .status(500)
        .json(`Internal server error, the request return ${err}`)
        console.log(`Internal server error, the request return, ${err}.`)
      } else {
        res
        .set('Content-Type', 'application/json')
        .status(200)
        .json(result)
      }
  }
}
exports.putUsers =  async (req, res) => {

  const {id,name,email,address,level,image} = req.body;
  const resultUser =  await putUsersService(id,name,email,address,level,image);

  if(resultUser){
    const {err, result} =  resultUser

      if(err){
        res
        .set('Content-Type', 'application/json')
        .status(500)
        .json(`Internal server error, the request return ${err}`)
        console.log(`Internal server error, the request return, ${err}.`)
      } else {
        res
        .set('Content-Type', 'application/json')
        .status(200)
        .json(result)
      }
  }
}