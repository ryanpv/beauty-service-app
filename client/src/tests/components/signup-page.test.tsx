import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { StateProvider } from '../../contexts/state-contexts';
import SignupPage from '../../components/signup-page';
import { setUser } from '../../utils/set-user';


const renderServiceCategory = () => {
  render(
    <BrowserRouter>
      <StateProvider>
        <SignupPage />
      </StateProvider>
    </BrowserRouter>
  );
}; 

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

describe('SignupPage Component', () => {
  let originalFetch: typeof global.fetch;
  const mockNavigate = jest.mock;

  beforeAll(() => {
    originalFetch = global.fetch;
  });

  afterAll(() => {
    global.fetch = originalFetch
  })


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

  it("should handle signup form submission correctly", async () => {
    const mockFetch = jest.fn().mockResolvedValue({ 
      status: 201,
    });
    
    global.fetch = mockFetch;

    const currentUserState = {
      id: 0,
      role: 0,
      displayName: "",
      iat: 0,
      exp: 0
    };

    jest.mock('../../utils/set-user', () => ({
      setUser: jest.fn().mockReturnValue(currentUserState)
    }));

    renderServiceCategory();
    
    fireEvent.change(screen.getByLabelText("Full Name"), { target: { value: "Ryan Tester" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "RyanTester@email.com" } });
    fireEvent.change(screen.getByLabelText("Phone Number"), { target: { value: "1231231234" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password1" } });
    fireEvent.change(screen.getByLabelText("Confirm Password"), { target: { value: "password1" } });

      fireEvent.click(screen.getByTestId("submit-btn"));

    
    expect(mockFetch).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalled();
    // await waitFor(async () => {
    //   const response = await mockFetch.mock.results[0].value;
    //   expect(response.status).toEqual(201);
    // });

    global.fetch = originalFetch
  });
});