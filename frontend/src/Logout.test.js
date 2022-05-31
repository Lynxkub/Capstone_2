import React from 'react';
import {render , fireEvent} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import LogOut from './Logout';
import App from './App';


test('it render without crashing' , () => {
    render(
        <MemoryRouter>
            <LogOut />
        </MemoryRouter>
    )
})


test('it matches snapshot' , () => {
    const { asFragment } = render (
        <MemoryRouter>
            <LogOut />
        </MemoryRouter>
    )

    expect(asFragment()).toMatchSnapshot();
})



test('logs user out successfully' , () => {
    const {getByText , getByTestId} = render(
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    )


    // navigate to log in page, and log in

    const loginLink = getByText('Log In');
    fireEvent.click(loginLink);


    const username = getByTestId('username');
    const password = getByTestId('password');
    const loginButton = getByTestId('loginSubmit');

    fireEvent.change(username , {target : {value : 'test'}})
    fireEvent.change(password , {target : {value : 'testtest'}})
    fireEvent.click(loginButton);


    setTimeout(() => {
        const logoutLink = getByText('Log Out');
        fireEvent.click(logoutLink);

        const logoutButton = getByText('Log Out');
        fireEvent.click(logoutButton);

        // chck that we went back to the home page after logging out

        
        const homePageCheck = getByText('Sign Up');
        expect(homePageCheck).toBeInTheDocument();
    } , 1000)
})