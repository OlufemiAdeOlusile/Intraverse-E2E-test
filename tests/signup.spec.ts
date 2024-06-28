import { test } from 'src/fixtures';
import { LoginPage } from 'src/pages/LoginPage';
import { SignUpPage } from 'src/pages/SignUpPage';


const { BASE_URL } = process.env;

test.describe('Playwright', () => {
  test('Sign up a new user if not registered', async ({ page }) => {
    const loginPage: LoginPage = new LoginPage(page);
    const signUpPage: SignUpPage = new SignUpPage(page);

    // Navigate to the login page
    await loginPage.verifyPage(BASE_URL);

    // Click the sign-up button to navigate to the sign-up page
    await loginPage.clickSignUp();

    // Fill and submit the sign-up form
   // await signUpPage.fillSignUpForm('Test User', 'test@example.com', 'Password123');
   // await signUpPage.submitForm();
  });
});
