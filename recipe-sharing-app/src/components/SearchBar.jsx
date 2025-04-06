import React from 'react';
import { useRecipeStore } from '../recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);
  const filterRecipes = useRecipeStore(state => state.filterRecipes);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    filterRecipes();
  };

  return (
    <div className="my-4">
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default SearchBar;