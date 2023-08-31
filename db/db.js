// import de l'outil Pool de Express pg pour connexion à la base de donnée
const Pool = require('pg').Pool

// import package pour utiliser les variables d'environnment
const dotenv = require("dotenv");
const result = dotenv.config();

// paramètre de connexion à la base de donnée
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// connexion à la base de donnée
pool.connect()
.then(() => console.log("connexion à la base de donnée réussi"))
.catch(() => console.log("connexion à la base de donnée échoué"))

// export des paramètres de connexion à la base de donnée
module.exports = (pool)