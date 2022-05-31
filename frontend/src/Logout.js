import React from 'react';
import { useHistory } from 'react-router-dom';
import './home.css';
import Button from 'react-bootstrap/Button'
const LogOut = ( { logout }) => {
    const history = useHistory();

    const username = localStorage.getItem('username');
    if(!username || username === ""){
        history.push('/');
    }

    const logoutUser = async (e) => {
        e.preventDefault();
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        await logout();
        history.push('/');
    }

    const back = (e) => {
        e.preventDefault();
        history.goBack();
    }
    return (
        <div className='bg-homepage'>
            <div className='position-absolute top-50 start-50 translate-middle'>
            <form>
            <h1>Are you sure you want to log out?</h1>
                <Button onClick = {logoutUser} variant='danger'>Log Out</Button>
                <Button onClick = {back} variant='success'>Go Back</Button>
            </form>
            </div>
        </div>
    )


}


export default LogOut;