import React from 'react';
import { useRecipeStore } from '../recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);

  return (
    <div>
      {filteredRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        filteredRecipes.map(recipe => (
          <div key={recipe.id} className="mb-4 p-4 border border-gray-200 rounded-md">
            <h3 className="font-bold">{recipe.title}</h3>
            <p>{recipe.description}</p>
            <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
            <p><strong>Preparation Time:</strong> {recipe.preparationTime} minutes</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;