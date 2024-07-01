import { test } from 'src/fixtures';
import { User } from 'src/fixtures/user';
import { LoginPage } from 'src/pages/LoginPage';


const { BASE_URL } = process.env;

test.describe('Playwright', () => {
  test('Sign in an existing user', async ({ page }) => {
    const loginPage: LoginPage = new LoginPage(page);
    
    const existingUser: User = {
        email: 'user@example.com', // Replace with actual user email
        password: 'userpassword' // Replace with actual user password
        ,
        firstName: '',
        lastName: '',
        phoneNumber: ''
    };

// Verify the sign-in page
    await loginPage.verifyPage();
   
    await loginPage.fillAndSubmitSignInForm(existingUser)

    
  });
});
