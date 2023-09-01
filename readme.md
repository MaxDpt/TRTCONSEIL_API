# TRT CONSEIL API-REST

Cette API permet l'ouverture d'uns serveur mettant en lien, l'application web de TRT CONSEIL APP et sa base de donnée. 
Elle constitue le BACK-END de l'application et permet d'effectuer toutes les fonctions et vérifications en lien avec les donnée enregistré en base. 

Démarage en local :
- Pour le fonctionnement en local, veuillez à avoir installé Node.js. 
- L'API fonctionne avec une base de donnée Postgres SQL. L'installation de PG Admin 4 est recommandé. 
- Les variables d'environement doivent être contenue dans un fichier .env à la soucre du projet. Ce fichier n'est pas partagé sur le depot Git. Veuillez l'ajouter pour que l'appli fonctionne.

  
    Port du serveur :
  
      - SERVER_PORT =

  
    Information de connexion à la base de donnée :
  
      - DB_USER =
  
      - DB_HOST =
  
      - DB_DATABASE =
  
      - DB_PASSWORD =
  
      - DB_PORT =

  
    Clé de chiffremement :
  
      - KEY_CRYPTOJS_EMAIL =
  
      - KEY_JWT_TOKEN =
  
  
    Information de connexion SMTP :
  
      - MAILER_HOST =
  
      - MAILER_PORT =
  
      - MAILER_AUTH_USER =
  
      - MAILER_AUTH_PASS =
  
  
    Limite des requêtes :
  
      - LIMIT =
  

Commande pour lancer le serveur :  

`$ npm run serve`
