const express = require("express"); 
const mongoose = require('mongoose');
const User = require("../Schemas/schema")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const generateJwtToken = require('../Middleware/generateToken')
const authController = {
    signup:  async (req, res) => {
        try {
          const { name, password } = req.body;
          const hashedPassword = await bcrypt.hash(password, saltRounds);
          const existingUser = await User.find({ name:name, password:password});
      
          if (existingUser.length >0) {
            return res.status(400).json({ message: 'Nom d\'utilisateur déjà pris' });
          }
      
          const newUser = new User({ name:name, password:hashedPassword});
          await newUser.save();
      
          res.status(201).json({ message: 'Compte créé avec succès' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Erreur lors de la création du compte' });
        }
      },
    login: async (req, res) => {
        try {
          const { name, password } = req.body;
          const user = await User.findOne({ name: name });
          console.log(user);
          const dbPassword = user.password;
        //  console.log(user.password)
          if (!user || !(bcrypt.compare(password, dbPassword))) {
            return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
          }
      
          const token = generateJwtToken(user);
          res.json({ token });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Erreur lors de l\'authentification' });
        }
      }
}
module.exports = authController;
