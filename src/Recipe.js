import React from "react";
import "./Recipe.css";

const Recipe = ({ title, calories, image, url, ingredients }) => {
  return (
    <div className="recipe">
      <h1 className="dish">{title}</h1>
      <p className="calories">Calories: {calories}</p>
      <a href={url}>
        <img className="image" src={image} alt="" />
      </a>
      <ul>
        {ingredients.map(ingredient => (
          <li className="ingredient">{ingredient.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recipe;
