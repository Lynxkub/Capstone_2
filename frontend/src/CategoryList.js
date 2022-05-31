import React , {useState , useEffect} from 'react';
import {useParams , Link} from 'react-router-dom';
import uuid from 'react-uuid';
import FoodlyApi from './api';


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

    // const categorySearch = async (catSearchParam) => {
    //     const res = await FoodlyApi.filterByCategory();
    //     return res
    // }

    if(isLoading) {
        return (
            <div>
            <p>Loading &hellip;</p>
            </div>
        )
    }else{
    return(
        <div>
          {searchResults.results.map(res  => (
              <div><Link exact to={`/recipes/search/${catSearchParam}/${res.strCategory || res.strArea}`} key = {uuid()}>{res.strCategory || res.strArea}</Link></div>
          ))}
        </div>
    )
    }


}

export default CategoryList;