// IMPORT ----------->
// import de la connexion à la base de donnée
const pool = require("../db/db")
// <------------------

// ---> GET FAVORITES :
exports.getFavorites = (req) => {
    return new Promise(function(resolve, reject) {
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM FAVORITE INNER JOIN PUBLICATIONS ON FAVORITE.f_publications = PUBLICATIONS.p_id INNER JOIN USERS  ON PUBLICATIONS.p_user= users.u_id INNER JOIN STORES  ON FAVORITE.f_stores = STORES.s_id WHERE FAVORITE.f_user = $1', [id], (error, results) => {
    if (error) {
        reject(error)}
    resolve(results.rows); })
    }) 
  }
// ---> GET FAVORITE :
exports.getFavorite = (req) => {
    return new Promise(function(resolve, reject) {
    const id = parseInt(req.params.favoriteid)
    pool.query('SELECT * FROM FAVORITE INNER JOIN PUBLICATIONS ON FAVORITE.f_publications = PUBLICATIONS.p_id INNER JOIN USERS  ON PUBLICATIONS.p_user= users.u_id INNER JOIN STORES  ON FAVORITE.f_stores = STORES.s_id WHERE FAVORITE.f_id = $1', [id], (error, results) => {
    if (error) {
        reject(error)}
    resolve(results.rows); })
    }) 
  }
// ---> CREATE FAVORITE :
exports.setFavorite = (req) => {
    return new Promise(function(resolve, reject) {
      const { publication, stores, secure } = req.body
      const user = parseInt(req.params.id)
      pool.query('INSERT INTO FAVORITE (f_publications, f_user, f_stores, f_secure) VALUES ($1, $2, $3, $4) RETURNING *', 
      [publication, user, stores, secure], (error, results) => {
        if (error) {
          reject(error)}
        resolve( results.rows[0]); })
    })
  }
// ---> DELETE FAVORTIE :
exports.deleteFavorite = (req) => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(req.params.publicationid)
      pool.query('DELETE FROM FAVORITE WHERE f_publications = $1', [id], (error, results) => {
        if (error) {
          reject(error)}
        resolve(results.rows)})
    })
  }