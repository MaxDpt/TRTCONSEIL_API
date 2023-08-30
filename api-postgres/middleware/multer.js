// multer : pour gérer les requêtes HTTP avec envoie de fichier

// importation de multer
const multer = require("multer");

// disctionnaire des MIME TYPES
const MIME_TYPES = {
    'application/pdf': 'pdf',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
};

// destination du fichier (repertoire) et générer un nom de fichier unique
const storage = multer.diskStorage({
    // ---> destination de stockage du fichier
    destination: (req, file, callback) => {
        callback(null, "file");
    },
    filename: (req, file, callback) => {
    // ---> supprimer les espaces dans le nom du fichier
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    // ---> nom de fichier unique :
    callback(null, name + "_" + Date.now() + "." + extension);
    }
})

module.exports = multer({storage}).single("data");