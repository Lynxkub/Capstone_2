import React , {useState , useEffect} from 'react';
import { Link , useHistory} from 'react-router-dom'
import './home.css'
import Carousel from 'react-bootstrap/Carousel'
import FoodlyApi from './api';
import uuid from 'react-uuid';
const Home = () => {
    const history = useHistory();
    const [index , setIndex] = useState(0);
    const [carouselImages , setCarouselImage] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const handleSelect = (selectedIndex , e) => {
        setIndex(selectedIndex);
    }
    const handleView = (selectedRecipe , e) => {
       
        history.push(`/recipes/find/${carouselImages[index].idMeal}`)
        
    }
    useEffect(() => {
        async function findCarouselImages () {
            let randNum = Math.floor(Math.random() * 10);
            let searchParam;
            randNum > 5 ? searchParam = 'area' : searchParam = 'category';
            let apiSearch = await FoodlyApi.filterByCategory(searchParam);
            const category = apiSearch.results[randNum].strArea || apiSearch.results[randNum].strCategory
          
            let specificSearch = await FoodlyApi.searchRecipesByCategoryOrArea(searchParam , `${category}`)
            setCarouselImage(specificSearch.results);
            setIsLoading(false);
            
        }
        findCarouselImages();
        if(isLoading === false) {
            console.log(carouselImages)
        }
    } , [])
    const username = localStorage.getItem('username');
    if(!username) {
    return (
        <div className = 'bg-homepage'>
            <div className = 'd-flex align-items-center justify-content-center'>
                <div className = 'p-5'>
            <p><h1>Welcome to Foodly!</h1></p>
            <p>First time here? <Link to = '/signup'>Sign Up Here</Link></p>
            <p>Returning User? <Link to = '/login'>Log In here</Link></p>
            </div>
            </div>
            <div className = 'd-flex align-items-center justify-content-center w-100 h-50'>
            <Carousel variant='dark' activeIndex = {index} onSelect={handleSelect}>
                {carouselImages.map(i => (
                    <Carousel.Item key = {uuid()}>
                        <img className = 'd-block w-100' src = {i.strMealThumb} alt = {i.strMeal} />
                        <Carousel.Caption>
                            <h5>{i.strMeal}</h5>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
            </div>
        </div>
    )
    }
    return(
        <div className = 'bg-homepage'> 
        <div className = 'd-flex align-items-center justify-content-center'>
            <div className = 'p-5'>
            <h1>Welcome to Foodly {username}!</h1>
            <h1>Let's get cooking!</h1>
            </div>
        </div>
            <div className = 'd-flex align-items-center justify-content-center w-100 h-50'>
                <Carousel variant='dark' activeIndex = {index} onSelect = {handleSelect}>
                    {carouselImages.map(i => (
                        <Carousel.Item key = {uuid()}>
                            <img className = 'd-block w-100' src = {i.strMealThumb} alt = {i.strMeal} id = {i.idMeal} onClick = {handleView}/>
                            <Carousel.Caption>
                                <h5>{i.strMeal}</h5>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}


export default Home;