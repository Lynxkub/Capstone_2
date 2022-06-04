import React , {useState , useEffect} from 'react';
import SmallRecipeCard from './SmallRecipeCard';
import FoodlyApi from './api';
import uuid from 'react-uuid';
import './home.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {useHistory} from 'react-router-dom';
import CardGroup from 'react-bootstrap/CardGroup';

const UserProfile = () => {
const history = useHistory();
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

const handleClick = () => {
    history.push('/recipe_search')
}

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

                   <Container>
                       <Row>
                           
                {userRecipeList[0] ? <CardGroup> {userRecipeList.map(r => (
                    <div key = {uuid()}>
                       <Col xs={3}>
                    <SmallRecipeCard meal = {r} key = {uuid()}/>
                    </Col>
                    </div>
                )
             
                )}
                </CardGroup>
                
                : <div>
                    <Container>
                        <Row className='p-2'>
                            <Col />
                            <Col xs = {7}>
                    <h1 className='text-center'>Let's get started!</h1>
                    </Col>
                    <Col />
                    </Row>
                    <Row>
                        <Col />
                        <Col xs={3}>
                    <Button onClick={handleClick} className='text-center'>Click here to start your search</Button>
                    </Col>
                    <Col />
                    </Row>
                    </Container>
                </div>
                }
                
              </Row>
                </Container>
            </div>
        )
    }
  
}


export default UserProfile;