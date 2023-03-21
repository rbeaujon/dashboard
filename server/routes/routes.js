const express = require('express');

const gamesController = require('../controllers/gamesController');
const usersController = require('../controllers/usersController');

const cors = require('cors');

const router = express.Router();

//Users Controller routes
router.post('/users',cors(),  usersController.getUsers);
router.post('/users',cors(),  usersController.postUsers);
router.delete('/users',cors(),  usersController.deleteUsers);
router.put('/users',cors(),  usersController.putUsers);


//Games Controller routes
router.get('/games', cors(), gamesController.getGames);
router.post('/games', cors(), gamesController.postGames);
router.delete('/games', cors(), gamesController.deleteGames);
router.put('/games', cors(), gamesController.putGames);

module.exports = router;

