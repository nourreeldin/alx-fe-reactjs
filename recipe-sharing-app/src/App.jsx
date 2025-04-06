import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import RecipeList from './components/RecipeList';  
import AddRecipeForm from './components/AddRecipeForm';  
import RecipeDetails from './components/RecipeDetails';  

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Recipe Sharing App</h1>
        <Routes>
          <Route path="/" element={<RecipeList />} />  
          <Route path="/add" element={<AddRecipeForm />} /> 
          <Route path="/recipe/:id" element={<RecipeDetails />} />  
        </Routes>
      </div>
    </Router>
  );
};

export default App;