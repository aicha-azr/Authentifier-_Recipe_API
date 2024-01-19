const Recipe = require('../Schemas/recipe')
const recipiesController ={
    retrieveRecipes: async(req,res)=>{
        
            try {
                const recipes = await Recipe.find({ dishType: req.params.type });
        
            if (recipes.length === 0) {
              return res.status(404).send('No recipes found for the specified dishType');
            }
        
            res.json(recipes);
              } catch (error) {
                console.error(error.message);
                res.status(500).send('Internal Server Error');
              }
        
    },
    deleteRecipe: async (req,res)=>{
        try {
            const result = await Recipe.deleteOne({ dishType: req.params.type, name: req.params.name });
        
            if (result.deletedCount === 1) {
              res.send(`the recipe of  ${req.params.name} is deleted `);
            } else {
              res.status(404).send('Recipe not found');
            }
          } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error');
          }
},
    createRecipe: async (req,res)=>{
        try {
            const result = await Recipe.create({
              dishType: req.body.dishType,
              name: req.body.name,
              ingredients: req.body.ingredients,
              instructions: req.body.instructions
            });
        
            res.send(`the recipe is assed : ${result}`);
          } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error');
          }
    },
    updateRecipe: async (req, res) => {
        try {
          const existingRecipe = await Recipe.findOne({ name: req.params.name });
      
          if (!existingRecipe) {
            return res.status(404).send('Recipe not found');
          }
          const updatedRecipe = {
              dishType: req.body.dishType || existingRecipe.dishType,
              name: req.body.name || existingRecipe.name,
              ingredients: req.body.ingredients || existingRecipe.ingredients,
              instructions: req.body.instructions || existingRecipe.instructions
            }
          const result = await Recipe.updateOne(
            { name: req.params.name },
            updatedRecipe
          );
      
          res.send(`the recipe of ${req.params.name} is updated, ${JSON.stringify(updatedRecipe)}`);
        } catch (e) {
          console.error(e.message);
          res.status(500).send('Internal Server Error');
        }
      },
    getRecipeQuery: async(req,res)=>{
        try{
         const query= req.query.dishType;
         console.log(query)
         if(query == null){
          const getRecipe = await Recipe.find();
          return res.status(200).json(getRecipe)
         }
          const getRecipe = await Recipe.find({dishType :query});
         res.status(200).json(getRecipe)
         console.log('Retrieved recipes:', getRecipe);
        }catch(e){
         res.status(500).send('internal server error')
        }
       }
};

module.exports = recipiesController;