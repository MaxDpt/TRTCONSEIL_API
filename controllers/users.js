// ---> USERS CONTROLLERS

// IMPORT ----------->
// import package pour utiliser les variables d'environnment
const dotenv = require("dotenv");
const result = dotenv.config();
// import de bcrypt
const bcrypt = require("bcrypt")
// import de crypto-js
const cryptojs = require("crypto-js")
// import jsonwebtoken
const jsonwebtoken = require("jsonwebtoken")
// import de FS node.js (accès fichier du serveur)
const fs = require("fs")
// import des models
const models = require("../models/users");
// import mailer
const mailer = require("../mailer/mailer");
const mailerText = require("../mailer/mailer_text.json");
// <------------------



// -----> Affiche les utilisateurs de la base de donnée :
exports.getUsers = async (req, res) => {
    try {
        // ---> Attente de la promesse : 
        const getUsers = await models.getUsers(req);
        const getUsers_Count = await models.getUsers_Count(req);
        // ---> Envoie de la promesse dans la response :
        res.status(200).json({results: getUsers,
                              Count: getUsers_Count});
    }
    // ---> envoie de l'erreur dans la response :
    catch(error) {
        res.status(500).json({error: error}); 
    }
}
exports.getUsers_department = async (req, res) => {
    try {
        // ---> Attente de la promesse : 
        const getUsers_department = await models.getUsers_department(req);
        const getUsers_department_Count = await models.getUsers_department_Count(req);
        // ---> Envoie de la promesse dans la response :
        res.status(200).json({results: getUsers_department,
                              Count: getUsers_department_Count});
    }
    // ---> envoie de l'erreur dans la response :
    catch(error) {
        res.status(500).json({error: error}); 
    }
}
// -----> Affiche un utilisateur de la base de donnée :
exports.getUserID = async (req, res) => { 
    try {
        const getUserID = await models.getUserID(req)
        res.status(200).send(getUserID);
    }
    catch (error) {
        res.status(500).json({error: error});  
    }
}
// -----> Affiche les utilisateurs de la base de donnée par leurs role :
exports.getUserRole = async (req, res) => { 
    try {
        const getUserRole = await models.getUserRole(req)
        res.status(200).json(getUserRole);
    }
    catch (error) {
        res.status(500).json({error: error});  
    }
}
// -----> Affiche le role de l'utilisateurs de la base de donnée :
exports.getControl_userRole = async (req, res) => { 
    try {
        const getControl_userRole = await models.getControl_userRole(req)
        res.status(200).json(getControl_userRole);
    }
    catch (error) {
        res.status(500).json({error: error});  
    }
}
// -----> Recupération des identifiants de connexion dans la base de donnée :
exports.logInUser = async (req, res) => { 
    try {
        // --> chifrement de l'email :
        const email = req.body.email;
        const loginUser = await models.loginUser(email)
        // --> verification si utilisateur existant :
        if (loginUser[0].u_email) {
        // --> comparassion des mot de pass :
        const passbcrypt = await bcrypt.compare(req.body.pass, loginUser[0].u_pass )
        if (passbcrypt) {
        // --> creation du token :
        const token = jsonwebtoken.sign(
            {userId: loginUser[0].u_id}, // -----------> Identifiant utlisateur 
            `${process.env.KEY_JWT_TOKEN}`, // --------> Clé de sécurité
            {expiresIn: "12h"} // ---------------------> Delai d'expiration
        );
        try {
        // --> modification du token en base de donnée : 
            models.setToken(token, loginUser[0].u_id);
        try {
        // --> récupération de l'utlisateur avec le token :
            const getUserToken = await models.getUserToken(token);
            return res.status(200).send(getUserToken);
        }
        catch (error) {return res.status(500).json(error);}
        } 
        catch (error) {return res.status(500).json(error);}
        } else { return res.status(401).json({ error : "mot de passe invalide"}); }
        } else { return res.status(401).json({ error : "l'utilisateur n'existe pas"}); } 
    }
    catch (error) {
        res.status(500).json({error : "l'utilisateur n'existe pas" }); }
}
// -----> Enregistrer l'utilisateur dans la base de donnée :
exports.signInUser = async (req, res) => { 
    try {
        const emailText = mailerText.signIn;
        // --> chifrement de l'email : 
        const email = req.body.email;    
        // --> hashage du mot de passe :  
        const pass = (await bcrypt.hash( req.body.pass, 10 )).toString();
        try {
        // --> model d'enregistrment en base de donnée : 
            const signInUser = await models.signInUser(req, email, pass);
        // ---> Envoie du mail de confirmation :
            const sendEmail = await mailer.sendEmail(req, emailText);
            if (signInUser && sendEmail) {
        // ---> Envoie de la réponse :
                return res.status(200).json({user : signInUser, enveloppe : sendEmail} ); }
            else { return res.status(400).json({error : "Echec de l'execution" }); }
            }
            catch (error) { return res.status(400).json({error : error }); }
        }
        catch (error) { return res.status(500).json({error : error }); }
}
// -----> Modifier l'utilisateur de la base de donnée :
exports.updateUser = async (req, res) => { 
    try {
        const updateUser = await models.updateUser(req);
        return res.status(200).json(updateUser);
    }
    catch (error) {
        return res.status(500).json(error); }
}
// -----> Modifier le status utilisateur de la base de donnée :
exports.updateUserState = async (req, res) => { 
    try {
        const emailText = mailerText.updateState;
        // ---> Vérification du role de l'utilisateur :
        const getControl_userRole = await models.getControl_userRole(req);
        if (getControl_userRole[0].u_role === 'consultant' || 
            getControl_userRole[0].u_role === 'administrator') {
            try {
        // ---> Modification du status en base de donnée :
                const updateUserState = await models.updateUserState(req);
        // ---> Envoie du mail de confirmation :
                const sendEmail = await mailer.sendEmail(req, emailText);
                if (updateUserState && sendEmail) {
        // ---> Envoie de la réponse :
                    return res.status(200).json({state : updateUserState, enveloppe : sendEmail} ); }
                else { return res.status(400).json({error : "Echec de l'execution" }); }
            }
            catch (error) { return res.status(500).json(error); }
        } else { return res.status(401).json({error : "Autorisation rejeté"}); }
    }
    catch (error) { return res.status(500).json({error : error}); }
}
// -----> Suprimmer l'utilisateur de la base de donnée :
exports.deleteUser = async (req, res) => { 
    try {
        // ---> Vérification du role de l'utilisateur :
        const getControl_userRole = await models.getControl_userRole(req);
        var emailText = mailerText
        // ---> Mailer text du role consultant et administrator :
        if (getControl_userRole[0].u_role === 'consultant' || 
        getControl_userRole[0].u_role === 'administrator') {
             emailText = mailerText.adminDelete;
        }
        // ---> Mailer text de l'utilisateur :
        if (req.params.id === req.params.userid) {
             emailText = mailerText.userDelete;
        }
        if (getControl_userRole[0].u_role === 'consultant' || 
            getControl_userRole[0].u_role === 'administrator' || 
            req.params.id === req.params.userid) { 
            try {
        // ---> Suppression de l'utilisateur :
                const deleteUser = await models.deleteUser(req);
                const sendEmail = await mailer.sendEmail(req, emailText);
                return res.status(200).json({ user : deleteUser, enveloppe : sendEmail});
            }
            catch (error) { return res.status(500).json(error); } 
        } else { return res.status(400).json({error : "Autorisation rejeté"}); }
    }
    catch { return res.status(500).json({error : "Autorisation rejeté"}); }
}
// -----> Modifier la photo de profil en base de donnée et du server :
exports.updateUserImage = async (req, res) => { 
    try {
    // ---> récupération de l'images existante : 
        const getUserImage = await models.getUserImage(req);
        const lastImage = getUserImage[0].u_profil_image
        if (lastImage) { 
    // ---> suppression de l'image existante dans le serveur :
    fs.unlink(lastImage, async (error) => { if (error) { 
        const updateUserImage = await models.updateUserImage(req);
        return res.status(200).send(updateUserImage);
        } else {
    // ---> enregistrement de la nouvel image dans le serveur :
        try {
            const updateUserImage = await models.updateUserImage(req);
            return res.status(200).send(updateUserImage); }
        catch (error) { res.status(500).send(error); }}; })
        } else {
    // ---> si pas d'image à supprimer : 
    // ---> enregistrement de l'image dans le serveur :
        try {
            const updateUserImage = await models.updateUserImage(req);
            return res.status(200).send(updateUserImage); }
        catch (error) {
            return res.status(500).send(error); } };
    }
    catch (error) { res.status(500).json(error); }
}
// -----> Supprimer la photo de profil en base de donnée et du server :
exports.deleteUserImage = async (req, res) => {  
    try {
    // ---> récupération du l'image en base de donnée avec params.ID :
        const getUserImage = await models.getUserImage(req);
        const imageUrl = getUserImage[0].u_profil_image;
    // ---> supression de l'image sur le serveur :  
    fs.unlink(imageUrl, async (error) => { if (error) { throw error;
    } else { 
        try {
    // ---> mise à jour de la base de donnée :
            const deleteUserImage = await models.deleteUserImage(req);
            return res.status(200).send(deleteUserImage);
        }
        catch (error) { return res.status(500).json(error); }
    }});
    }
    catch (error) { return res.status(500).json(error); }
}
// -----> Modifier le pdf du cv en base de donnée et du server :
exports.updateUserPdf = async (req, res) => { 
    try {
    // ---> récupération de l'images existante : 
        const getUserPdf = await models.getUserPdf(req);
        const lastFile = getUserPdf[0].u_curiculum_vitea;
        if (lastFile) { 
    // ---> suppression de l'image existante dans le serveur :
    fs.unlink(lastFile, async (error) => { if (error) { 
            const updateUserPdf = await models.updateUserPdf(req);
            return res.status(200).send(updateUserPdf);
        } else {
    // ---> enregistrement de la nouvel image dans le serveur :
        try {
            const updateUserPdf = await models.updateUserPdf(req);
            return res.status(200).send(updateUserPdf); }
        catch (error) { res.status(500).send(error); }}; })
        } else {
    // ---> si pas d'image à supprimer : 
    // ---> enregistrement de l'image dans le serveur :
        try {
            const updateUserPdf = await models.updateUserPdf(req);
            return res.status(200).send(updateUserPdf); }
        catch (error) {
            return res.status(500).send(error); } };
    }
    catch (error) { res.status(500).json(error); }
}
// -----> Supprimer le pdf du cv en base de donnée et du server :
exports.deleteUserPdf = async (req, res) => {  
    try {
    // ---> récupération du l'image en base de donnée avec params.ID :
        const getUserPdf = await models.getUserPdf(req);
        const fileUrl = getUserPdf[0].u_curiculum_vitea;
    // ---> supression de l'image sur le serveur :  
    fs.unlink(fileUrl, async (error) => { if (error) { throw error;
    } else { 
        try {
    // ---> mise à jour de la base de donnée :
            const deleteUserPdf = await models.deleteUserPdf(req);
            return res.status(200).send(deleteUserPdf);
        }
        catch (error) { return res.status(500).json(error); }
    }});
    }
    catch (error) { return res.status(500).json(error); }
}