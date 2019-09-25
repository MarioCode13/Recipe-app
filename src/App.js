import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";
import chef from "./chef.png";

const App = () => {
  const APP_ID = "59199727";
  const APP_KEY = "ba0fd152b27e44370969231e9b078c7c";

  const [recipes, setRecipes] = useState([]); //taking things from this state passing down into props then to Recipe.js component
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [bgimage, setbgimage] = useState(chef);

  //first time app renders, effect is run
  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json(); //don't know how long to fetch. use await whenever there is a promise
    setRecipes(data.hits);
  };

  const updateSearch = e => {
    // as you write, state changes
    setSearch(e.target.value); //value of input on target: search bar
    setbgimage("");
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <h1 className="heading">Search Recipes By Ingredient: </h1>
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <img className="image" src={bgimage} alt="" />
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label} //props / recipe from api
            title={recipe.recipe.label}
            calories={recipe.recipe.calories.toFixed(0)}
            image={recipe.recipe.image}
            url={recipe.recipe.url}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
