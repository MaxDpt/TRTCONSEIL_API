// IMPORT --------->
// import de validator pour email
const validator = require("validator")
// <------------------

// export du middleware de email Validation
module.exports = (req, res, next) => { 
// ---> récupération de l'email dans la requête :
    const {email} = req.body
// ---> vérification du format de l'email:  
    if (validator.isEmail(email)) {

        next();

    } else {
        return res.status(400).json({
            error : `l'email ${email} n'est pas valide` });
    }
}