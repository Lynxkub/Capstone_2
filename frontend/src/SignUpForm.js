import React , {useState} from 'react';
import { useHistory } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './home.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const SignUpForm = ( { signUp , token }) => {
    const history = useHistory();
    const INITIAL_STATE = {
        username : '',
        password : '',
        first_name : '',
        last_name : '',
        email : ''
    }

    const [formData , setFormData] = useState(INITIAL_STATE)

    const username = localStorage.getItem('username');

    if(username && username !== "") {
        history.push('/');
    }

    const handleChange = (e) => {
        const {name , value } = e.target;
        setFormData(formData => ({
            ...formData ,
            [name] : value
        }))
    }

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            localStorage.setItem('username' , formData.username)
             await signUp(formData);
            setFormData(INITIAL_STATE)
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
                    <Col xs={7}>
                        <h1 className = 'text-center'>Enter in the following information to create your account</h1>
                    </Col>
                    <Col />
                </Row>
            <Form onSubmit = {handleSubmit}>
                <Row>
                    <Col />
                    <Col xs={6}>
                <FloatingLabel controlId='floatingInput' className='mb-3' label='Username'>
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
                <Col xs={6}>
                  <FloatingLabel controlId='floatingInput' className='mb-3' label='Password'>
                <Form.Control
                type = 'password'
                placeholder = 'Password'
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
                <Col xs={6}>
                  <FloatingLabel controlId='floatingInput' className='mb-3' label='First Name'>
                <Form.Control
                type = 'text'
                placeholder = 'First Name'
                name = 'first_name'
                data-testid = 'first_name'
                value = {formData.first_name}
                onChange = {handleChange}
                />
                </FloatingLabel>
                </Col>
                <Col />
                </Row>
                <Row>
                <Col />
                <Col xs={6}>
                  <FloatingLabel controlId='floatingInput' className='mb-3' label = 'Last Name'>
                <Form.Control
                type = 'text'
                placeholder = 'Last Name'
                name = 'last_name'
                data-testid = 'last_name'
                value = {formData.last_name}
                onChange = {handleChange}
                />
                </FloatingLabel>
                </Col>
                <Col />
                </Row>
                <Row>
                <Col />
                <Col xs={6}>
                  <FloatingLabel controlId='floatingInput' label='Email' className='mb-3' >
                <Form.Control
                type = 'email'
                placeholder = 'Email'
                name = 'email'
                data-testid = 'email'
                value = {formData.email}
                onChange = {handleChange}
                /></FloatingLabel>
                </Col>
                <Col />
                </Row>
                <Row>
                <Col />
                <Col xs={6}>
                <Button data-testid = 'signupButton' onClick={handleSubmit} variant='outline-secondary'>Sign Up</Button>
                </Col>
                <Col />
                </Row>
            </Form>
            </Container>
        </div>
    )
}


export default SignUpForm;