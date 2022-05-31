import React from 'react';
import {render , fireEvent} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import LogInForm from './LoginForm';
import App from './App';
import FoodlyApi from './api';



test('it renders without crashing' , () => {
    render(
        <MemoryRouter>
            <LogInForm />
        </MemoryRouter>
    )
})



test('it matches snapshot' , () => {
    const { asFragment } = render (
        <MemoryRouter>
           <LogInForm />
        </MemoryRouter>
    )

    expect(asFragment()).toMatchSnapshot();
})



test('it logs user in successfully' , () => {
    const {getByText , getByTestId} = render (
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    )


    const loginLink = getByText('Log In');
    fireEvent.click(loginLink);

    // ensure that we are on the log in form

    const username = getByTestId('username');
    expect(username).toBeInTheDocument();

        // fill out form and submit

    const password = getByTestId('password');
    const loginButton =  getByTestId('loginSubmit')

    fireEvent.change(username , {target : {value : 'test'}})
    fireEvent.change(password , {target : {value : 'testtest'}})
    fireEvent.click(loginButton);

    // check to make sure that we are redirected back to the home page

    setTimeout(() => {
        const newHomePage = getByText('Welcome back Test!')
        expect(newHomePage).toBeInTheDocument();
    } , 1000)
 
})