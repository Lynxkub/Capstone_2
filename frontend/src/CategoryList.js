import React , {useState , useEffect} from 'react';
import {useParams , Link} from 'react-router-dom';
import uuid from 'react-uuid';
import FoodlyApi from './api';
import './home.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CategoryList = () => {
    const {catSearchParam} = useParams();

    const [searchResults , setSearchResults] = useState();
    const [isLoading , setIsLoading] = useState(true);


    useEffect(() => {
        async function initialSearch () {
            const searchParams = await FoodlyApi.filterByCategory(catSearchParam);
            setSearchResults(searchParams);
            setIsLoading(false);
        }
        initialSearch();

    } , [])

   

    if(isLoading) {
        return (
            <div>
            <p>Loading &hellip;</p>
            </div>
        )
    }else{
    return(
        <div className='bg-homepage'>
            <Container key = {uuid()}>
                <Row className='p-2' key = {uuid()}>
                    <Col  key = {uuid()}/>
                    <Col xs = {7} key = {uuid()}>
                        <h2 className='text-center'>Let's narrow it down a little more. Choose from one of the options below</h2>
                    </Col >
                    <Col key = {uuid()} />
                </Row>
                <Row key = {uuid()}>
          {searchResults.results.map(res  => (
            <Col xs={3} className='p-2' key = {uuid()}>
                <Link  to={`/recipes/search/${catSearchParam}/${res.strCategory || res.strArea}`} key = {uuid()}>
                      <h3 className='text-center'>{res.strCategory || res.strArea}</h3>
                 </Link>
             </Col>
                 
          ))}
          </Row>
          </Container>
        </div>
    )
    }


}

export default CategoryList;