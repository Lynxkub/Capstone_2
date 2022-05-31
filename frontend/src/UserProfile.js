import React , {useState , useEffect} from 'react';
import SmallRecipeCard from './SmallRecipeCard';
import FoodlyApi from './api';
import uuid from 'react-uuid';
import './home.css';


const UserProfile = () => {
const username = localStorage.getItem('username');
const [isLoading , setIsLoading] = useState(true);
const [userRecipeList , setUserRecipeList] = useState([])

useEffect(() => {
    async function findLikedRecipes () {
        const likedRecipes = await FoodlyApi.getAllSavedMeals(username);
            const recipeList = likedRecipes.results;
            setUserRecipeList(recipeList);
            setIsLoading(false);    
    }
    findLikedRecipes();
} , [])

useEffect(() => {
    async function findRecipeDetails () {
        let updatedList = []
        for(let i of userRecipeList) {
            let foundRecipe = await FoodlyApi.findOne(i.api_id);
            updatedList.push(foundRecipe);
        }
        setUserRecipeList(updatedList)
    }
    findRecipeDetails();
} , [isLoading])
    if(isLoading) {
        return(
            <div>Loading &hellip;</div>
        )
    }else {
        return (
            <div className='bg-homepage'>
                <div className='d-flex justify-content-center'>
                    <h1>{username}'s saved recipes</h1>
                </div>
                <div>
                {userRecipeList[0].idMeal ? userRecipeList.map(r => (
                    <div key = {uuid()}>
                    <SmallRecipeCard meal = {r} key = {uuid()}/>
                    </div>
                ))
                : ''
                }
            </div>
            </div>
        )
    }
  
}


export default UserProfile;