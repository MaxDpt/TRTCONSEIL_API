// IMPORT --------->
// import de jsonwebtoken
const jsonwebtoken = require("jsonwebtoken");
// import package pour utiliser les variables d'environnment
const dotenv = require("dotenv");
const result = dotenv.config();
// <------------------

// export du middleware d'authentification
module.exports = (req, res, next) => {
    try {

    // récupération du token dans le headers authorization (bearer token ) :
        const token = req.headers.authorization.split(" ")[1];
    // décoder le token :
        const decodedToken = jsonwebtoken.verify(token, `${process.env.KEY_JWT_TOKEN}`);
    // récupérer l'id du token utilisateur :
        const userIdDecodedToken = decodedToken.userId

    // récupérer l'id de l'utilisateur :
        const userIdParams = parseInt(req.params.id)

    // Comparer les données et passer au middleware suivant :
        if (userIdParams && (userIdParams === userIdDecodedToken)) {
            next();
        } else {
            return res.status(401).json({
                message : "erreur d'authentification",
                error : "identifiant invalide"});
        }
    }
    catch (error) {
        return res.status(401).json({
            message : "erreur d'authentification",
            error : error})
    }
}