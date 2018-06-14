# Test technique

## Instruction

Page web sur laquelle il doit être possible de déposer un fichier par drag and drop.

Les formats de fichier acceptés sont excel (.xlsx) et csv (.csv). Le fichier contient un listing de commandes qui doit être parcouru et cette liste doit être affichée sous forme de tableau sur la page web et envoyée à l'URL suivante :

https://test.sympl.fr/test.php

La requête doit être une requête POST dont le corps doit respecter la structure suivante :

https://pastebin.com/xTVrR83n

Le serveur renvoie une réponse JSON dont l'objet contient un seul attribut, "equals", qui est un boolean valant true si le JSON envoyé correspond à ce qui est demandé, false sinon.

Le candidat peut choisir les outils qu'il souhaite pour réaliser cet exercice à l'exception de VueJS et AngularJS. Toutes les actions décrites doivent se faire sans rechargement de page.

## Run

`npm install`

`npm start`

## How to use

Ouvrir la console

Drag and drop un fichier .xlsx, dans la zone prévue à cet effet

Cliquer sur le bouton : `Post your file(s) in JSON format`
