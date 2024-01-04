import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../client/Login';

describe('Login', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    expect(screen.getByText('Meowmatch')).toBeTruthy();
    expect(screen.getByPlaceholderText('Username')).toBeTruthy();
    expect(screen.getByPlaceholderText('Password')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Login' })).toBeTruthy();

    // expect(screen.getByText('Meowmatch')).toBeInTheDocument();
    // expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    // expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    // expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('handle form submission correctly', async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    // Mocking the fetch function
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => {
          return Promise.resolve({});
        },
      });
    });

    //Fill out the form

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'testpassword' },
    });

    //Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    // Wait for the fetch function to be called
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Checkif the URL is redirected to /pets
    waitFor(() => expect(window.location.pathname).toBe('/pets'));
  });
});
