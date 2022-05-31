import React from 'react';
import { Route , Switch } from 'react-router-dom';
import Home from './Home';
import SignUpForm from './SignUpForm';
import LogInForm from './LoginForm';
import LogOut from './Logout';
import UserProfileUpdate from './UserProfileUpdate';
import CategoryList from './CategoryList';
import InitialRecipeSearch from './InitialRecipeSearch';
import RecipeList from './RecipeList';
import LargeRecipeCard from './LargeRecipeCard';
import UserProfile from './UserProfile';
const Routes = ( { signUp , token , login , logout , addComment }) => {
        const username = localStorage.getItem('username');
return (
    <Switch>
        <Route exact path = '/'>
            <Home />
        </Route>
        <Route exact path = '/signup'>
            <SignUpForm signUp = {signUp}  token = {token} />
        </Route>
        <Route exact path = '/login'>
            <LogInForm login = {login} tokne = {token} />
        </Route>
        <Route exact path = '/logout'>
            <LogOut logout = {logout} />
        </Route>
        <Route exact path = '/edit_profile'>
            <UserProfileUpdate />
        </Route>
        <Route exact path = '/recipes/filter/:catSearchParam'>
            <CategoryList />
        </Route>
        <Route exact path = '/recipe_search'>
            <InitialRecipeSearch />
        </Route>
        <Route exact path = '/recipes/search/:category/:choice'>
            <RecipeList />
        </Route>
        <Route exact path = '/recipes/find/:id'>
            <LargeRecipeCard addComment = {addComment} />
        </Route>
        <Route exact path = '/:username/profile'>
            <UserProfile />
        </Route>
    </Switch>
)

}


export default Routes;