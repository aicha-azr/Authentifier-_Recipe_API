const express = require("express"); 
const mongoose = require('mongoose');
const User = require("../schema")
const jwt = require('jsonwebtoken');
const router = express.Router();
const crypto = require('crypto');

router.post('/signup', async (req, res) => {
    try {
      const { name, password } = req.body;
      const existingUser = await User.find({ name:name, password:password});
  
      if (existingUser.length >0) {
        return res.status(400).json({ message: 'Nom d\'utilisateur déjà pris' });
      }
  
      const newUser = new User({ name:name, password:password});
      await newUser.save();
  
      res.status(201).json({ message: 'Compte créé avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la création du compte' });
    }
  });
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if (!user || !(user.password === password)) {
        return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
      }
  
      const token = generateJwtToken(user);
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de l\'authentification' });
    }
  });
  function generateJwtToken(user) {
    const payload = {
      sub: user._id,
      name:user.name,
      password:user.password
    };
    const secretKey = crypto.randomBytes(32).toString('hex'); // Remplacez ceci par votre clé secrète pour la signature JWT
    const options = {
      expiresIn: '1d', // Durée de validité du jeton (par exemple, 1 jour)
    };
    return jwt.sign(payload, secretKey, options);
  }
  
  module.exports = router;