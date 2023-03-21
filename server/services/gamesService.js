const { query } = require('../lib/db');

exports.getGamesService = async () => {
  try {
    let sqlGetGames = `SELECT * FROM games`
    const resultGetGames = await query(sqlGetGames);
   
    return {
      err: null,
      result: {resultGetGames}
    };
  } catch (err) {
    return { err: 'Games List FAIL', result: null };
  }
};
exports.postGamesService = async (category,name,image,date,range) => {

  try {

    let sqlCreateGame = `
    INSERT INTO games 
      (name,category,image,creation,ranges, status)
    VALUES 
      ('${name}',
      '${category}',
      '${image}', 
      '${date}',
      ${Number(range)},
      ${Number(1)} ) `;

    const resultCreateGame = await query(sqlCreateGame);


    return {
      err: null,
      result: resultCreateGame
    };
  } catch (err) {
    return { err: 'Game Register FAILED', result: null };
  }
};
exports.deleteGamesService = async (gameId) => {
  try {
    let sqlDeleteGame = `DELETE FROM games WHERE id=${gameId}`; 
    await query(sqlDeleteGame);

    return {
      err: null,
      result: 'Deleted successfully'
    };
  } catch (err) {
    return { err: 'Game removal has FAILED', result: null };
  }
};
exports.putGamesService = async (edit, id) => {
  try {

    await Promise.all(edit.map(async(elem) => {

      let sql = 'UPDATE games SET ';
      let add =[];

      if(elem[0] === 'name'){
        add = [...add, `name=${elem[1]}`]
      }else if(elem[0] === 'category'){
        add = [...add,  `category='${elem[1]}'`]
      }else if(elem[0] === 'image'){
        add = [...add, `image='${elem[1]}'`]
      }else if(elem[0] === 'date'){
      add = [...add,  `creation='${elem[1]}'`] 
      }else if (elem[0] === 'range'){
        add = [...add,  `ranges='${elem[1]}'`] 
      }
      
      let sqlEditGames = sql + add + ` WHERE id= ${id}`;


      await query(sqlEditGames);
    }))


    return {
      err: null,
      result: 'Edited successfully'
    };
  } catch (err) {
    return { err: 'Editing Games, FAILED', result: null };
  }
};