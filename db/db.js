// import de l'outil Pool de Express pg pour connexion à la base de donnée
const { Client } = require('pg');
const Pool = require('pg').Pool;

// import package pour utiliser les variables d'environnment
const dotenv = require("dotenv");
const result = dotenv.config();

// paramètre de connexion à la base de donnée
if (process.env.DATABASE_URL) {
  const pool = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  // connexion à la base de donnée
pool.connect()
.then(() => console.log("connexion à la base de donnée réussi // Production"))
.catch(() => console.log("connexion à la base de donnée échoué // Production"))

// export des paramètres de connexion à la base de donnée
module.exports = (pool)
 } 

if (!process.env.DATABASE_URL) {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT, 
 });
 // connexion à la base de donnée
pool.connect()
.then(() => console.log("connexion à la base de donnée réussi // Developpement"))
.catch(() => console.log("connexion à la base de donnée échoué // Developpement"))

// export des paramètres de connexion à la base de donnée
module.exports = (pool)
}

