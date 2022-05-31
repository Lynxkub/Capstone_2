import React , {useState , useEffect} from 'react';
import FoodlyApi from './api';
import {useParams , useHistory} from 'react-router-dom';

const RecipeLike = ({ likedStatus }) => {
    const history = useHistory();
    const {id} = useParams();
    const username = localStorage.getItem('username');
    
    const [isLiked , setIsLiked] = useState(!likedStatus);
    const [clicked , setClicked] = useState();

    useEffect(() => {
        setIsLiked(!isLiked)
    } , [clicked]) 

    const handleSaveRecipe = async () => {
        if(!username) {
            history.push('/login')
            setTimeout(() => {
                alert('Please sign in')
            } , 500)
            
        }else{
        await FoodlyApi.saveMeal(username , id)
        setClicked(true);
        }
    }

    const handleDeleteRecipe = async () => {
        await FoodlyApi.deleteSavedMeal(username , id);
        setClicked(false);
    }

    return(
        <div>
            <div>
            {isLiked ? <span>Saved Recipe! <button onClick = {handleDeleteRecipe}>Remove from my list</button></span> : <button onClick = {handleSaveRecipe}>Save This Recipe</button>}
            </div>
        </div>
    )

}

export default RecipeLike;