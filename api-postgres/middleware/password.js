// IMPORT ----------->

// import de password validator
const passwordValidator = require("password-validator")
// <------------------

// --> Fonction de password-validator : 
const passwordSchema = new passwordValidator();

// --> Schéma du password : 
passwordSchema
.is().min(8) // -------------------------------------- Longueur minumum 
.is().max(100) // ------------------------------------ Longueur maximum
.has().uppercase() // -------------------------------- Majuscule
.has().lowercase() // -------------------------------- Minuscule
.has().digits(2) // ---------------------------------- Nombre de chiffre
.has().not().spaces() // ----------------------------- Pas d'espace
.is().not().oneOf(['Passw0rd', 'Password123']); // --- Mot de passe interdit


module.exports = (req, res, next) => {
    // --> Vérification du passwword :
    if (passwordSchema.validate(req.body.pass)) {
        next();
    } else {
        return res
        .status(500).json({
            error : `Le mot de passe n'est pas assez fort : 
            ${passwordSchema.validate('req.body.pass', {list: true})}`
        })
    }
}