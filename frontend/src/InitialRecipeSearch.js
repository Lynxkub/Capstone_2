import React from 'react';
import {Link , useHistory} from 'react-router-dom';
import FoodlyApi from './api';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './home.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const InitialRecipeSearch = () => {
    const history = useHistory();

    const handleClick = async () => {
        const randomMeal = await FoodlyApi.randomMeal();
        history.push(`/recipes/find/${randomMeal.results[0].idMeal}`)
        
    } 

    return (
        <div className='bg-homepage'>
            <Container>
                <Row>
                    <Col />
                    <Col xs = {7}>
            <h1 className='text-center'>Looking for something specfic? Let's narrow down our search</h1>
            </Col>
            <Col />
            </Row>
            </Container>
            <Container className='p-2'>
                <Row>
                    <Col />
                    <Col xs = {7}>
            <h4 className='text-center'>You can search for recipes by either :</h4>
            </Col>
            <Col />
            </Row>
            </Container>
            <Container>
                <Row xs={1} className='justify-content-md-center'>
                    <Col xs={4}>
            <Link  to='/recipes/filter/category'>
                <Card className='text-center'>
                    <Card.Header>Category</Card.Header>
                    <Card.Body>
            <Card.Img src = 'https://media.istockphoto.com/photos/plant-based-vegan-food-for-a-healthy-lifestyle-picture-id1301035781?b=1&k=20&m=1301035781&s=170667a&w=0&h=Mk4zLtRIxQ2QG8w8ObQ8cKUZFSpCLsCIhBNO_H9-YsI=' alt = 'food choices' />
            </Card.Body>
            </Card>
            </Link>
            </Col>
            <Col xs={2} className='justify-content-md-center'>
            <h4 className='text-center'>or</h4>
            </Col>
            <Col xs={4}>
            <Link  to='/recipes/filter/area'>
                <Card className='text-center'>
                    <Card.Header>Area</Card.Header>
                    <Card.Body>
            <Card.Img src = 'https://media.istockphoto.com/photos/international-flags-picture-id184601450?b=1&k=20&m=184601450&s=170667a&w=0&h=GMadcEZhpTmXQpGX-dhb0FIbLhgWlfD9UPT4vA7xblQ=' alt = 'flags of the world' />
            </Card.Body>
            </Card>
            </Link>
            </Col>
            </Row>
            </Container>
            <Container className='p-2'>
                <Row>
                    <Col />
                    <Col xs={7}>
            <h4 className='text-center'>or</h4>
            </Col>
            <Col />
            </Row>
            <Col />
            
            <Row>
            <Button onClick = {handleClick} variant='info'>Discover a random meal</Button>
            </Row>
            </Container>
        </div>
    )
}


export default InitialRecipeSearch;