// ---> STORES ROUTES

// IMPORT ----------->
// import de Express
const express = require("express");
// import middleware d'authentification
const authentification = require("../middleware/authentification")
// import des controlleurs
const storesControllers = require("../controllers/stores")
// <------------------

// fonction Router()
const router = express.Router();

// ---> Get route (endpoint) : 
router.get("/stores/:id",authentification,  storesControllers.getStores);

router.get("/stores_user/:id",authentification,  storesControllers.getStores_userID);

router.get("/store/:id/:storeid",authentification,  storesControllers.getStore);

// ---> Set route (endpoint) : 
router.post("/store/:id",authentification,  storesControllers.setStore);

// ---> Update route (endpoint) : 
router.put("/store/:id/:storeid",authentification,  storesControllers.updateStore);

// ---> Delete route (endpoint) : 
router.delete("/store/:id/:storeid",authentification,  storesControllers.deleteStore);

// export des routes
module.exports = (router);