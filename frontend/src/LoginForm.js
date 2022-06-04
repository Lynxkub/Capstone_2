import React , {useState} from 'react';
import { useHistory } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './home.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LogInForm = ( { login , token }) => {


    const history = useHistory();
    const INITIAL_STATE = {
        username : '',
        password : ''
    }

    const [formData , setFormData] = useState(INITIAL_STATE);

    const handleChange = (e) => {
        const {name , value} = e.target;
        setFormData(formData => ({
            ...formData ,
            [name] : value
        }))
    }

   
  
    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            localStorage.setItem('username' , formData.username);
            await login(formData);
            setFormData(INITIAL_STATE);
            history.push('/');
        }catch(err) {
            alert(err);
        }
    }

    return (
        <div className='bg-homepage'>
            <Container>
                <Row className='p-2'>
                    <Col />
                    <Col xs = {7}>
                        <h1 className='text-center'>Please Enter Your Account Information</h1>
                    </Col>
                    <Col />
                </Row>
            <Form onSubmit = {handleSubmit}>
                <Row>
                    <Col />
                    <Col xs={6}>
                <FloatingLabel controlId = 'floatingInput' label = 'Username' className = 'mb-3'>
                    <Form.Control 
                    type = 'text' 
                    placeholder = 'Username'
                    name = 'username'
                    data-testid = 'username'
                    value = {formData.username}
                    onChange = {handleChange}
                    />
                </FloatingLabel>
                </Col>
                <Col />
                </Row>
                <Row>
                    <Col />
                    <Col xs = {6}>
                <FloatingLabel controlId = 'floatingInput' label = 'Password' className = 'mb-3'>
                    <Form.Control 
                    type = 'password' 
                    placeholder = 'password'
                    name = 'password'
                    data-testid = 'password'
                    value = {formData.password}
                    onChange = {handleChange}
                    />
                </FloatingLabel>
                </Col>
                <Col />
                </Row>
                <Row>
                    <Col />
                    <Col xs={2}>
                <Button variant='outline-secondary' data-testid = 'loginSubmit' onClick = {handleSubmit}>Log In</Button>
                </Col>
                <Col />
                </Row>
            </Form>
            <Row>
                    <Col />
                    <Col xs={2}>
                <p><a href = '/signup'><Button variant = 'outline-secondary'>Sign up here!</Button></a></p>
                </Col>
                <Col />
            </Row>
            </Container>
        </div>
    )
}


export default LogInForm;