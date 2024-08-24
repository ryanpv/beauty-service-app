import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { StateProvider } from '../../contexts/state-contexts';
import SignupPage from '../../components/signup-page';

const renderServiceCategory = () => {
  render(
    <BrowserRouter>
      <StateProvider>
        <SignupPage />
      </StateProvider>
    </BrowserRouter>
  );
}; 

describe('SignupPage Component', () => {
  it("should render the signup form", () => {
    renderServiceCategory();

    const formElement = screen.getByTestId("signup-form");
    expect(formElement).toBeInTheDocument();
    expect(screen.getByText("Full Name")).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone Number')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Confirm Password')).toBeInTheDocument();
  });

});