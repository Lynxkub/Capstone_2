import React , {useEffect, useState} from 'react';
import FoodlyApi from './api';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './home.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




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
            <div className='bg-homepage'>
                <p>You must be logged in to view this page</p>
            </div>
        )
    }

    return (
        <div className='bg-homepage'> 
    <Container>
        <Row>
            <Col />
            <Col xs={7}>
                <h4 className='text-center'>Edit your first name , last name , or email here </h4>
            </Col>
            <Col />
        </Row>
    </Container>
            <Form onSubmit = {handleSubmit}>
                <FloatingLabel  controlId='floatingInput' className='mb-3'>First Name</FloatingLabel>
                <Form.Control
                type = 'text'
                name = 'first_name'
                value = {formData.first_name}
                data-testid = 'first_name'
                onChange = {handleChange}
                />
                <FloatingLabel  controlId='floatingInput' className='mb-3'>Last Name</FloatingLabel>
                <Form.Control 
                type = 'text'
                name= 'last_name'
                value = {formData.last_name}
                data-testid = 'last_name'
                onChange = {handleChange}
                />
                <FloatingLabel  controlId='floatingInput' className='mb-3'>Email</FloatingLabel>
                <Form.Control 
                type = 'email'
                name = 'email'
                value = {formData.email}
                data-testid = 'email'
                onChange = {handleChange}
                />
                <Button id = 'updateProfileButton' variant = 'outline-secondary'>Submit Changes</Button>
            </Form>
        </div>
    )
}


export default UserProfileUpdate;