const express = require("express"); 
const mongoose = require('mongoose');
const User = require("../Schemas/schema")
const jwt = require('jsonwebtoken');
const auth = express.Router();
const bcrypt = require('bcrypt');
const secret_key = process.env.secret_key;
const saltRounds = 10;
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Authentification
 */
///// sign up
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Sing Up
 *     description: L'inscription et la création de le compte d'utilisateur dans la base de données 
 *     tags: [Authentification]
 *     responses:
 *       201: 
 *         description: Compte créé avec succès
 *       400:
 *         description: Nom d\'utilisateur déjà pris
 *       500:
 *         description: Erreur lors de la création du compte
 */
auth.post('/signup',authController.signup);
  //// log in 
  /**
 * @swagger
 * /login:
 *   post:
 *     summary: Login
 *     description: Vérifier si l'utilisateur a déjà un compte 
 *     tags: [Authentification]
 *     responses:
 *       201: 
 *         description: Compte créé avec succès
 *       401:
 *         description: Nom d'utilisateur ou mot de passe incorrect
 *       500:
 *         description: Erreur lors de l\'authentification
 */
auth.post('/login',authController.login);
  
  module.exports = auth;