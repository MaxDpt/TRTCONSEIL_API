// import de l'outil Pool de Express pg pour connexion à la base de donnée
const {Client} = require('pg');

// import package pour utiliser les variables d'environnment
const dotenv = require("dotenv");
const result = dotenv.config();

// paramètre de connexion à la base de donnée
const pool = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

// connexion à la base de donnée
pool.connect()
.then(() => console.log("connexion à la base de donnée réussi"))
.catch(() => console.log("connexion à la base de donnée échoué"))

// export des paramètres de connexion à la base de donnée
module.exports = (pool)