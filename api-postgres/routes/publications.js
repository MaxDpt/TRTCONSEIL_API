// ---> STORES ROUTES

// IMPORT ----------->
// import de Express
const express = require("express");
// import middleware d'authentification
const authentification = require("../middleware/authentification")
// import des controlleurs
const publicationsControlleurs = require("../controllers/publications")
// <------------------

// fonction Router()
const router = express.Router();


// ---> Affichage route (endpoint) : 
router.post("/publications/:id",authentification,  publicationsControlleurs.getPublications);

router.post("/publications_department/:id",authentification,  publicationsControlleurs.getPublications_department);

router.post("/publications_activity/:id",authentification,  publicationsControlleurs.getPublications_activity);

router.post("/publications_activity_department/:id",authentification,  publicationsControlleurs.getPublications_activity_department);

router.post("/publications_user/:id",authentification,  publicationsControlleurs.getPublications_userID);

router.get("/publication/:id/:publicationid",authentification,  publicationsControlleurs.getPublication);

// ---> Ajout route (endpoint) : 
router.post("/publication/:id",authentification,  publicationsControlleurs.setPublication);

// ---> Mise à jour route (endpoint) : 
router.put("/publication/:id/:publicationid",authentification,  publicationsControlleurs.updatePublication);

// ---> Supression route (endpoint) : 
router.delete("/publication/:id/:publicationid",authentification,  publicationsControlleurs.deletePublication);





// export des routes
module.exports = (router);