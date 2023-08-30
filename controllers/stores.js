// ---> STORES CONTROLLERS

// IMPORT ----------->
const models = require("../models/stores");
// <------------------

// -----> Affiche les magasins de la base de donnée :
exports.getStores = async (req, res) => {
    try {
        // ---> Attente de la promesse : 
        const getStores = await models.getStores();
        // ---> Envoie de la promesse dans la response :
        res.status(200).json(getStores);
    }
    // ---> envoie de l'erreur dans la response :
    catch(error) {
        res.status(500).json({error: error}); 
    }
}
// -----> Affiche les magasins de l'utilisateur en base de donnée :
exports.getStores_userID = async (req, res) => {
    try {
        // ---> Attente de la promesse : 
        const getStores_userID = await models.getStores_userID(req);
        // ---> Envoie de la promesse dans la response :
        res.status(200).json(getStores_userID);
    }
    // ---> envoie de l'erreur dans la response :
    catch(error) {
        res.status(500).json({error: error}); 
    }
}
// -----> Affiche un magasins de la base de donnée :
exports.getStore = async (req, res) => {
    try {
        // ---> Attente de la promesse : 
        const getStore = await models.getStore(req);
        // ---> Envoie de la promesse dans la response :
        res.status(200).json(getStore);
    }
    // ---> envoie de l'erreur dans la response :
    catch(error) {
        res.status(500).json({error: error}); 
    }
}
// -----> Créer un magasins dans la base de donnée :
exports.setStore = async (req, res) => {
    try {
        // ---> Attente de la promesse : 
        const setStore = await models.setStore(req);
        // ---> Envoie de la promesse dans la response :
        res.status(200).json(setStore);
    }
    // ---> envoie de l'erreur dans la response :
    catch(error) {
        res.status(500).json({error: error}); 
    }
}
// -----> Modifier un magasins dans la base de donnée :
exports.updateStore = async (req, res) => {
    try {
        // ---> vérifier si le magasin appartient à l'utilisateur :
        const getStore = await models.getStore(req)
        if (getStore[0].s_user === parseInt(req.params.id)) {
            try {
                // ---> Attente de la promesse : 
                const updateStore = await models.updateStore(req);
                // ---> Envoie de la promesse dans la response :
                res.status(200).json(updateStore);
            }
            // ---> envoie de l'erreur dans la response :
            catch(error) { res.status(500).json({error: "authorisation refusé"}); }
        } else {res.status(500).json({error: "authorisation refusé"}); }
    }
    catch { res.status(500).json({error: error}); }
}
// -----> Supprimer un magasins dans la base de donnée :
exports.deleteStore = async (req, res) => {
    try {
        // ---> vérifier si le magasin appartient à l'utilisateur :
        const getStore = await models.getStore(req)
        if (getStore[0].s_user === parseInt(req.params.id)) { 
            try {
                // ---> Attente de la promesse : 
                const deleteStore = await models.deleteStore(req);
                // ---> Envoie de la promesse dans la response :
                res.status(200).json(deleteStore);
            }
            // ---> envoie de l'erreur dans la response :
            catch(error) { res.status(500).json({error: "authorisation refusé"}); }
        } else {res.status(500).json({error: "authorisation refusé"}); }
    }
    catch { res.status(500).json({error: error}); }
}