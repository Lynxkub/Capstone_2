import React , {useState} from 'react';
import { useHistory } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
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
        <div>
            <Form onSubmit = {handleSubmit}>
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
                <Button variant='outline-secondary' data-testid = 'loginSubmit' onClick = {handleSubmit}>Log In</Button>
            </Form>
            <div>
                <p><a href = '/signup'><Button variant = 'outline-secondary'>Sign up here!</Button></a></p>
            </div>
        </div>
    )
}


export default LogInForm;