const mongoose = require('mongoose');
const express = require('express');
const Recipe = require('../Schemas/recipe');
const verifyToken = require('../middleware');
const router = express.Router();
const recipiesController = require('../controllers/recipiesController')
// get recipes by dishType
router.get('/:type',verifyToken, recipiesController.retrieveRecipes ) 
// delete a recipe by its name
router.delete('/:type/:name',verifyToken ,recipiesController.deleteRecipe);
// create a recipe
router.post('/', recipiesController.createRecipe);
// update a recipe by its name
router.put('/:name',recipiesController.updateRecipe);
  // get recipes using query
router.get('/', verifyToken, recipiesController.getRecipeQuery)  
module.exports = router;