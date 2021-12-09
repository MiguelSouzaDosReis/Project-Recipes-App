import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import FindFoods from './Pages/FindFoods';
import FindDrinks from './Pages/FindDrinks';
import Explorer from './Pages/Explorer';
import ExploreDrink from './Pages/ExploreDrinks';
import ExploreFoods from './Pages/ExploreFoods';
import ExploreDrinksByIngredients from './Pages/ExploreDrinksByIngredients';
import ExploreFoodsByIngredients from './Pages/ExploreFoodsByIngredients';
import Profile from './Pages/Profile';
import ExploreFoodsArea from './Pages/ExploreFoodsArea';
import RecipesDone from './Pages/RecipesDone';
import FavoriteRecipes from './Pages/FavoriteRecipes';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ FindFoods } />
        <Route exact path="/bebidas" component={ FindDrinks } />
        <Route exact path="/explorar" component={ Explorer } />
        <Route exact path="/explorar/comidas" component={ ExploreFoods } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrink } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodsByIngredients }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinksByIngredients }
        />
        <Route exact path="/explorar/comidas/area" component={ ExploreFoodsArea } />
        <Route path="/perfil" component={ Profile } />
        <Route exact path="/receitas-feitas" component={ RecipesDone } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
