const mongoose = require('mongoose');
const express = require('express');
const verifyToken = require('../Middleware/middleware');
const router = express.Router();
const recipiesController = require('../controllers/recipiesController');

/**
 * @swagger
 * tags:
 *   name: Recettes
 *   description: Gestion des recettes
 */

// Obtenir des recettes par type de plat
/**
 * @swagger
 * /api/{type}:
 *   get:
 *     summary: Obtenir des recettes par type de plat
 *     description: Obtenir un ensemble de recettes ayant le même type de plat
 *     tags: [Recettes]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         description: Le type de plat pour filtrer les recettes
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès
 *       404:
 *         description: Aucune recette trouvée pour le type de plat spécifié
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/:type', verifyToken, recipiesController.retrieveRecipes);

// Supprimer une recette par son nom
/**
 * @swagger
 * /api/{type}/{name}:
 *   delete:
 *     summary: Supprimer une recette par son nom
 *     description: Supprimer une recette en spécifiant son nom et son type dans le chemin
 *     tags: [Recettes]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         description: Le type de plat de la recette à supprimer
 *         schema:
 *           type: string
 *       - in: path
 *         name: name
 *         required: true
 *         description: Le nom de la recette à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès
 *       404:
 *         description: Recette non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.delete('/:type/:name', verifyToken, recipiesController.deleteRecipe);

// Créer une recette
/**
 * @swagger
 * /api/:
 *   post:
 *     summary: Créer une recette
 *     description: Créer une nouvelle recette
 *     tags: [Recettes]
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/', recipiesController.createRecipe);

// Mettre à jour une recette par son nom
/**
 * @swagger
 * /api/{name}:
 *   put:
 *     summary: Mettre à jour une recette par son nom
 *     description: Mettre à jour une recette en spécifiant son nom
 *     tags: [Recettes]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Le nom de la recette à mettre à jour
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès
 *       404:
 *         description: Recette non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
router.put('/:name', recipiesController.updateRecipe);

// Obtenir des recettes en utilisant une requête
/**
 * @swagger
 * /api/query:
 *   get:
 *     summary: Obtenir des recettes
 *     description: Obtenir des recettes en utilisant une requête, par exemple /api/query
 *     tags: [Recettes]
 *     responses:
 *       200:
 *         description: Succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/', verifyToken, recipiesController.getRecipeQuery);

module.exports = router;
