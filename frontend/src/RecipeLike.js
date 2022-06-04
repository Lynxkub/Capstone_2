import React , {useState , useEffect} from 'react';
import FoodlyApi from './api';
import {useParams , useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

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
               alert('Please Sign In')
            } , 200)
            
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
            {isLiked ? <span>Saved Recipe! <Button onClick = {handleDeleteRecipe} variant = 'danger' className='btn-sm'>Remove from my list</Button></span> : <><Button onClick = {handleSaveRecipe} variant='info' className='btn-sm'>Save This Recipe</Button> 
            </>}
            </div>
        </div>
    )

}

export default RecipeLike;