// IMPORT ----------->
// import de la connexion à la base de donnée
const pool = require("../db/db")
const dotenv = require("dotenv");
const result = dotenv.config();
// <------------------

// ---> GET COUNT :
exports.getPublications_Count = (req) => {
    return new Promise(function(resolve, reject) {
    const {status, search} = req.body
    pool.query(`SELECT COUNT(*) FROM PUBLICATIONS 
                INNER JOIN STORES ON PUBLICATIONS.p_stores = STORES.s_id 
                WHERE p_status = $1 
                AND s_name LIKE $2`, [status, search], (error, results) => {
    if (error) {
        reject(error)}
    resolve(results.rows); })
    }) 
  }
// ---> GET PUBLICATIONS :
exports.getPublications = (req) => {
    return new Promise(function(resolve, reject) {
    const {status, search} = req.body
    const offset = parseInt(req.body.offset)
    const limit = parseInt(process.env.LIMIT)
    pool.query(`SELECT * FROM PUBLICATIONS 
                INNER JOIN USERS ON PUBLICATIONS.p_user = USERS.u_id 
                INNER JOIN STORES ON PUBLICATIONS.p_stores = STORES.s_id 
                WHERE p_status = $1 
                AND s_name LIKE $2 
                OFFSET $3 LIMIT $4`, [status, search, offset, limit], (error, results) => {
    if (error) {
        reject(error)}
    resolve(results.rows); })
    }) 
  }
// ---> GET COUNT TO DEPARTMENT :
exports.getPublications_Count_department = (req) => {
    return new Promise(function(resolve, reject) {
    const postal_code = parseInt(req.body.postal_code)
    const {status, search} = req.body
    pool.query(`SELECT COUNT(*) FROM PUBLICATIONS 
                INNER JOIN STORES ON PUBLICATIONS.p_stores = STORES.s_id 
                WHERE p_status = $1 
                AND s_postal_code = $2 
                AND s_name LIKE $3 `, [status, postal_code, search], (error, results) => {
    if (error) {
        reject(error)}
    resolve(results.rows); })
    }) 
  }
// ---> GET PUBLICATIONS TO DEPARTMENT :
exports.getPublications_department = (req) => {
    return new Promise(function(resolve, reject) {
    const postal_code = parseInt(req.body.postal_code)
    const offset = parseInt(req.body.offset)
    const {status, search} = req.body
    const limit = parseInt(process.env.LIMIT)
    pool.query('SELECT * FROM PUBLICATIONS INNER JOIN USERS ON PUBLICATIONS.p_user = USERS.u_id INNER JOIN STORES ON PUBLICATIONS.p_stores = STORES.s_id WHERE p_status = $1 AND STORES.s_postal_code = $2 AND s_name LIKE $3 OFFSET $4 LIMIT $5', [status, postal_code, search, offset,limit], (error, results) => {
    if (error) {
        reject(error)}
    resolve(results.rows); })
    }) 
  }
// ---> GET COUNT TO ACTIVITY :
exports.getPublications_Count_activity = (req) => {
    return new Promise(function(resolve, reject) {
    const {status, activity, search }= req.body
    pool.query('SELECT COUNT(*) FROM PUBLICATIONS INNER JOIN STORES ON PUBLICATIONS.p_stores = STORES.s_id WHERE p_status = $1 AND p_activity = $2 AND s_name LIKE $3 ', [status, activity, search], (error, results) => {
    if (error) {
        reject(error)}
    resolve(results.rows); })
    }) 
  }
// ---> GET PUBLICATIONS TO ACTIVITY :
exports.getPublications_activity = (req) => {
    return new Promise(function(resolve, reject) {
    const {status, activity, search }= req.body
    const offset = parseInt(req.body.offset)
    const limit = parseInt(process.env.LIMIT)
    pool.query('SELECT * FROM PUBLICATIONS INNER JOIN USERS ON PUBLICATIONS.p_user = USERS.u_id INNER JOIN STORES ON PUBLICATIONS.p_stores = STORES.s_id WHERE p_status = $1 AND p_activity = $2 AND s_name LIKE $3 OFFSET $4 LIMIT $5', [status, activity, search, offset, limit], (error, results) => {
    if (error) {
        reject(error)}
    resolve(results.rows); })
    }) 
  }
// ---> GET COUNT TO ACTIVITY AND DEPARTMENT :
exports.getPublications_Count_activity_department = (req) => {
    return new Promise(function(resolve, reject) {
    const {status, activity, search }= req.body
    const postal_code = parseInt(req.body.postal_code)
    pool.query('SELECT COUNT(*) FROM PUBLICATIONS INNER JOIN STORES ON PUBLICATIONS.p_stores = STORES.s_id WHERE p_status = $1 AND p_activity = $2 AND s_postal_code = $3 AND s_name LIKE $4', [status, activity, postal_code, search], (error, results) => {
    if (error) {
        reject(error)}
    resolve(results.rows); })
    }) 
  }
// ---> GET PUBLICATIONS TO ACTIVITY AND DEPARTMENT :
exports.getPublications_activity_department = (req) => {
    return new Promise(function(resolve, reject) {
    const {status, activity, search }= req.body
    const offset = parseInt(req.body.offset)
    const postal_code = parseInt(req.body.postal_code)
    const limit = parseInt(process.env.LIMIT)
    pool.query('SELECT * FROM PUBLICATIONS INNER JOIN USERS ON PUBLICATIONS.p_user = USERS.u_id INNER JOIN STORES ON PUBLICATIONS.p_stores = STORES.s_id WHERE p_status = $1 AND p_activity = $2 AND s_postal_code = $3 AND s_name LIKE $4 OFFSET $5 LIMIT $6', [status, activity, postal_code, search, offset, limit], (error, results) => {
    if (error) {
        reject(error)}
    resolve(results.rows); })
    }) 
  }
// ---> GET PUBLICATION :
exports.getPublication = (req) => {
    return new Promise(function(resolve, reject) {
    const id = parseInt(req.params.publicationid);
    pool.query('SELECT * FROM PUBLICATIONS INNER JOIN USERS ON PUBLICATIONS.p_user = USERS.u_id INNER JOIN STORES ON PUBLICATIONS.p_stores = STORES.s_id WHERE p_id = $1', [id], (error, results) => {
    if (error) {
        reject(error)}
    resolve(results.rows); })
    }) 
}
// ---> GET PUBLICATIONS USER :
exports.getPublications_userID_Count = (req) => {
    return new Promise(function(resolve, reject) {
    const id = parseInt(req.params.id);
    const status = req.body.status
    pool.query('SELECT COUNT(*) FROM PUBLICATIONS INNER JOIN USERS ON PUBLICATIONS.p_user = USERS.u_id INNER JOIN STORES ON PUBLICATIONS.p_stores = STORES.s_id WHERE p_user = $1 AND p_status = $2 ', [id, status], (error, results) => {
    if (error) {
        reject(error)}
    resolve(results.rows); })
    }) 
}
// ---> GET PUBLICATIONS USER :
exports.getPublications_userID = (req) => {
    return new Promise(function(resolve, reject) {
    const id = parseInt(req.params.id);
    const offset = parseInt(req.body.offset)
    const limit = parseInt(process.env.LIMIT)
    const status = req.body.status
    pool.query('SELECT * FROM PUBLICATIONS INNER JOIN USERS ON PUBLICATIONS.p_user = USERS.u_id INNER JOIN STORES ON PUBLICATIONS.p_stores = STORES.s_id WHERE p_user = $1 AND p_status = $2 OFFSET $3 LIMIT $4 ', [id, status, offset, limit], (error, results) => {
    if (error) {
        reject(error)}
    resolve(results.rows); })
    }) 
}
// ---> SET PUBLICATION :
exports.setPublication = (req) => {
    return new Promise(function(resolve, reject) {
    const user = parseInt(req.params.id);
    const {activity, contract, salary, hourly, details, store,  status, secure  } = req.body
    pool.query('INSERT INTO PUBLICATIONS (p_activity, p_contract, p_salary, p_hourly, p_details, p_user, p_stores,  p_status, p_secure, p_created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW()) RETURNING *', 
    [activity, contract, salary, hourly, details, user, store,  status, secure ], (error, results) => {
        if (error) {
        reject(error)}
        resolve(results.rows); })
    })
  }
  // ---> UPDATE PUBLICATION :
exports.updatePublication = (req) => {
    return new Promise(function(resolve, reject) {
    const id = parseInt(req.params.publicationid);
    const { status } = req.body
    pool.query('UPDATE PUBLICATIONS SET p_status = $1 WHERE p_id = $2', 
    [status, id], (error, results) => {
        if (error) {
        reject(error)}
        resolve(results.rows); })
    })
  }
// ---> SET PUBLICATION :
exports.deletePublication = (req) => {
    return new Promise(function(resolve, reject) {
    const id = parseInt(req.params.publicationid);
    pool.query('DELETE FROM PUBLICATIONS WHERE p_id = $1', 
    [id], (error, results) => {
        if (error) {
        reject(error)}
        resolve(results.rows); })
    })
}