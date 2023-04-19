# Exercice - Carte de restaurant
Le but de cet exercice est de créer un serveur Node.js qui gère une carte de restaurant. 
La carte sera stockée dans un fichier CSV qui contient 5 catégories : id, nom, description, prix, categorie Le serveur devra permettre d'afficher la carte du restaurant, de modifier une valeur en fonction de la catégorie de la carte, de supprimer une valeur en fonction de la catégorie de la carte et d'ajouter une valeur à la carte.

## Routes
Voici les différentes routes qui devront être implémentées :

### Afficher la carte
- **URL**: /
- **Méthode**: GET
- **Description**: Cette route permet d'afficher la carte du restaurant.
- **Content type**: text/html

### Modifier une valeur
- **URL**: /carte/{id}
- **Méthode**: PUT
- **Description**: Cette route permet de modifier une valeur en fonction de l'ID de la valeur et de la catégorie de la carte.
- **Content type**: application/json
- **Paramètres**:
  - **id** : L'ID de la valeur à modifier
- **Data**: un objet JSON contenant les données à modifier
  
### Supprimer une valeur
  - **URL**: /carte/{id}
  - **Méthode**: DELETE
  - **Description**: Cette route permet de supprimer une valeur en fonction de l'ID de la valeur et de la catégorie de la carte.
  - **Content type**: application/json
  - **Paramètres**:
    - **id** : L'ID de la valeur à supprimer
    
### Ajouter une valeur
  - **URL**: /carte
  - **Méthode**: POST
  - **Description**: Cette route permet d'ajouter une valeur à la carte.
  - **Content type**: application/json
  - **Data**: un objet JSON contenant les données à ajouter
      

### Contraintes techniques
- Utilisation de http pour la création du serveur (sans utiliser Express).
- Le fichier CSV contenant la carte devra être lu et écrit par le serveur.
- Le serveur devra pouvoir répondre aux requêtes en JSON et en HTML.
- Les données échangées entre le client et le serveur devront être validées.

### Instructions
- Générer le fichier CSV contenant la carte du restaurant.
- Créer un serveur Node.js qui gère la carte de restaurant.
- Implémenter les différentes routes demandées en utilisant http.
- Tester les différentes routes avec Postman pour s'assurer que tout fonctionne correctement.