import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import fetchFoodRecipe from '../services/fetchFoodRecipes';
import fetchDrinksDefault from '../services/fetchDrinksDefault';
import AppContext from '../context/AppContext';

function FoodDetails() {
  const { slug } = useParams();
  const { currentMealRecipe, setCurrentMealRecipe } = useContext(AppContext);
  const [drinksRecomendation, setDrinksRecomendation] = useState('');
  const ingredientsArray = [];
  const MAX_INGREDIENT_SIZE = 20;
  useEffect(() => {
    async function getRecipe() {
      const recipe = await fetchFoodRecipe(slug);
      setCurrentMealRecipe(recipe);
    }
    async function getDefaultRecomendations() {
      const defaultRecomendation = await fetchDrinksDefault();
      setDrinksRecomendation(defaultRecomendation);
      console.log(defaultRecomendation);
    }
    getRecipe();
    getDefaultRecomendations();
  }, [setCurrentMealRecipe, slug]);

  if (currentMealRecipe) {
    for (let i = 1; i <= MAX_INGREDIENT_SIZE; i += 1) {
      if (currentMealRecipe[`strIngredient${i}`]) {
        ingredientsArray.push(currentMealRecipe[`strIngredient${i}`]);
      }
    }
  }

  return (
    <main>
      {currentMealRecipe && (
        <article>
          <img
            width="300px"
            src={ currentMealRecipe.strMealThumb }
            alt={ currentMealRecipe.strMeal }
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{currentMealRecipe.strMeal}</h2>
          <button
            data-testid="share-btn"
            type="button"
          >
            Compartilhar
          </button>

          <button
            data-testid="favorite-btn"
            type="button"
          >
            Favoritar
          </button>
          <p data-testid="recipe-category">{currentMealRecipe.strCategory}</p>
          <div>
            <ul>
              {
                ingredientsArray.map((ingredient, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {ingredient}
                  </li>
                ))
              }
            </ul>
          </div>
          <p data-testid="instructions">{currentMealRecipe.strInstructions}</p>
          <iframe
            data-testid="video"
            id="player"
            type="text/html"
            width="640"
            height="360"
            src={ currentMealRecipe.strYoutube }
            title={ currentMealRecipe.strMeal }
            allow="accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture"
            allowFullScreen
          />
          <div>
            {drinksRecomendation && drinksRecomendation.map((drink, index) => (
              <Link
                key={ drink.idDrink }
                to={ `/bebidas/${drink.idDrink}` }
              >
                <article
                  data-testid={ `${index}-recomendation-card` }
                >
                  <h1
                    data-testid={ `${index}-card-name` }
                  >
                    { drink.strDrink }
                  </h1>
                  <img
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                    data-testid={ `${index}-card-img` }
                  />
                </article>
              </Link>
            ))}
          </div>
          <button
            data-testid="start-recipe-btn"
            type="button"
          >
            iniciar receita
          </button>
        </article>
      )}
    </main>
  );
}

export default FoodDetails;
