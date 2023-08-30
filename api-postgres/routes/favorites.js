// IMPORT ----------->
// import de Express
const express = require("express");
// import middleware d'authentification
const authentification = require("../middleware/authentification")
// import des controlleurs
const favoritesControlleurs = require("../controllers/favorites")
// <------------------

// fonction Router()
const router = express.Router();

// ---> Get route (endpoint) : 
router.get("/favorites/:id",authentification,  favoritesControlleurs.getFavorites);

router.get("/favorite/:id/:favoriteid" ,authentification,  favoritesControlleurs.getFavorite);

// ---> Set route (endpoint) : 
router.post("/favorite/:id",authentification,  favoritesControlleurs.setFavorite);

// ---> Delete route (endpoint) : 
router.delete("/favorite/:id/:publicationid",authentification,  favoritesControlleurs.deleteFavorite);




// export des routes
module.exports = (router);