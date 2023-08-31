// import package HTTP Node.js pour avoir les outils 
// qui permetent de créé le serveur
const http = require("http");

// import de l'application API app.js
const app = require("./app");

// import package pour utiliser les variables d'environnment
const dotenv = require("dotenv");
const result = dotenv.config();

// param du port avec la méthode set de Express
app.set("port", process.env.SERVER_PORT);

// methode createServer( ) prend en argument
// la focntion qui sera appelé à chaque requête reçu par la serveur
// les fonctions seront dans app.js
const server = http.createServer(app);

// le serveur écoute les requête sur le port
server.listen(process.env.PORT || process.env.SERVER_PORT, () => {
    console.log(`le serveur écoute sur le port ${process.env.SERVER_PORT}`)
});