const {
  getGamesService, 
  postGamesService,
  deleteGamesService,
  putGamesService
}  = require('../services/gamesService');

exports.getGames =  async (req, res) => {
  const resultGetGames =  await getGamesService();

  if(resultGetGames){
    const {err, result} =  resultGetGames

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
        .json(result.resultGetGames)
      }
  }
}

exports.postGames =  async (req, res) => {
  const {category,name,image,date,range} = req.body;

  const resultPostGames =  await postGamesService(category,name,image,date,range);

  if(resultPostGames){
    const {err, result} =  resultPostGames

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

exports.deleteGames =  async (req, res) => {

  const {id} = req.body;
  const resultDelGames =  await deleteGamesService(id);

  if(resultDelGames){
    const {err, result} =  resultDelGames

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

exports.putGames =  async (req, res) => {
  const {edit, id} = req.body;
  const resultPutGames =  await putGamesService(edit, id);

  if(resultPutGames){
    const {err, result} =  resultPutGames

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