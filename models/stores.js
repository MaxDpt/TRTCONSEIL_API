// IMPORT ----------->
// import de la connexion à la base de donnée
const pool = require("../db/db")
// <------------------

// ---> GET STORES :
exports.getStores = () => {
    return new Promise(function(resolve, reject) {
      pool.query('select * from STORES INNER JOIN USERS ON STORES.s_user = USERS.u_id ', (error, results) => {
        if (error) {
          reject(error)}
        resolve(results.rows); })
    }) 
  }
// ---> GET STORES WITH USER ID :
exports.getStores_userID = (req) => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(req.params.id)
      pool.query('select * from STORES INNER JOIN USERS ON STORES.s_user = USERS.u_id WHERE s_user = $1', [id], (error, results) => {
        if (error) {
          reject(error)}
        resolve(results.rows)})
    })
  }
// ---> GET STORE :
exports.getStore = (req) => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(req.params.storeid) || parseInt(req.body.store)
      pool.query('select * from STORES INNER JOIN USERS ON STORES.s_user = USERS.u_id WHERE STORES.s_id = $1', [id], (error, results) => {
        if (error) {
          reject(error)}
        resolve(results.rows)})
    })
  }
// ---> SET STORES :
exports.setStore = (req) => {
    return new Promise(function(resolve, reject) {
        const { name, address, city, postal_code, department, region, phone, hourly, siren, status, secure } = req.body
        const user = parseInt(req.params.id)
        pool.query('INSERT INTO STORES (s_name, s_address, s_city, s_postal_code, s_department, s_region, s_phone, s_hourly, s_siren, s_user, s_status, s_secure, s_created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW()) RETURNING *', 
        [name, address, city, postal_code, department, region, phone, hourly, siren, user, status, secure], (error, results) => {
        if (error) {
            reject(error)}
        resolve(results.rows); })
    })
}
// ---> UPDATE STORE :
exports.updateStore = (req) => {
    return new Promise(function(resolve, reject) {
      const { name, address, city, postal_code, department, region, hourly, phone, siren } = req.body
      const id = parseInt(req.params.storeid)
      pool.query('UPDATE STORES SET s_name = $1, s_address = $2, s_city = $3, s_postal_code = $4, s_department = $5, s_region = $6, s_hourly = $7, s_phone = $8, s_siren = $9 WHERE s_id = $10', 
      [name, address, city, postal_code, department, region, hourly, phone, siren, id], (error, results) => {
        if (error) {
          reject(error)}
        resolve(results.rows[0]); })
    })
  }
// ---> DELETE STORE :
exports.deleteStore = (req) => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(req.params.storeid)
      pool.query('DELETE FROM STORES WHERE s_id = $1', [id], (error, results) => {
        if (error) {
          reject(error)}
        resolve(results.rows[0]); })
    })
  }