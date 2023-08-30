// IMPORT ----------->
// import de la connexion à la base de donnée
const pool = require("../db/db")
const dotenv = require("dotenv");
const result = dotenv.config();
// <------------------
// ---> GET COUNT :
exports.getCandidatys_Count = (req) => {
  return new Promise(function(resolve, reject) {
  const {status, search} = req.body
  pool.query('SELECT COUNT(*) FROM CANDIDATY INNER JOIN PUBLICATIONS ON candidaty.c_publications = PUBLICATIONS.p_id INNER JOIN USERS  ON candidaty.c_user = users.u_id JOIN STORES  ON candidaty.c_stores = STORES.s_id WHERE c_status = $1 AND u_name LIKE $2', [status, search], (error, results) => {
  if (error) {
      reject(error)}
  resolve(results.rows); })
  }) 
}
// ---> GET CANDIDATYS :
exports.getCandidatys = (req) => {
    return new Promise(function(resolve, reject) {
    const {status, search} = req.body
    const offset = parseInt(req.body.offset)
    const limit = parseInt(process.env.LIMIT)
    pool.query('SELECT * FROM CANDIDATY INNER JOIN PUBLICATIONS ON candidaty.c_publications = PUBLICATIONS.p_id INNER JOIN USERS  ON candidaty.c_user = users.u_id JOIN STORES  ON candidaty.c_stores = STORES.s_id WHERE c_status = $1 AND u_name LIKE $2 OFFSET $3 LIMIT $4',[status, search, offset, limit], (error, results) => {
    if (error) {
        reject(error)}
    resolve(results.rows); })
    }) 
  }
// ---> GET COUNT TO DEPARTMENT :
exports.getCandidatys_Count_department = (req) => {
  return new Promise(function(resolve, reject) {
  const postal_code = parseInt(req.body.postal_code)
  const {status, search} = req.body
  pool.query('SELECT COUNT(*) FROM CANDIDATY INNER JOIN PUBLICATIONS ON candidaty.c_publications = PUBLICATIONS.p_id INNER JOIN USERS  ON candidaty.c_user = users.u_id JOIN STORES  ON candidaty.c_stores = STORES.s_id WHERE c_status = $1 AND u_postal_code = $2 AND u_name LIKE $3 ', [status, postal_code, search], (error, results) => {
  if (error) {
      reject(error)}
  resolve(results.rows); })
  }) 
}
// ---> GET CANDIDATYS TO DEPARTMENT :
exports.getCandidatys_department = (req) => {
  return new Promise(function(resolve, reject) {
  const postal_code = parseInt(req.body.postal_code)
  const offset = parseInt(req.body.offset)
  const {status, search} = req.body
  const limit = parseInt(process.env.LIMIT)
  pool.query('SELECT * FROM CANDIDATY INNER JOIN PUBLICATIONS ON candidaty.c_publications = PUBLICATIONS.p_id INNER JOIN USERS  ON candidaty.c_user = users.u_id JOIN STORES  ON candidaty.c_stores = STORES.s_id WHERE c_status = $1 AND u_postal_code = $2 AND u_name LIKE $3 OFFSET $4 LIMIT $5', [status, postal_code, search, offset,limit], (error, results) => {
  if (error) {
      reject(error)}
  resolve(results.rows); })
  }) 
}
  // ---> GET CANDIDATY :
exports.getCandidaty = (req) => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(req.params.candidatyid)
    pool.query('SELECT * FROM CANDIDATY INNER JOIN PUBLICATIONS ON candidaty.c_publications = PUBLICATIONS.p_id INNER JOIN USERS  ON candidaty.c_user = users.u_id INNER JOIN STORES  ON candidaty.c_stores = STORES.s_id WHERE c_id = $1', [id], (error, results) => {
      if (error) {
        reject(error)}
      resolve(results.rows)})
  })
}
// ---> GET CANDIDATY USER :
exports.getCandidacys_userID = (req) => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM CANDIDATY INNER JOIN PUBLICATIONS ON candidaty.c_publications = PUBLICATIONS.p_id INNER JOIN USERS  ON candidaty.c_user = users.u_id INNER JOIN STORES  ON candidaty.c_stores = STORES.s_id WHERE CANDIDATY.c_user = $1', [id], (error, results) => {
      if (error) {
        reject(error)}
      resolve(results.rows)})
  })
}
// ---> GET CANDIDATY :
exports.getCandidaty_ForCandidate = (req) => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(req.params.candidatyid)
      pool.query('SELECT * FROM CANDIDATY INNER JOIN PUBLICATIONS ON candidaty.c_publications = PUBLICATIONS.p_id INNER JOIN USERS  ON PUBLICATIONS.p_user = users.u_id INNER JOIN STORES  ON candidaty.c_stores = STORES.s_id WHERE c_id = $1', [id], (error, results) => {
        if (error) {
          reject(error)}
        resolve(results.rows)})
    })
  }
// ---> GET CANDIDATY USER :
exports.getCandidacys_userID_ForCandidate = (req) => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(req.params.id)
      pool.query('SELECT * FROM CANDIDATY INNER JOIN PUBLICATIONS ON candidaty.c_publications = PUBLICATIONS.p_id INNER JOIN USERS  ON PUBLICATIONS.p_user = users.u_id INNER JOIN STORES  ON candidaty.c_stores = STORES.s_id WHERE CANDIDATY.c_user = $1', [id], (error, results) => {
        if (error) {
          reject(error)}
        resolve(results.rows)})
    })
  }
// ---> GET CANDIDATY PUBLICATION USER :
exports.getCandidacys_userPublicationID = (req) => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(req.params.id)
      pool.query('SELECT * FROM CANDIDATY INNER JOIN PUBLICATIONS ON candidaty.c_publications = PUBLICATIONS.p_id INNER JOIN USERS  ON candidaty.c_user = users.u_id INNER JOIN STORES  ON candidaty.c_stores = STORES.s_id WHERE PUBLICATIONS.p_user = $1', [id], (error, results) => {
        if (error) {
          reject(error)}
        resolve(results.rows)})
    })
  }
// ---> SET CANDIDATY :
exports.setCandidaty = (req) => {
    return new Promise(function(resolve, reject) {
      const { publications, stores, status, secure } = req.body
      const user = parseInt(req.params.id);
      pool.query('INSERT INTO CANDIDATY (c_publications, c_user, c_stores, c_status, c_secure, c_created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *', 
      [publications, user, stores, status, secure], (error, results) => {
        if (error) {
          reject(error)}
        resolve(results.rows); })
    })
  }
// ---> UPDATE CANDIDATY STATE :
exports.updateCandidaty_state = (req) => {
    return new Promise(function(resolve, reject) {
      const { status } = req.body
      const id = parseInt(req.params.candidatyid)
      pool.query('UPDATE CANDIDATY SET c_status = $1 WHERE c_id = $2', [status, id], (error, results) => {
        if (error) {
          reject(error)}
        resolve(results.rows); })
    })
  }
// ---> DELETE CANDIDATY :
exports.deleteCandidacy = (req) => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(req.params.candidatyid)
      pool.query('DELETE FROM CANDIDATY WHERE c_id = $1', [id], (error, results) => {
        if (error) {
          reject(error)}
        resolve(results.rows)})
    })
  } 
  
