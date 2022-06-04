import React , {useState , useEffect} from 'react';
import {useParams} from 'react-router-dom';
import FoodlyApi from './api';
import './RecipeList.css';
import SmallRecipeCard from './SmallRecipeCard';
import uuid from 'react-uuid';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './home.css';

const RecipeList = () => {

    const {category} = useParams();
    const {choice} = useParams();

    const [isLoading , setIsLoading] = useState(true);
    const [recipeList , setRecipeList] = useState();

    useEffect(() => {
        async function fillList () {
            const list = await FoodlyApi.searchRecipesByCategoryOrArea(category , choice);
            setRecipeList(list);
            setIsLoading(false);
        }
        fillList();
    } , []);


    if(isLoading){
        return (
           <Spinner animation='border' />
        )
    }else{
    return(
        <div className='bg-homepage'>
            <Container>
                <Row className = 'justify-content-md-center'>
                    <Col  xs lg='2'/>
                    <Col className = 'justify-content-md-center' md='auto'>
                     <h1 className = 'justify-content-md-center'>{choice} Recipes</h1>
                    </Col>
                    <Col xs lg ='2'/>
                </Row>
            </Container>
            <Container>
            <Row>
            {recipeList.results.map(res => (
                
                    <Col>
                <div key = {uuid()}>
                    <SmallRecipeCard meal = {res} />
                </div>
                </Col>
                
            ))}
            </Row>
            </Container>
        </div>
    )
    }
}

export default RecipeList