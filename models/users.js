// IMPORT ----------->
// import de la connexion à la base de donnée
const pool = require("../db/db")
const dotenv = require("dotenv");
const result = dotenv.config();
// <------------------
// ---> GET COUNT :
exports.getUsers_Count = (req) => { 
  return new Promise(function(resolve, reject) {
      const {status, search} = req.body
      pool.query('SELECT COUNT(*) FROM USERS WHERE u_status = $1 AND u_name LIKE $2 ', [status, search], (error, results) => {
      if (error) {
          reject(error)}
          resolve(results.rows); })
    }) 
}
// ---> GET USERS :
exports.getUsers = (req) => { 
    return new Promise(function(resolve, reject) {
        const {status, search} = req.body
        const offset = parseInt(req.body.offset)
        const limit = parseInt(process.env.LIMIT)
        pool.query('SELECT * FROM USERS WHERE u_status = $1 AND u_name LIKE $2 OFFSET $3 LIMIT $4 ', [status, search, offset, limit], (error, results) => {
        if (error) {
            reject(error)}
            resolve(results.rows); })
      }) 
}
// ---> GET COUNT TO DEPARTMENT :
exports.getUsers_department_Count = (req) => { 
  return new Promise(function(resolve, reject) {
      const postal_code = parseInt(req.body.postal_code)
      const {status, search} = req.body
      pool.query('SELECT COUNT(*) FROM USERS WHERE u_status = $1 AND u_postal_code = $2 AND u_name LIKE $3  ', [status, postal_code, search], (error, results) => {
      if (error) {
          reject(error)}
          resolve(results.rows); })
    }) 
}
// ---> GET USERS TO DEPARTMENT :
exports.getUsers_department = (req) => { 
  return new Promise(function(resolve, reject) {
      const postal_code = parseInt(req.body.postal_code)
      const {status, search} = req.body
      const offset = parseInt(req.body.offset)
      const limit = parseInt(process.env.LIMIT)
      pool.query('SELECT * FROM USERS WHERE u_status = $1 AND u_postal_code = $2 AND u_name LIKE $3 OFFSET $4 LIMIT $5 ', [status, postal_code, search, offset, limit], (error, results) => {
      if (error) {
          reject(error)}
          resolve(results.rows); })
    }) 
}
// ---> GET USER ID :
exports.getUserID = (req) => { 
    return new Promise(function(resolve, reject) {
        const id = parseInt(req.params.userid)
        pool.query('SELECT * FROM USERS WHERE u_id = $1', [id], (error, results) => {
          if (error) {
          reject(error)}
          resolve(results.rows); })
      })
}
// ---> GET USER TOKEN :
exports.getUserToken = (token) => { 
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM USERS WHERE u_token = $1', [token], (error, results) => {
          if (error) {
          reject(error)}
          resolve(results.rows); })
      })
}
// ---> GET USER ROLE :
exports.getUserRole = (req) => { 
  const role = req.body.role
  return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM USERS WHERE u_role = $1', [role], (error, results) => {
        if (error) {
        reject(error)}
        resolve(results.rows); })
    })
}
// ---> GET USER ROLE :
exports.getControl_userRole = (req) => { 
  const id = parseInt(req.params.id)
  return new Promise(function(resolve, reject) {
      pool.query('SELECT u_role FROM USERS WHERE u_id = $1', [id], (error, results) => {
        if (error) {
        reject(error)}
        resolve(results.rows); })
    })
}
// ---> LOGIN USERS :
exports.loginUser = (email) => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM USERS WHERE u_email = $1', [email], (error, results) => {
          if (error) {
            reject( error )}
            resolve(results.rows); })
    })
  }
// ---> SET USER TOKEN :
exports.setToken = (token, id) => {
return new Promise(function(resolve, reject) {
    pool.query('UPDATE USERS SET u_token = $1 WHERE u_id = $2 RETURNING *', [token, id], (error, results) => {
        if (error) {
        reject( error )}
        resolve(results.rows); })
    })
}
// -- SET USERS :
exports.signInUser = (req, email, pass) => { 
    return new Promise(function(resolve, reject) {
        const { name, last_name, address, city, postal_code, department, region, vehicle, phone, activity, token, role, status, siret} = req.body
        pool.query('INSERT INTO USERS (u_name, u_last_name, u_address, u_city, u_postal_code, u_department, u_region, u_vehicle, u_phone, u_activity, u_email, u_pass, u_token, u_role, u_status, u_siret, u_created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW()) RETURNING *', 
        [name, last_name, address, city, postal_code, department, region, vehicle, phone, activity, email, pass, token, role, status, siret], (error, results) => {
        if (error) {
            reject(error)}
            resolve(results.rows) })
      })
}
// ---> UPDATE USER :
exports.updateUser = (req) => {
    return new Promise(function(resolve, reject) {
        const { name, last_name, address, city, postal_code, department, region, vehicle, phone, activity, siret} = req.body
        const id = parseInt(req.params.id)
        pool.query('UPDATE USERS SET u_name = $1, u_last_name = $2, u_address = $3, u_city = $4, u_postal_code = $5, u_department = $6, u_region = $7, u_vehicle = $8, u_phone = $9, u_activity = $10, u_siret = $11 WHERE u_id = $12 RETURNING *', 
        [name, last_name, address, city, postal_code, department, region, vehicle, phone, activity, siret, id], (error, results) => {
            if (error) {
            reject( error )}
            resolve(results.rows); })
        })
    }
// ---> UPDATE STATE USER :
exports.updateUserState = (req) => {
  return new Promise(function(resolve, reject) {
      const { status } = req.body
      const id = parseInt(req.params.userid)
      pool.query('UPDATE users SET u_status = $1 WHERE u_id = $2 RETURNING *', 
      [status, id], (error, results) => {
          if (error) {
          reject( error )}
          resolve(results.rows); })
      })
  }
// ---> DELETE USER :
exports.deleteUser = (req) => {
    return new Promise(function(resolve, reject) {
        const id = parseInt(req.params.userid)
        pool.query('DELETE FROM USERS WHERE u_id = $1', [id], (error, results) => {
            if (error) {
            reject( error )}
            resolve(results.rows); })
        })
    }
// ---> GET IMAGE :
exports.getUserImage = (req) => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(req.params.id)
  
      pool.query('SELECT u_profil_image FROM USERS WHERE u_id = ($1)', 
      [ id ], (error, results) => {
        if (error) {
          reject(error)}
        resolve(results.rows)})
    })
  }   
// ---> UPDATE IMAGE :
exports.updateUserImage = (req) => {
    return new Promise(function(resolve, reject) {
      const  data  = req.file.path
      const id = parseInt(req.params.id)
  
      pool.query('UPDATE USERS SET u_profil_image = ($1) WHERE u_id = ($2)', 
      [ data, id ], (error, results) => {
        if (error) {
          reject(error)}
        resolve(results.rows)})
    })
  }
// ---> DELETE IMAGE :
exports.deleteUserImage = (req) => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(req.params.id)
      pool.query("UPDATE USERS SET u_profil_image = '' WHERE u_id = $1", 
      [  id ], (error, results) => {
        if (error) {
          reject(error)}
        resolve(results.rows)})
    })
  }
// ---> VERIFICATION USER IMAGE :
exports.secureUserImage = (imageUrl) => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT u_id FROM USERS WHERE u_profil_image = ($1)', 
      [ imageUrl ], (error, results) => {
        if (error) {
          reject(error)}
        resolve(results.rows)})
    })
  }  
// ---> GET PDF :
exports.getUserPdf = (req) => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(req.params.id)
    pool.query('SELECT u_curiculum_vitea FROM USERS WHERE u_id = ($1)', 
    [ id ], (error, results) => {
      if (error) {
        reject(error)}
      resolve(results.rows)})
  })
} 
// ---> UPDATE PDF :
exports.updateUserPdf = (req) => {
  return new Promise(function(resolve, reject) {
    const  data  = req.file.path
    const id = parseInt(req.params.id)
    pool.query('UPDATE USERS SET u_curiculum_vitea = ($1) WHERE u_id = ($2)', 
    [ data, id ], (error, results) => {
      if (error) {
        reject(error)}
      resolve(results.rows)})
  })
}
// ---> DELETE PDF :
exports.deleteUserPdf = (req) => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(req.params.id)
    pool.query("UPDATE USERS SET u_curiculum_vitea = '' WHERE u_id = $1", 
    [  id ], (error, results) => {
      if (error) {
        reject(error)}
      resolve(results.rows)})
  })
}