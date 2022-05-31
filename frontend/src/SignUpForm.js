import React , {useState} from 'react';
import { useHistory } from 'react-router-dom';


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
        <div>
            <form onSubmit = {handleSubmit}>
                <label htmlFor = 'username'>Username</label>
                <input
                type = 'text'
                placeholder = 'Username'
                name = 'username'
                data-testid = 'username'
                value = {formData.username}
                onChange = {handleChange}
                />
                  <label htmlFor = 'password'>Password</label>
                <input
                type = 'password'
                placeholder = 'Password'
                name = 'password'
                data-testid = 'password'
                value = {formData.password}
                onChange = {handleChange}
                />
                  <label htmlFor = 'first_name'>First Name</label>
                <input
                type = 'text'
                placeholder = 'First Name'
                name = 'first_name'
                data-testid = 'first_name'
                value = {formData.first_name}
                onChange = {handleChange}
                />
                  <label htmlFor = 'last_name'>Last Name</label>
                <input
                type = 'text'
                placeholder = 'Last Name'
                name = 'last_name'
                data-testid = 'last_name'
                value = {formData.last_name}
                onChange = {handleChange}
                />
                  <label htmlFor = 'email'>Email</label>
                <input
                type = 'email'
                placeholder = 'Email'
                name = 'email'
                data-testid = 'email'
                value = {formData.email}
                onChange = {handleChange}
                />
                <button data-testid = 'signupButton'>Sign Up</button>
            </form>
        </div>
    )
}


export default SignUpForm;