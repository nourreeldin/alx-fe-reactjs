import React, { useEffect } from 'react';
import { useRecipeStore } from './recipeStore';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';

const App = () => {
  const setRecipes = useRecipeStore(state => state.setRecipes);
  
  useEffect(() => {
   
    const initialRecipes = [
      { id: 1, title: 'Pasta', description: 'Delicious pasta with sauce', ingredients: ['pasta', 'tomato sauce', 'cheese'], preparationTime: 30 },
      { id: 2, title: 'Salad', description: 'Healthy green salad', ingredients: ['lettuce', 'tomato', 'cucumber'], preparationTime: 15 },
      { id: 3, title: 'Chicken Curry', description: 'Spicy chicken curry', ingredients: ['chicken', 'spices', 'onions'], preparationTime: 45 },

    ];
    
    setRecipes(initialRecipes);
  }, [setRecipes]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Recipe Sharing App</h1>
      <SearchBar />
      <RecipeList />
    </div>
  );
};

export default App;