import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import fetchDrinkRecipe from '../services/fetchDrinkRecipes';
import AppContext from '../context/AppContext';
import fetchMealsDefault from '../services/fetchMealsDefault';
import CarouselsContainer, { Card, Container } from './style/detailsStyle';
import renderRecomendation from '../helpers/renderRecomendation';

function DrinkDetails() {
  const { slug } = useParams();
  const { currentDrinkRecipe, setCurrentDrinkRecipe } = useContext(AppContext);
  const [mealsRecomendation, setMealsRecomendation] = useState([]);
  const [countNextButton, setCountNextButton] = useState(0);
  const ingredientsArray = [];
  const measureArray = [];
  const MAX_INGREDIENT_SIZE = 15;
  const RECOMENDATION_CARD_SIZE = 6;
  useEffect(() => {
    async function getRecipe() {
      const recipe = await fetchDrinkRecipe(slug);
      setCurrentDrinkRecipe(recipe);
    }
    async function getDefaultRecomendations() {
      const defaultRecomendation = await fetchMealsDefault();
      setMealsRecomendation(defaultRecomendation);
      console.log(defaultRecomendation);
    }
    getRecipe();
    getDefaultRecomendations();
  }, [setCurrentDrinkRecipe, slug]);

  if (currentDrinkRecipe) {
    for (let i = 1; i <= MAX_INGREDIENT_SIZE; i += 1) {
      if (currentDrinkRecipe[`strIngredient${i}`]) {
        ingredientsArray.push(currentDrinkRecipe[`strIngredient${i}`]);
      }
      if (currentDrinkRecipe[`strIngredient${i}`]) {
        measureArray.push(currentDrinkRecipe[`strMeasure${i}`]);
      }
    }
  }
  console.log(currentDrinkRecipe);
  return (
    <main>
      {currentDrinkRecipe && (
        <article>
          <img
            width="300px"
            src={ currentDrinkRecipe.strDrinkThumb }
            alt={ currentDrinkRecipe.strDrink }
            data-testid="recipe-photo"
          />
          <h2 data-testid="recipe-title">{currentDrinkRecipe.strDrink}</h2>
          <h4 data-testid="recipe-category">{currentDrinkRecipe.strAlcoholic}</h4>
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
          <p data-testid="recipe-category">{currentDrinkRecipe.strCategory}</p>
          <div>
            <ul>
              {
                ingredientsArray.map((ingredient, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {ingredient}
                    {' - '}
                    {measureArray[index]}
                  </li>
                ))
              }
            </ul>
          </div>
          <p data-testid="instructions">{currentDrinkRecipe.strInstructions}</p>
          <Container>
            <button
              type="button"
              onClick={
                () => renderRecomendation('prev', setCountNextButton, countNextButton)
              }
            >
              Prev
            </button>
            <CarouselsContainer>
              {mealsRecomendation && mealsRecomendation.map((meal, index) => (
                index < RECOMENDATION_CARD_SIZE && (
                  <Link
                    key={ meal.idMeal }
                    to={ `/comidas/${meal.idMeal}` }
                    hidden={
                      !(index === countNextButton || index === countNextButton + 1)
                    }
                  >
                    <Card
                      data-testid={ `${index}-recomendation-card` }
                    >
                      <h1
                        data-testid={ `${index}-recomendation-title` }
                      >
                        { meal.strMeal }
                      </h1>
                      <img
                        src={ meal.strMealThumb }
                        alt={ meal.strMeal }
                        data-testid={ `${index}-card-img` }
                      />
                    </Card>
                  </Link>
                )
              ))}
            </CarouselsContainer>
            <button
              type="button"
              onClick={
                () => renderRecomendation('next', setCountNextButton, countNextButton)
              }
            >
              Next
            </button>
          </Container>
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

export default DrinkDetails;
