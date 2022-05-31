import React  from 'react';
import {Link} from 'react-router-dom';
import uuid from 'react-uuid';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const SmallRecipeCard = ({meal}) => {

   
    return (
        <div>
           
            <Card style = {{width: '18rem'}}>
                <Card.Img variant='top' src = {meal.strMealThumb} />
                <Card.Body>
                    <Card.Title>{meal.strMeal}</Card.Title>
                    <Link to={`/recipes/find/${meal.idMeal}`} key = {uuid()}>
                    <Button variant = 'primary'>View Recipe</Button>
                    </Link>
                </Card.Body>
       
            </Card>
          
        </div>
    )
}

export default SmallRecipeCard;