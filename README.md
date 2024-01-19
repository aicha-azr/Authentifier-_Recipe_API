# Authentifier à Recipe API

## Description

Ce projet met en œuvre une API d'authentification pour gérer des recettes. Il utilise JSON Web Tokens (JWT) pour l'authentification.

## Table des Matières

- [Installation](#installation)
- [Utilisation](#utilisation)
- [Endpoints API](#endpoints-api)


## Installation

1. Clonez ce dépôt.
   ```bash
   git clone https://github.com/aicha-azr/Authentifier-_Recipe_API.git

## Utilisation
Pour lancer l'application, utilisez la commande suivante :
 
    npm start

L'API sera accessible à l'adresse http://localhost:5001.

### Endpoints API

 #### POST  /signup:Crée un nouvel utilisateur.

Paramètres de la requête\
name: Nom de l'utilisateur.\
password: Mot de passe de l'utilisateur.\
#### POST /login:Authentifie un utilisateur et renvoie un jeton JWT.
Paramètres de la requête.\
username: Nom d'utilisateur.\
password: Mot de passe.
