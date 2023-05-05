import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignInSignUp from '../components/Authentication/SignInSignUp';
import { auth } from '../components/firebaseConfig';
import { act } from "react-dom/test-utils";


describe('SignInSignUp', () => {
  const testUser = {
    email: 'testuser@example.com',
    password: 'testpassword',
  };

  beforeEach(() => {
    auth.signOut();
  });

  test('logs in successfully', async () => {
    const testUser = { email: "testuser@example.com", password: "testpassword" };
  
    const { getByLabelText, queryAllByText } = render(<SignInSignUp />);
  
    const emailInput = getByLabelText(/email/i);
    const passwordInput = getByLabelText(/password/i);
    const submitButtons = screen.getByRole("button", { name: "Sign In" });

  
    fireEvent.change(emailInput, { target: { value: testUser.email } });
    fireEvent.change(passwordInput, { target: { value: testUser.password } });
  
    await act(async () => {
        fireEvent.click(submitButtons);

    });

    setTimeout(() => {
      expect(screen.getByText("You've successfully signed in!")).toBeInTheDocument()
    expect(auth.currentUser).not.toBeNull();
    expect(auth.currentUser.email).toBe(testUser.email);
}, 9000); // 3000 milliseconds (3 seconds)


    await waitFor(() => expect(auth.currentUser).not.toBeNull());
    expect(auth.currentUser.email).toBe(testUser.email);
  
  });
});
