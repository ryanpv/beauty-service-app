import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { StateProvider } from '../../contexts/state-contexts';
import LoginPage from '../../components/login-page';

describe("LoginPage Component", () => {
  it("should render the login form", () => {
    render(
      <BrowserRouter>
        <StateProvider>
          <LoginPage />
        </StateProvider>
      </BrowserRouter>
    );

    const formElement = screen.getByTestId("login-form")
    expect(formElement).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});