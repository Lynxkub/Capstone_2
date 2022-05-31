import React , {useEffect, useState} from 'react';
import FoodlyApi from './api';


const UserProfileUpdate = () => {

    const INITIAL_STATE = {
        username : '',
        first_name : '',
        last_name : '',
        email : '',
        password : ''
    }

    const [formData , setFormData] = useState(INITIAL_STATE);
    const userToken = localStorage.getItem('token');

    useEffect(() => {
        async function getUserData() {
            const currUser = localStorage.getItem('username');
            const userData = await FoodlyApi.get(currUser);
            setFormData({
                username : userData.username,
                first_name : userData.first_name,
                last_name : userData.last_name,
                email : userData.email
            })
        }
        getUserData()
    } , [])

    const handleChange = (e) => {
        const {name , value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name] : value
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        await FoodlyApi.updateUser(formData.username , {first_name : formData.first_name , last_name : formData.last_name , email : formData.email})
    }

    if(userToken === 'undefined') {
        return (
            <div>
                <p>You must be logged in to view this page</p>
            </div>
        )
    }

    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <label htmlFor = 'first_name'>First Name</label>
                <input
                type = 'text'
                name = 'first_name'
                value = {formData.first_name}
                data-testid = 'first_name'
                onChange = {handleChange}
                />
                <label htmlFor = 'last_name'>Last Name</label>
                <input 
                type = 'text'
                name= 'last_name'
                value = {formData.last_name}
                data-testid = 'last_name'
                onChange = {handleChange}
                />
                <label htmlFor = 'email'>Email</label>
                <input 
                type = 'email'
                name = 'email'
                value = {formData.email}
                data-testid = 'email'
                onChange = {handleChange}
                />
                <button id = 'updateProfileButton'>Submit Changes</button>
            </form>
        </div>
    )
}


export default UserProfileUpdate;