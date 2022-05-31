import React, { useEffect , useState } from 'react';
import {useParams , Link} from 'react-router-dom';
import FoodlyApi from './api';
import uuid from 'react-uuid';
import CommentSection from './CommentSection';
import CommentBox from './CommentBox';
import RecipeLike from './RecipeLike';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import './home.css'


const LargeRecipeCard = ( { addComment }) => {
    const {id} = useParams()
    const username = localStorage.getItem('username')
    const [meal , setMeal] = useState();
    const[isLoading , setIsLoading] = useState(true);
    const [ingredients , setIngredients] = useState([])
    const [measures , setMeasures] = useState([]);
    const [rerenderTrigger , setRerenderTrigger] = useState(false)
    const [isLiked , setIsLiked] = useState(false);


   useEffect(() => {
    async function findMeal() {
        let count = 1;
        let ingredientResults = [];
        let measureResults = [];
        let foundMeal = await FoodlyApi.findOne(id)
        
        while(count < 20) {
            ingredientResults.push(foundMeal[`strIngredient${count}`]);
            measureResults.push(foundMeal[`strMeasure${count}`])
            count ++
        }
        const checkIfRecipeIsLiked = await FoodlyApi.getSavedMeal(username, id);
        if(checkIfRecipeIsLiked.results) {
            setIsLiked(true);
        }else {
            setIsLiked(false);
        }
        setIngredients(ingredientResults);
        setMeasures(measureResults);
        setMeal(foundMeal);
        setIsLoading(false); 
    }
    findMeal();
   } , [isLiked , rerenderTrigger])



const handleKeyPress = () => {
    setRerenderTrigger(!rerenderTrigger);
}


const handleSaveRecipe = async () => {
    await FoodlyApi.saveMeal(username , id)
}

   if(isLoading) {
       return (
           <div>Loading &hellip;</div>
       )
   }else {
    return (
        <div className = 'bg-homepage'> 
            <Container>
                <Row className ='justify-content-md-center'>
                    <Col xs lg='2' />
                    <Col md='auto'>
                <h1>{meal.strMeal}</h1>
          
                <RecipeLike likedStatus = {isLiked}/>
                </Col>
                <Col xs lg='2' />
                </Row>
                </Container>
                <Container className = 'p-2'>
                    <Row className = 'justify-content-md-center'>
                        <Col xs lg='2' />
                        <Col md='auto'>
            <img src = {meal.strMealThumb} style = {{'height' : '350px' , 'width' : '350px'}} alt = {`${meal.strMeal}`}></img>
            </Col>
            <Col xs lg='2' />
            </Row>
            </Container>
            <div  className='row justify-content-center'>
            <Accordion alwaysOpen className = 'w-50'>
                <Accordion.Item eventKey ='0' >
            <Accordion.Header>Ingredients needed for {meal.strMeal}</Accordion.Header>
            <Accordion.Body className = 'bg-opacity-25'>
            <ListGroup>
            {ingredients.map(i => {
                let index = ingredients.indexOf(i)
                if(i !== "" && i !== null) {
                   return  <ListGroup.Item key = {uuid()} variant='info'>{i + " - " + measures[index] }</ListGroup.Item>
                }
            })}
            </ListGroup>
            </Accordion.Body>
            </Accordion.Item>
            </Accordion>
            </div>
            <div className='row justify-content-center'>
            <Accordion alwaysOpen className = 'w-50'>
            <Accordion.Item eventKey='1' >
                <Accordion.Header>Instructions</Accordion.Header>
                <Accordion.Body className='bg-opacity-25'>
                    <ListGroup>
                    <ListGroup.Item key = {uuid()} variant='info'>{meal.strInstructions}</ListGroup.Item>
                    </ListGroup>
               
                </Accordion.Body>
            </Accordion.Item>
         
            </Accordion>
            </div>
            <div className='p-2'>
            <a href = {meal.strYoutube}>Video Demonstration for {meal.strMeal}</a>
            <br />
            <a href = {`/recipes/search/area/${meal.strArea}`}>Discover more {meal.strArea} recipes</a>
            <br />
            <a href = {`/recipes/search/category/${meal.strCategory}`}>Discover more {meal.strCategory} recipes</a>
            </div>
            <div className='row justify-content-center'>
            <CommentBox addComment = {addComment} key = {uuid()} handleKeyPress = {handleKeyPress} />
            </div>
          <CommentSection addComment = {addComment} handleKeyPress = {handleKeyPress} trigger = {rerenderTrigger}/>
          
        </div>
    )
   }
}


export default LargeRecipeCard;