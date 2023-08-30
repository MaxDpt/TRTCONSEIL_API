// ---> STORES CONTROLLERS

// IMPORT ----------->
const models = require("../models/publications");
const stores_models = require("../models/stores");
const users_models = require("../models/users");
// <------------------

exports.getPublications = async (req, res) => {
    try {
        // ---> Attente de la promesse : 
        const getPublications = await models.getPublications(req);
        const getPublications_Count = await models.getPublications_Count(req);
        // ---> Envoie de la promesse dans la response :
        res.status(200).json({results: getPublications,
                              Count: getPublications_Count});
    }
    // ---> envoie de l'erreur dans la response :
    catch(error) {
        res.status(500).json({error: error}); 
    }
}
exports.getPublications_department = async (req, res) => {
    try {
        // ---> Attente de la promesse : 
        const getPublications_department = await models.getPublications_department(req);
        const getPublications_Count_department = await models.getPublications_Count_department(req);
        // ---> Envoie de la promesse dans la response :
        res.status(200).json({results: getPublications_department,
                              Count: getPublications_Count_department});
    }
    // ---> envoie de l'erreur dans la response :
    catch(error) {
        res.status(500).json({error: error}); 
    }
}
exports.getPublications_activity = async (req, res) => {
    try {
        // ---> Attente de la promesse : 
        const getPublications_activity = await models.getPublications_activity(req);
        const getPublications_Count_activity = await models.getPublications_Count_activity(req);
        // ---> Envoie de la promesse dans la response :
        res.status(200).json({results: getPublications_activity,
                              Count: getPublications_Count_activity});
    }
    // ---> envoie de l'erreur dans la response :
    catch(error) {
        res.status(500).json({error: error}); 
    }
}
exports.getPublications_activity_department = async (req, res) => {
    try {
        // ---> Attente de la promesse : 
        const getPublications_activity_department = await models.getPublications_activity_department(req);
        const getPublications_Count_activity_department = await models.getPubgetPublications_Count_activity_departmentications_activity_department(req);
        // ---> Envoie de la promesse dans la response :
        res.status(200).json({results: getPublications_activity_department,
                              Count: getPublications_Count_activity_department});
    }
    // ---> envoie de l'erreur dans la response :
    catch(error) {
        res.status(500).json({error: error}); 
    }
}
exports.getPublication = async (req, res) => {
    try {
        // ---> Attente de la promesse : 
        const getPublication = await models.getPublication(req);
        // ---> Envoie de la promesse dans la response :
        res.status(200).json(getPublication);
    }
    // ---> envoie de l'erreur dans la response :
    catch(error) {
        res.status(500).json({error: error}); 
    }
}
exports.getPublications_userID = async (req, res) => {
    try {
        // ---> Attente de la promesse : 
        const getPublications_userID = await models.getPublications_userID(req);
        const getPublications_userID_Count = await models.getPublications_userID_Count(req);
        // ---> Envoie de la promesse dans la response :
        res.status(200).json({results: getPublications_userID,
                              Count: getPublications_userID_Count});
    }
    // ---> envoie de l'erreur dans la response :
    catch(error) {
        res.status(500).json({error: error}); 
    }
}
exports.setPublication = async (req, res) => {
    try {
        // ---> vérifier si le magasin appartient à l'utilisateur :
        const getStore = await stores_models.getStore(req);
        if (getStore[0] && (getStore[0].s_user === parseInt(req.params.id))) {
            try {
                // ---> Attente de la promesse : 
                const setPublication = await models.setPublication(req);
                // ---> Envoie de la promesse dans la response :
                res.status(200).json(setPublication);
            }
            // ---> envoie de l'erreur dans la response :
            catch(error) { res.status(500).json({error: error}); }
        } else {res.status(401).json({error: "Le magasin n'existe pas ou ne vous appartient pas."}); }
    } 
    catch (error){ res.status(500).json({error: error}); }
}
exports.updatePublication = async (req, res) => {
    try {
        // ---> vérifier si la publication appartient à l'utilisateur :
        const getControl_userRole = await users_models.getControl_userRole(req);
        if (getControl_userRole[0] && (getControl_userRole[0].u_role === 'consultant' || getControl_userRole[0].u_role === 'administrator')) {
            try {
                // ---> Attente de la promesse : 
                const updatePublication = await models.updatePublication(req);
                // ---> Envoie de la promesse dans la response :
                res.status(200).json(updatePublication);
            }
            // ---> envoie de l'erreur dans la response :
            catch(error) { res.status(500).json({error: "La publication n'existe pas"}); }
        } else {res.status(401).json({error: "Authorisation refusé"}); }
    } 
    catch (error){ res.status(500).json({error: error}); }
}
exports.deletePublication = async (req, res) => {
    try {
        // ---> vérifier si la publication appartient à l'utilisateur
        // ou si l'utlisateur est authorisé par son role :
        const getControl_userRole = await users_models.getControl_userRole(req);
        const getPublication = await models.getPublication(req);
        
        if (getControl_userRole[0] && (getControl_userRole[0].u_role === 'consultant' ||
             getControl_userRole[0].u_role === 'administrator' ||
             parseInt(req.params.id) === getPublication[0].p_user )) {
            try {
                // ---> Attente de la promesse : 
                const deletePublication = await models.deletePublication(req);
                // ---> Envoie de la promesse dans la response :
                res.status(200).json(deletePublication);
            }
            // ---> envoie de l'erreur dans la response :
            catch(error) { res.status(500).json({error: "La publication n'existe pas"}); }
        } else {res.status(401).json({error: "Authorisation refusé"}); }
    } 
    catch (error){ res.status(500).json({error: error}); }
}