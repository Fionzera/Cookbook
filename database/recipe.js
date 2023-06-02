const prisma = require("./prisma");

const userAllRecipes = (userId) => {
  return prisma.recipe.findMany({
    where: {
      userId,
    },
  });
};

const saveRecipes = (recipe, userId) => {
  return prisma.recipe.create({
    data: {
      title: recipe.title,
      preparationMethod: recipe.preparationMethod,
      ingredients: recipe.ingredients,
      cookingTime: recipe.cookingTime,
      userId: userId,
    },
  });
};

const updateRecipes = (recipeId, userId, updatedRecipeData) => {
  return prisma.recipe.update({
    where: {
      id: recipeId,
      userId: userId,
    },
    data: updatedRecipeData,
  });
};

const deleteRecipes = (recipeId, userId) => {
  return prisma.recipe.delete({
    where: {
      id: recipeId,
      userId: userId,
    },
  });
};

module.exports = {
  userAllRecipes,
  saveRecipes,
  updateRecipes,
  deleteRecipes,
};
