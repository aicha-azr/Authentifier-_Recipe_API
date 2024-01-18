const express = require("express"); 
const mongoose = require('mongoose');
const User = require("../Schemas/schema")
const jwt = require('jsonwebtoken');
const auth = express.Router();
const crypto = require('crypto');
const router = require("./router")
const bcrypt = require('bcrypt');
const secret_key = process.env.secret_key;
const saltRounds = 10;
auth.post('/signup', async (req, res) => {
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
  });
auth.post('/login', async (req, res) => {
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
      name:user.name
    };
    const secretKey = secret_key; 
    const options = {
      expiresIn: '1d', 
    };
    return jwt.sign(payload, secretKey, options);
  }
  auth.get('/', verifyToken, (req, res) => {
    auth.use('/recipes', verifyToken, router);
    res.status(200).json({ message: 'Protected route accessed' });
    
    });  

  function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
     const decoded = jwt.verify(token, secret_key);
     req.userId = decoded.userId;
     next();
     } catch (error) {
     res.status(401).json({ error: 'Invalid token' });
     }
     };
  module.exports = auth;