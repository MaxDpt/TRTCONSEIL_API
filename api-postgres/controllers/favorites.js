// ---> CANDIDATYS CONTROLLERS

// IMPORT ----------->
const models = require("../models/favorites");
const users_models = require("../models/users");
// <------------------

exports.getFavorites = async (req, res) => {
    try {
        // ---> Attente de la promesse : 
        const getFavorites = await models.getFavorites(req);
        // ---> Envoie de la promesse dans la response :
        res.status(200).json(getFavorites);
    }
    // ---> envoie de l'erreur dans la response :
    catch(error) {
        res.status(500).json({error: error}); 
    }
}
exports.getFavorite = async (req, res) => {
    try {
        // ---> Attente de la promesse : 
        const getFavorite = await models.getFavorite(req);
        // ---> Envoie de la promesse dans la response :
        res.status(200).json(getFavorite);
    }
    // ---> envoie de l'erreur dans la response :
    catch(error) {
        res.status(500).json({error: error}); 
    }
}
exports.setFavorite = async (req, res) => {
    try {
        // ---> Attente de la promesse : 
        const setFavorite = await models.setFavorite(req);
        // ---> Envoie de la promesse dans la response :
        res.status(200).json(setFavorite);
    }
    // ---> envoie de l'erreur dans la response :
    catch(error) {
        res.status(500).json({error: error}); 
    }
}
exports.deleteFavorite = async (req, res) => {
    try {
    // ---> Attente de la promesse : 
    const deleteFavorite = await models.deleteFavorite(req);
    // ---> Envoie de la promesse dans la response :
    res.status(200).json(deleteFavorite);

    } catch { res.status(500).json({error: "Authorisation refusé"});  }
}