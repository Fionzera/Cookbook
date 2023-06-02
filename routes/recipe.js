const express = require("express");
const z = require("zod");
const auth = require("../middleware/auth");
const {
  userAllRecipes,
  saveRecipes,
  updateRecipes,
  deleteRecipes,
} = require("../database/recipe");

const router = express.Router();

const recipeSchema = z.object({
  title: z.string(),
  preparationMethod: z.string(),
  ingredients: z.string(),
  cookingTime: z.string(),
});

router.get("/recipes", auth, async (req, res) => {
  const recipes = await userAllRecipes(req.userId);
  res.json({
    recipes,
  });
});

router.post("/recipe", auth, async (req, res) => {
  try {
    const recipe = recipeSchema.parse(req.body);
    const userId = req.userId;
    const savedRecipe = await saveRecipes(recipe, userId);

    res.status(201).json({
      recipe: savedRecipe,
      message: "Recipe saved sucessfully!",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json({
        message: error.errors,
      });
    }

    res.status(500).json({
      message: "Server error!",
    });
  }
});

router.put("/recipes/:id", auth, async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.userId;
    const updatedRecipeData = req.body;

    const updatedRecipe = await updateRecipes(
      recipeId,
      userId,
      updatedRecipeData
    );
    if (!updatedRecipe) {
      return res.status(404).json({
        message: "Recipe not found or you don't have permition!",
      });
    }
    res.status(200).json({
      recipe: updatedRecipe,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error!",
    });
  }
});

router.delete("/recipes/:id", auth, async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.userId;

    const deletedRecipe = await deleteRecipes(recipeId, userId);
    if (!deletedRecipe) {
      return res.status(404).json({
        message: "Recipe not found or you don't have permission to delete",
      });
    }

    res.status(200).json({
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error!",
    });
  }
});

module.exports = router;
