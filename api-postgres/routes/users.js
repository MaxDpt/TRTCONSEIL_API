// ---> USERS ROUTES

// IMPORT ----------->
// import de Express
const express = require("express");
// import des controllers
const userControllers = require("../controllers/users");
// import middleware email validator
const emailValidation = require("../middleware/emailValidation")
// import middleware password validator
const password = require("../middleware/password")
// import middleware d'authentification
const authentification = require("../middleware/authentification")
// import middleware de multer
const multer = require("../middleware/multer")
// <------------------

// fonction Router()
const router = express.Router();

// ---> Authentification route (endpoint) : 
router.post("/logIn", emailValidation, userControllers.logInUser);

router.post("/signIn", emailValidation, password, userControllers.signInUser);

// ---> Get route (endpoint) : 
router.post("/users/:id",authentification,  userControllers.getUsers);

router.post("/users_department/:id",authentification,  userControllers.getUsers_department);

router.get("/user/:id/:userid",authentification, userControllers.getUserID);

router.post("/userToRole/:id",authentification, userControllers.getUserRole);

router.get("/userRole/:id",authentification, userControllers.getControl_userRole);

// ---> Update route (endpoint) : 
router.put("/user/:id", authentification, userControllers.updateUser);

router.put("/userState/:id/:userid", authentification, userControllers.updateUserState);

router.put("/userImage/:id", authentification, multer, userControllers.updateUserImage);

router.put("/userPdf/:id", authentification, multer, userControllers.updateUserPdf);

// ---> Delete route (endpoint) : 
router.delete("/user/:id/:userid", authentification, userControllers.deleteUser);

router.delete("/userImage/:id", authentification, userControllers.deleteUserImage);

router.delete("/userPdf/:id", authentification, userControllers.deleteUserPdf);


// export des routes
module.exports = (router);