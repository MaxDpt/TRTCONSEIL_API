// IMPORT --------->

// import de Express
const express = require("express");
// import des routes 
const usersRoutes = require("./routes/users");
const storesRoutes = require("./routes/stores");
const publicationsRoutes = require("./routes/publications");
const candidatysRoutes = require("./routes/candidaty");
const favoritesRoutes = require("./routes/favorites");
// import middleware d'authentification
const authentification = require("./middleware/authentification");
// importation path node.js
const path = require('path')
// <------------------
// créer l'application avec Express
const app = express();

// Express JSON (formatage de la requête)
app.use(express.json())

// CORS (Cross-Origin Request Sharing)
app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Access-Control-Allow-Headers');
    next();
});

// ---> Route d'authentification :
app.use("/api/authentification", usersRoutes );

// ---> Route d'affichage :
app.use("/api/get", usersRoutes, storesRoutes, publicationsRoutes, candidatysRoutes, favoritesRoutes );

// ---> Route d'affichage fichier :
app.use("/api/get/file/:id/:file",  express.static(path.join(__dirname, "file" )));

// ---> Route d'enregistrement :
app.use("/api/set", usersRoutes, storesRoutes, publicationsRoutes, candidatysRoutes, favoritesRoutes );

// ---> Route de modification :
app.use("/api/update", usersRoutes, storesRoutes, publicationsRoutes, candidatysRoutes, favoritesRoutes );

// ---> Route de supression :
app.use("/api/delete", usersRoutes, storesRoutes, publicationsRoutes, candidatysRoutes, favoritesRoutes);


// export de app.js pour accès depuis un autre fichier
module.exports = (app);