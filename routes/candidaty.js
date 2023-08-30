// IMPORT ----------->
// import de Express
const express = require("express");
// import middleware d'authentification
const authentification = require("../middleware/authentification")
// import des controlleurs
const candidatyControlleurs = require("../controllers/candidaty")
// <------------------

// fonction Router()
const router = express.Router();

// ---> Get route (endpoint) : 
router.get("/candidatys_user/:id",authentification,  candidatyControlleurs.getCandidacys_userID);

router.get("/candidatys_user_candidate/:id",authentification,  candidatyControlleurs.getCandidacys_userID_ForCandidate);


router.get("/candidatys_user_publication/:id",authentification,  candidatyControlleurs.getCandidacys_userPublicationID);

router.get("/candidaty/:id/:candidatyid",authentification,  candidatyControlleurs.getCandidaty);

router.get("/candidaty_candidate/:id/:candidatyid",authentification,  candidatyControlleurs.getCandidaty_ForCandidate);

// ---> Set route (endpoint) : 
router.post("/candidatys/:id",authentification,  candidatyControlleurs.getCandidatys);

router.post("/candidatys_department/:id",authentification,  candidatyControlleurs.getCandidatys_department);

router.post("/candidaty/:id",authentification,  candidatyControlleurs.setCandidaty);

// ---> Update route (endpoint) : 
router.put("/candidaty_state/:id/:candidatyid",authentification,  candidatyControlleurs.updateCandidaty_state);

// ---> Delete route (endpoint) : 
router.delete("/candidaty/:id/:candidatyid",authentification,  candidatyControlleurs.deleteCandidacy);




// export des routes
module.exports = (router);