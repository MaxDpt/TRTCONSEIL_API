// ---> CANDIDATYS CONTROLLERS

// IMPORT ----------->
// import package pour utiliser les variables d'environnment
const dotenv = require("dotenv");
const result = dotenv.config();
// import de crypto-js
const cryptojs = require("crypto-js")
const models = require("../models/candiaty");
const users_models = require("../models/users");
// import mailer
const mailer = require("../mailer/mailer");
const mailerText = require("../mailer/mailer_text.json");
// <------------------

exports.getCandidatys = async (req, res) => {
    try {
        // ---> Attente de la promesse : 
        const getCandidatys = await models.getCandidatys(req);
        const getCandidatys_Count = await models.getCandidatys_Count(req);
        // ---> Envoie de la promesse dans la response :
        res.status(200).json({results: getCandidatys, 
                              Count: getCandidatys_Count});
    }
    // ---> envoie de l'erreur dans la response :
    catch(error) {
        res.status(500).json({error: error}); 
    }
}
exports.getCandidatys_department = async (req, res) => {
    try {
        // ---> Attente de la promesse : 
        const getCandidatys_department = await models.getCandidatys_department(req);
        const getCandidatys_Count_department = await models.getCandidatys_Count_department(req);
        // ---> Envoie de la promesse dans la response :
        res.status(200).json({results: getCandidatys_department,
                              Count: getCandidatys_Count_department});
    }
    // ---> envoie de l'erreur dans la response :
    catch(error) {
        res.status(500).json({error: error}); 
    }
}
exports.getCandidaty = async (req, res) => {
    try {
        // ---> Attente de la promesse : 
        const getCandidaty = await models.getCandidaty(req);
        // ---> Envoie de la promesse dans la response :
        res.status(200).json(getCandidaty);
    }
    // ---> envoie de l'erreur dans la response :
    catch(error) {
        res.status(500).json({error: error}); 
    }
}
exports.getCandidaty_ForCandidate = async (req, res) => {
    try {
        // ---> Attente de la promesse : 
        const getCandidaty = await models.getCandidaty_ForCandidate(req);
        // ---> Envoie de la promesse dans la response :
        res.status(200).json(getCandidaty);
    }
    // ---> envoie de l'erreur dans la response :
    catch(error) {
        res.status(500).json({error: error}); 
    }
}
exports.getCandidacys_userID = async (req, res) => {
    try {
        // ---> Attente de la promesse : 
        const getCandidacys_userID = await models.getCandidacys_userID(req);
        // ---> Envoie de la promesse dans la response :
        res.status(200).json(getCandidacys_userID);
    }
    // ---> envoie de l'erreur dans la response :
    catch(error) {
        res.status(500).json({error: error}); 
    }
}
exports.getCandidacys_userID_ForCandidate = async (req, res) => {
    try {
        // ---> Attente de la promesse : 
        const getCandidacys_userID = await models.getCandidacys_userID_ForCandidate(req);
        // ---> Envoie de la promesse dans la response :
        res.status(200).json(getCandidacys_userID);
    }
    // ---> envoie de l'erreur dans la response :
    catch(error) {
        res.status(500).json({error: error}); 
    }
}
exports.getCandidacys_userPublicationID = async (req, res) => {
    try {
        // ---> Attente de la promesse : 
        const getCandidacys_userPublicationID = await models.getCandidacys_userPublicationID(req);
        // ---> Envoie de la promesse dans la response :
        res.status(200).json(getCandidacys_userPublicationID);
    }
    // ---> envoie de l'erreur dans la response :
    catch(error) {
        res.status(500).json({error: error}); 
    }
}
exports.setCandidaty = async (req, res) => {
    try {
        const emailText = mailerText.setCandidaty;
        // ---> Attente de la promesse : 
        const setCandidaty = await models.setCandidaty(req);
        // ---> Envoie du mail de confirmation :
        const sendEmail = await mailer.sendEmail(req, emailText);
        // ---> Envoie de la promesse dans la response :
        res.status(200).json({candidaty : setCandidaty, enveloppe : sendEmail });
    }
    // ---> envoie de l'erreur dans la response :
    catch(error) {
        res.status(500).json({error: error}); 
    }
}
exports.updateCandidaty_state = async (req, res) => {
    try {
        var emailText = mailerText.ApproveCandidaty;
        // ---> vérification du role de l'utilisateur : 
    const getControl_userRole = await users_models.getControl_userRole(req);
    if (getControl_userRole[0] && getControl_userRole[0].u_role === 'consultant' ||
        getControl_userRole[0].u_role === 'administrator') {
            try {
                // ---> Attente de la promesse : 
                const updateCandidaty_state = await models.updateCandidaty_state(req);
                // ---> Envoie du mail de confirmation :
                const sendEmail = await mailer.sendEmail(req, emailText);
                emailText = mailerText.Candidaty;
                const sendEmail2 = await mailer.sendEmail(req, emailText);
                // ---> Envoie de la promesse dans la response :
                res.status(200).json({candidaty : updateCandidaty_state, enveloppe : sendEmail, enveloppe2 : sendEmail2});
            }
            // ---> envoie de l'erreur dans la response :
            catch(error) { res.status(500).json({error: error}); }
        } else { res.status(401).json({error: "authorisation refusé"}); }
    }
    catch { res.status(500).json({error: "authorisation refusé"}); }
}
exports.deleteCandidacy = async (req, res) => {
    try {
        // ---> vérification du role de l'utilisateur 
        // ou si la candidature lui appartient : 
    const getControl_userRole = await users_models.getControl_userRole(req);

    const getCandidaty = await models.getCandidaty(req);   
    if (getControl_userRole[0] && getControl_userRole[0].u_role === 'consultant' ||
        getControl_userRole[0].u_role === 'administrator' ||
        getCandidaty[0].c_user === parseInt(req.params.id)) {
            try {
                if (getControl_userRole[0] && getControl_userRole[0].u_role === 'consultant' ||
                getControl_userRole[0].u_role === 'administrator') {
                // ---> Envoie du mail de confirmation :
                    const emailText = mailerText.deleteCandidaty;
                    const sendEmail = await mailer.sendEmail(req, emailText);
                                    // ---> Attente de la promesse : 
                    const deleteCandidacy = await models.deleteCandidacy(req);
                    // ---> Envoie de la promesse dans la response :
                    res.status(200).json({candidaty : deleteCandidacy, enveloppe : sendEmail});
                } else {
                    const deleteCandidacy = await models.deleteCandidacy(req);
                    // ---> Envoie de la promesse dans la response :
                    res.status(200).json({candidaty : deleteCandidacy});
                }

            }
            // ---> envoie de l'erreur dans la response :
            catch(error) { res.status(500).json({error: error}); }
        } else { res.status(401).json({error: "authorisation refusé"}); }
    }
    catch { res.status(500).json({error: "authorisation refusé"}); }
}