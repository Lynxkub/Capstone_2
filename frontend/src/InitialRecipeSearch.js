import React from 'react';
import {Link , useHistory} from 'react-router-dom';
import FoodlyApi from './api';
const InitialRecipeSearch = () => {
    const history = useHistory();

    const handleClick = async () => {
        const randomMeal = await FoodlyApi.randomMeal();
        history.push(`/recipes/find/${randomMeal.results[0].idMeal}`)
        
    } 

    return (
        <div>
            <p>You can search for recipes by either :</p>
            <Link  to='/recipes/filter/category'>Category</Link>
            <p>or</p>
            <Link  to='/recipes/filter/area'>Area</Link>
            <p>or</p>
            <button onClick = {handleClick}>Discover a random meal</button>
        </div>
    )
}


export default InitialRecipeSearch;