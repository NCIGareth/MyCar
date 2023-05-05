import { render, fireEvent, screen } from "@testing-library/react";
import SignInSignUp from "../components/Authentication/SignInSignUp";
import '../setupTests'


test("renders sign in form by default", () => { 
    render(<SignInSignUp />);
    const signInTitle = screen.getAllByText(/Sign In/i);
    expect(signInTitle[0]).toBeInTheDocument();      
  });
  
  test("can switch between sign in and sign up forms", () => {
    render(<SignInSignUp />);
    const switchButton = screen.getByText(/Sign Up/i);
    fireEvent.click(switchButton);
    const signUpTitle = screen.getAllByText(/Sign Up/i);
    expect(signUpTitle[0]).toBeInTheDocument();     
  });
  

  